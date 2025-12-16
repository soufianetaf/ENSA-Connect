'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, FileText, Users, Settings, Database, 
  Activity, Search, Bell, Menu, X, ChevronRight, 
  UploadCloud, Lock, Server, Cpu, Trash2, File
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // États pour les données dynamiques
  const [statsData, setStatsData] = useState({
    users: { total: 0, students: 0, graduates: 0 },
    documents: { count: 0, list: [] },
    system: { status: 'Chargement...' }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        alert("Accès réservé aux administrateurs.");
        router.push('/');
        return;
      }
      setUser(parsedUser);
      fetchStats(); // Récupérer les vraies infos
      setIsLoaded(true);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats');
      const data = await res.json();
      if (res.ok) setStatsData(data);
    } catch (err) {
      console.error("Erreur stats:", err);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">Chargement du système...</div>;

  const cards = [
    { label: 'Système RAG', value: statsData.documents.count > 0 ? 'Actif' : 'Inactif', icon: Cpu, color: 'from-green-500 to-emerald-500', sub: 'IA Prête' },
    { label: 'Utilisateurs', value: statsData.users.total.toString(), icon: Users, color: 'from-blue-500 to-cyan-500', sub: `${statsData.users.students} Étudiants` },
    { label: 'Documents', value: statsData.documents.count.toString(), icon: Database, color: 'from-purple-500 to-pink-500', sub: 'Indexés' },
    { label: 'Serveur', value: 'En Ligne', icon: Server, color: 'from-orange-500 to-red-500', sub: 'Port 5000' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 text-white font-sans selection:bg-red-500/30">
      
      {/* Navbar Admin */}
      <nav className={`sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-white/10 shadow-2xl transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white bg-gradient-to-r from-white to-red-200 bg-clip-text">ADMIN CONSOLE</h1>
                <p className="text-xs text-red-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Accès Sécurisé
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="relative flex items-center">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="ml-2 text-xs font-mono text-green-400">SYSTÈME OPÉRATIONNEL</span>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">AD</div>
                <div className="text-left">
                  <div className="text-white text-sm font-bold">{user.name}</div>
                  <div className="text-red-300 text-[10px]">Super Admin</div>
                </div>
              </div>
              <button onClick={() => { localStorage.clear(); router.push('/'); }} className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 border border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-orange-900/20 to-slate-900/0 opacity-90" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Panneau de Contrôle</h2>
              <p className="text-slate-300 text-lg max-w-2xl">
                Surveillance en temps réel. {statsData.users.graduates} diplômés et {statsData.users.students} étudiants inscrits.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {cards.map((stat, i) => (
            <div key={i} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`} />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-mono text-slate-400 text-xs">{stat.sub}</span>
                </div>
                <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Actions */}
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-red-500" /> Actions Rapides
            </h3>
            <Link href="/admin/documents" className="group relative block h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Ajouter un Document</h4>
                <p className="text-slate-400 mb-6 leading-relaxed">Uploadez des PDF (cours, offres) pour mettre à jour l'IA.</p>
                <div className="flex items-center text-red-400 font-bold group-hover:translate-x-2 transition-transform">
                  GÉRER LES FICHIERS <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>
          </div>

          {/* Liste des Documents Réels */}
          <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-500" /> Base de Connaissances
            </h3>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-400">Fichiers indexés par l'IA</span>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded-md">{statsData.documents.count} fichiers</span>
              </div>
              
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {statsData.documents.list.length > 0 ? (
                  statsData.documents.list.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-red-400" />
                      </div>
                      <span className="text-sm text-slate-200 flex-1 truncate">{doc}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Indexé"></div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    Aucun document trouvé. <br/> Uploadez un PDF pour commencer.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}