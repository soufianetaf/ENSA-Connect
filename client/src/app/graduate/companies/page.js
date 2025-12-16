'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ArrowLeft, Loader2, Mail, ExternalLink, MapPin } from 'lucide-react';

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/companies');
        const data = await res.json();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement entreprises:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const cities = Object.keys(companies);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white font-sans selection:bg-emerald-500/30 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col justify-between items-start mb-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour au Dashboard</span>
          </button>
          
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-400 mb-2">
            Annuaire des Entreprises Partenaires
          </h1>
          <p className="text-slate-400 text-lg">
            Contacts RH et liens directs pour postuler auprès de nos partenaires classés par ville.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">Chargement des annuaires...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {cities.map((city, cityIndex) => (
              <div key={cityIndex}>
                
                {/* City Header */}
                <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{city} ({companies[city].length})</h2>
                    <div className="flex-grow h-px bg-white/10 ml-4"></div>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies[city].map((company, companyIndex) => (
                    <div key={companyIndex} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-teal-500/0 rounded-2xl blur-sm group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-300" />

                      <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 transition-all h-full">
                        
                        <div className="flex items-center gap-4 mb-4">
                          <Building2 className="w-6 h-6 text-emerald-400" />
                          <h3 className="text-lg font-bold text-white">{company.name}</h3>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span className="font-mono text-xs">{company.email || 'Contact Général'}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <a 
                            href={company.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold text-sm hover:text-white transition-colors flex items-center gap-1"
                          >
                            Site Web
                          </a>
                          <a 
                            href={`mailto:${company.email}`}
                            className="p-2 bg-emerald-600/20 rounded-lg hover:bg-emerald-600/40 transition-all"
                          >
                            <Mail className="w-5 h-5 text-emerald-300" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {cities.length === 0 && !loading && (
          <div className="text-center py-20 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5 border-dashed">
            <p className="text-slate-400 text-lg">Aucune donnée d'entreprise trouvée. Vérifiez le fichier PDF.</p>
          </div>
        )}
      </div>
    </div>
  );
}