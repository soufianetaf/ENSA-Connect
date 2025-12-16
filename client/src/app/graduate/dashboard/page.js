'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, User, MessageSquare, Briefcase, 
  Target, TrendingUp, Clock, Bell, Search, Menu, X,
  Award, FileText, Calendar, ChevronRight, Star, Zap,
  Users, Rocket, Trophy, BarChart3, Activity, Linkedin, Globe, Building2
} from 'lucide-react';

export default function GraduateDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [jobCount, setJobCount] = useState(0); // <--- État pour le nombre d'offres
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // 1. Vérif Auth
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name || 'Diplômé',
        email: parsedUser.email || 'alumni@ensa.ma',
        promotion: parsedUser.promotionYear ? `Promo ${parsedUser.promotionYear}` : 'Alumni',
        avatar: parsedUser.name ? parsedUser.name.substring(0, 2).toUpperCase() : 'AL',
        role: 'Ingénieur' 
      });
      setIsLoaded(true);
    }

    // 2. Récupérer le nombre d'offres Diplômés (Graduate Jobs)
    const fetchJobCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/graduate-jobs');
        if (res.ok) {
          const data = await res.json();
          setJobCount(data.length); // Mise à jour avec le vrai nombre
        }
      } catch (error) {
        console.error("Erreur chargement jobs:", error);
      }
    };

    fetchJobCount();

  }, [router]);

  if (!user) return <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">Chargement...</div>;

  const colorMap = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: 'text-purple-400' },
    green: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: 'text-orange-400' },
    indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', icon: 'text-indigo-400' },
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', icon: 'text-pink-400' },
  };

  const stats = [
    { label: 'Visibilité Profil', value: 'High', icon: Activity, color: 'from-blue-500 to-cyan-500', trend: '+24 vues' },
    { label: 'Offres Matchées', value: jobCount.toString(), icon: Target, color: 'from-purple-500 to-pink-500', trend: 'Nouveau' },
    { label: 'Entretiens', value: '3', icon: Calendar, color: 'from-green-500 to-emerald-500', trend: 'Cette semaine' },
    { label: 'Réseau', value: '150+', icon: Users, color: 'from-orange-500 to-red-500', trend: '+12' },
  ];

  const mainActions = [
    {
      title: 'Assistant Carrière IA',
      description: 'Optimise ton CV et prépare tes entretiens avec notre coach IA.',
      icon: MessageSquare,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      badge: 'Essentiel',
      link: '/graduate/chatbot',
      stats: 'Analyse CV disponible'
    },
    {
      title: 'Offres d\'Emploi Exclusives',
      description: 'Postes CDI et Freelance sélectionnés pour les ingénieurs ENSA.',
      icon: Briefcase,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      badge: 'Recrutement',
      link: '/graduate/jobs',
      stats: `${jobCount} nouvelles offres`
    },
    {
      title: 'Entreprises Partenaires', // MODIFIÉ
      description: 'Découvre les entreprises qui recrutent nos lauréats.', // MODIFIÉ
      icon: Building2, // MODIFIÉ (Icône Entreprise)
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      badge: 'Réseautage',
      link: '/graduate/companies', // Lien vers la future page
      stats: '50+ partenaires'
    },
  ];

  const quickLinks = [
    { name: 'Mon Profil Public', icon: User, count: null, link: '/profile', color: 'blue' },
    { name: 'Mes Candidatures', icon: FileText, count: 4, link: '#', color: 'purple' },
    { name: 'Salaires & Tendances', icon: TrendingUp, count: null, link: '#', color: 'green' },
    { name: 'Événements Pro', icon: Calendar, count: 2, link: '#', color: 'orange' },
    { name: 'Mentorat', icon: Award, count: null, link: '#', color: 'indigo' },
    { name: 'Paramètres', icon: Star, count: null, link: '#', color: 'pink' },
  ];

  const recentActivity = [
    { 
      action: 'Nouvelle opportunité CDI', 
      item: 'Ingénieur DevOps Senior - Capgemini', 
      time: 'Il y a 1h',
      icon: Briefcase,
      color: 'purple',
      important: true
    },
    { 
      action: 'Message reçu', 
      item: 'RH Oracle a consulté votre profil', 
      time: 'Aujourd\'hui',
      icon: User,
      color: 'blue',
      important: false
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white font-sans selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-white/10 shadow-2xl transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white bg-gradient-to-r from-white to-emerald-200 bg-clip-text">ENSA-Connect</h1>
                <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Espace Diplômé
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Rechercher job, entreprise..."
                    className="w-64 px-4 py-2.5 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:bg-white/10 transition-all outline-none text-sm"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="relative w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-sm">
                    {user.avatar}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-white text-sm font-bold">{user.name}</div>
                    <div className="text-emerald-300 text-[10px]">{user.promotion}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-90' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all group text-sm">
                      <User className="w-4 h-4 text-emerald-400" />
                      <span className="text-white">Mon Profil</span>
                    </Link>
                    <button 
                      onClick={() => { localStorage.clear(); router.push('/'); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-500/10 transition-all group text-sm text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl">
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-bold inline-flex items-center gap-1 mb-3">
                  <Rocket className="w-3 h-3" /> Carrière Boost
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                  Bonjour, {user.name.split(' ')[0]}
                </h2>
                <p className="text-emerald-100 text-lg max-w-xl">
                  Le marché de l'emploi est actif aujourd'hui. {jobCount} nouvelles opportunités correspondent à votre profil Ingénieur.
                </p>
              </div>
              <div className="flex gap-3">
                {/* BOUTON LINKEDIN MODIFIÉ : Redirige vers le profil */}
                <Link href="/profile" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  Lier LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-20 group-hover:opacity-50 transition-opacity`} />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs font-bold rounded-lg border border-white/20">{stat.trend}</span>
                </div>
                <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Actions */}
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-400" /> Accélérateur de Carrière
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainActions.map((action, i) => (
              <Link key={i} href={action.link} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${action.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-60 transition-all duration-500`} />
                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all transform hover:-translate-y-1 h-full">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white border border-white/10">
                    {action.badge}
                  </div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2">{action.title}</h4>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{action.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-emerald-300 font-medium pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> {action.stats}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links & Feed */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Navigation
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, i) => {
                const style = colorMap[link.color];
                return (
                  <Link key={i} href={link.link} className="flex items-center justify-between p-4 bg-slate-900/80 border border-white/10 rounded-xl hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center`}>
                        <link.icon className={`w-5 h-5 ${style.icon}`} />
                      </div>
                      <span className="font-medium text-slate-200 group-hover:text-white">{link.name}</span>
                    </div>
                    {link.count && <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-bold text-white">{link.count}</span>}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" /> Dernières Actualités
            </h3>
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, i) => {
                  const style = colorMap[activity.color];
                  return (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activity.important ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-transparent'}`}>
                      <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-6 h-6 ${style.icon}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{activity.action}</div>
                        <div className="text-slate-400 text-sm">{activity.item}</div>
                      </div>
                      <div className="text-slate-500 text-xs font-medium">{activity.time}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}