'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Briefcase, MapPin, ExternalLink, Filter, 
  Loader2, Sparkles, Building2, Mail, ArrowLeft, Send 
} from 'lucide-react';

export default function GraduateJobsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Appel à la nouvelle route spécifique aux diplômés
        const res = await fetch('http://localhost:5000/api/graduate-jobs');
        const data = await res.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement offres:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (job.city && job.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white font-sans selection:bg-emerald-500/30 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour au Dashboard
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-400 mb-2">
              Opportunités de Carrière
            </h1>
            <p className="text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Offres exclusives pour les ingénieurs diplômés
            </p>
          </div>
          
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {jobs.length} postes ouverts
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-duration-500" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/10">
            <Search className="w-6 h-6 text-slate-400 ml-4" />
            <input
              type="text"
              placeholder="Rechercher par titre, entreprise, compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-slate-500 px-4 py-3 focus:outline-none text-lg"
            />
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-sm font-medium text-slate-300">
              <Filter className="w-4 h-4" /> Filtrer
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">Extraction des opportunités...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="group relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-teal-500/0 rounded-2xl blur-sm group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all duration-500" />
                  
                  <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 md:p-8 transition-all hover:bg-slate-800/60 flex flex-col md:flex-row gap-6">
                    
                    {/* Left: Job Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-bold border bg-teal-500/10 border-teal-500/20 text-teal-300">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-medium text-slate-300">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          {job.city}
                        </div>
                        {job.email && job.email !== "Non spécifié" && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-400" />
                            {job.email}
                          </div>
                        )}
                      </div>
                      
                      {job.description && (
                         <div className="text-sm text-slate-300 leading-relaxed border-l-2 border-emerald-500/30 pl-4 py-1">
                           {job.description}
                         </div>
                      )}

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.tags && job.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-200 transition-all cursor-default">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col justify-center gap-3 min-w-[160px]">
                      {job.link && job.link !== '#' && (
                        <a 
                          href={job.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Postuler
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      )}
                      
                      {job.email && job.email !== "Non spécifié" && (
                        <a 
                          href={`mailto:${job.email}`}
                          className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Contacter
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5 border-dashed">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aucune opportunité trouvée</h3>
                <p className="text-slate-400">Aucune offre ne correspond à vos critères pour le moment.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
                >
                  Voir toutes les offres
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}