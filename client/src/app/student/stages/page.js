'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Briefcase, MapPin, ExternalLink, Filter, Loader2, Sparkles, Building2, Calendar, ArrowLeft } from 'lucide-react';

export default function StagesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        setStages(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement stages:", error);
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  const filteredStages = stages.filter(stage => 
    (stage.title && stage.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (stage.tags && stage.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (stage.city && stage.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white font-sans selection:bg-indigo-500/30 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour
            </button>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mb-2">
              Trouver un Stage
            </h1>
            <p className="text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Offres extraites automatiquement par l'IA
            </p>
          </div>
          
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            {stages.length} opportunités actives
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-duration-500" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/10">
            <Search className="w-6 h-6 text-slate-400 ml-4" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé (ex: Data, Casablanca, SQL...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-slate-500 px-4 py-3 focus:outline-none text-lg"
            />
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-sm font-medium text-slate-300">
              <Filter className="w-4 h-4" /> Filtres
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">Analyse des documents en cours...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStages.length > 0 ? (
              filteredStages.map((stage) => (
                <div key={stage.id} className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 rounded-2xl blur-sm group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-500" />
                  
                  <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 transition-all hover:bg-slate-800/60">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      
                      {/* Main Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {stage.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            stage.type === 'PFE' 
                              ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' 
                              : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                          }`}>
                            {stage.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-indigo-400" />
                            {stage.company}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-indigo-400" />
                            {stage.city}
                          </div>
                          {stage.duration && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-indigo-400" />
                              {stage.duration}
                            </div>
                          )}
                        </div>
                        
                        {stage.description && (
                           <p className="text-sm text-slate-300 italic border-l-2 border-indigo-500/30 pl-4 py-1">
                             "{stage.description.substring(0, 120)}..."
                           </p>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          {stage.tags && stage.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-xs text-slate-300 hover:bg-white/10 hover:border-indigo-500/30 transition-colors cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center">
                        <a 
                          href={stage.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Postuler
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5 border-dashed">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Aucune offre trouvée</h3>
                <p className="text-slate-400 text-sm">Essayez d'autres mots-clés ou videz la recherche.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-indigo-400 hover:text-indigo-300 font-medium text-sm hover:underline"
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