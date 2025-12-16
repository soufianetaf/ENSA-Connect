'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, User, MessageSquare, BookOpen, Briefcase, 
  Target, TrendingUp, Clock, Bell, Search, Menu, X,
  Award, FileText, Calendar, ChevronRight, Star, Zap,
  Users, Book, Rocket, Trophy, BarChart3, Activity
} from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [jobCount, setJobCount] = useState(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // 1. Vérifier l'authentification
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name || 'Étudiant',
        email: parsedUser.email || 'email@ensa.ma',
        filiere: parsedUser.filiere || 'Génie Informatique',
        avatar: parsedUser.name ? parsedUser.name.substring(0, 2).toUpperCase() : 'ET',
        level: parsedUser.promotionYear ? `Promo ${parsedUser.promotionYear}` : 'Cycle Ingénieur'
      });
      setIsLoaded(true);
    }

    // 2. Récupérer le nombre exact de stages depuis le Backend
    const fetchJobCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        if (res.ok) {
          const data = await res.json();
          setJobCount(data.length); 
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
    { label: 'Score Global', value: '87%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500', trend: '+12%' },
    // MODIFICATION ICI : Remplacement de Candidatures par Filières
    { label: 'Filières', value: '7', icon: BookOpen, color: 'from-purple-500 to-pink-500', trend: 'Disponibles' },
    { label: 'Stages trouvés', value: jobCount.toString(), icon: Briefcase, color: 'from-green-500 to-emerald-500', trend: 'Nouveau' },
    { label: 'Réponses', value: '5', icon: MessageSquare, color: 'from-orange-500 to-red-500', trend: '+2' },
  ];

  const mainActions = [
    {
      title: 'Assistant IA Personnel',
      description: 'Ton coach intelligent pour l\'orientation et la carrière',
      icon: MessageSquare,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      badge: 'Populaire',
      link: '/student/chatbot',
      stats: 'Prêt à aider'
    },
    {
      title: 'Explorer les Filières',
      description: 'Toutes les formations et spécialisations détaillées',
      icon: BookOpen,
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      badge: 'Nouveau',
      link: '/student/filieres',
      stats: '7 filières disponibles'
    },
    {
      title: 'Opportunités de Stage',
      description: 'Stages recommandés selon ton profil et compétences',
      icon: Briefcase,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      badge: 'Top',
      link: '/student/stages',
      stats: `${jobCount} offres actives` 
    },
  ];

  const quickLinks = [
    { name: 'Mon Profil', icon: User, count: null, link: '/profile', color: 'blue' },
    { name: 'Messages', icon: MessageSquare, count: 12, link: '#', color: 'purple' },
    { name: 'Mon Parcours', icon: Target, count: null, link: '#', color: 'green' },
    { name: 'Événements', icon: Calendar, count: 3, link: '#', color: 'orange' },
    { name: 'Ressources', icon: Book, count: null, link: '#', color: 'indigo' },
    { name: 'Communauté', icon: Users, count: null, link: '#', color: 'pink' },
  ];

  const recentActivity = [
    { 
      action: 'Nouvelle recommandation de stage', 
      item: 'Offres extraites du fichier PDF', 
      time: 'À l\'instant',
      icon: Briefcase,
      color: 'green',
      important: true
    },
    { 
      action: 'Assistant IA utilisé', 
      item: 'Question sur les débouchés GI', 
      time: 'Hier',
      icon: Sparkles,
      color: 'purple',
      important: false
    },
  ];

  const achievements = [
    { name: 'Premier pas', desc: 'Profil complété à 100%', icon: Award, unlocked: true },
    { name: 'Explorateur', desc: '10 stages consultés', icon: Rocket, unlocked: true },
    { name: 'Communicateur', desc: '50 messages échangés', icon: MessageSquare, unlocked: false },
    { name: 'Champion', desc: 'Première candidature acceptée', icon: Trophy, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white font-sans selection:bg-indigo-500/30">
      
      {/* Enhanced Navigation Bar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-white/10 shadow-2xl transition-all duration-500 ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white bg-gradient-to-r from-white to-indigo-200 bg-clip-text">ENSA-Connect</h1>
                <p className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Espace Étudiant
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-64 px-4 py-2.5 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/10 transition-all outline-none text-sm"
                  />
                  <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                <Bell className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse shadow-lg shadow-red-500/50">
                  3
                </span>
              </button>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-sm">
                    {user.avatar}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-white text-sm font-bold">{user.name}</div>
                    <div className="text-indigo-300 text-[10px]">{user.filiere}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-90' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all group text-sm">
                      <User className="w-4 h-4 text-indigo-400" />
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
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
            >
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-bold inline-flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3" /> Espace Premium
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                  Salut, {user.name.split(' ')[0]} ! 👋
                </h2>
                <p className="text-indigo-100 text-lg max-w-xl">
                  Prêt à booster ta carrière ? Nous avons trouvé {jobCount} nouvelles opportunités pour toi aujourd'hui.
                </p>
              </div>
              <Link href="/profile" className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-bold hover:bg-white/30 transition-all flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Voir mes stats
              </Link>
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
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">{stat.trend}</span>
                </div>
                <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Actions (Cards) */}
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-indigo-400" /> Actions Rapides
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainActions.map((action, i) => (
              <Link key={i} href={action.link} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${action.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-60 transition-all duration-500`} />
                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all transform hover:-translate-y-1 h-full">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" /> {action.badge}
                  </div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2">{action.title}</h4>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{action.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-indigo-300 font-medium pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> {action.stats}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links & Activity */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Quick Links Column */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Accès Direct
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

          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> Activité Récente
            </h3>
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, i) => {
                  const style = colorMap[activity.color];
                  return (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${activity.important ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/5 border border-transparent'}`}>
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