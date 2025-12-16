'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, GraduationCap, Briefcase, ArrowRight, Target, Zap, Users, BookOpen, TrendingUp, Shield, Star } from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]); // On stocke les particules ici

  useEffect(() => {
    setIsLoaded(true);
    
    // GÉNÉRATION DES PARTICULES CÔTÉ CLIENT UNIQUEMENT
    // Cela corrige l'erreur d'hydratation (Math.random)
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 8 + Math.random() * 15,
      animationDelay: Math.random() * 5,
      color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.3)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden text-slate-200">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.5}px)`
        }} />
      </div>

      {/* Premium Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            left: `${20 + mousePosition.x / 50}px`,
            top: `${-100 + mousePosition.y / 50}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            right: `${-50 + mousePosition.x / 80}px`,
            bottom: `${-100 + mousePosition.y / 80}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Floating Elements (CORRIGÉ : On utilise l'état particles) */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              background: p.color,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.animationDuration}s ease-in-out infinite`,
              animationDelay: `${p.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex justify-between items-center p-6 md:px-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-black text-white tracking-tight">ENSA-Connect</span>
            <div className="text-xs text-indigo-300 font-medium">Khliha ela allah</div>
          </div>
        </div>
        
        <Link href="/auth/login" className="px-6 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 font-medium">
          Se connecter
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:py-20">
        <div className={`text-center max-w-6xl transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-indigo-400/30 rounded-full text-indigo-200 text-sm mb-8 shadow-lg shadow-indigo-500/20">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold">Intelligence Artificielle Avancée (RAG)</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1]">
            Votre Carrière,
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Notre Mission
              </span>
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Plateforme d'orientation professionnelle propulsée par l'IA pour connecter les talents de l'ENSA aux meilleures opportunités.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
            {[
              { icon: Users, label: 'Utilisateurs actifs', value: '1,200+', color: 'from-blue-500 to-cyan-500' },
              { icon: Target, label: 'Matching IA', value: '98%', color: 'from-indigo-500 to-purple-500' },
              { icon: Briefcase, label: 'Stages & Jobs', value: '500+', color: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, label: 'Satisfaction', value: '4.9/5', color: 'from-pink-500 to-rose-500' }
            ].map((stat, i) => (
              <div key={i} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Profile Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            
            {/* Student Card */}
            <Link href="/auth/register?role=student" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700" />
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-2 border-blue-500/20 rounded-3xl p-8 md:p-10 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-[1.02] shadow-2xl">
                
                <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                
                <div className="text-left pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-4xl md:text-5xl font-black text-white">Étudiant</h3>
                    <div className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-xs font-bold">START</div>
                  </div>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Explorez votre potentiel avec notre assistant IA. Découvrez les filières, trouvez des stages et tracez votre chemin.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                        { icon: BookOpen, text: 'Orientation personnalisée par IA' },
                        { icon: Target, text: 'Stages adaptés à votre profil' },
                        { icon: Sparkles, text: 'Assistant intelligent 24/7' },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-200 group-hover:text-white transition-colors">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-bold group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50">
                    <span>Commencer mon parcours</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Graduate Card */}
            <Link href="/auth/register?role=graduate" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700" />
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-2 border-purple-500/20 rounded-3xl p-8 md:p-10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-[1.02] shadow-2xl">
                
                <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full" />
                
                <div className="text-left pt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-4xl md:text-5xl font-black text-white">Diplômé</h3>
                    <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 text-xs font-bold">PRO</div>
                  </div>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Propulsez votre carrière avec notre système de matching IA avancé. Accédez aux meilleures opportunités.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                        { icon: Star, text: 'Matching IA ultra-précis' },
                        { icon: TrendingUp, text: 'Opportunités exclusives' },
                        { icon: Shield, text: 'Candidatures prioritaires' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-200 group-hover:text-white transition-colors">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50">
                    <span>Accélérer ma carrière</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom CTA */}
          <div className="border-t border-white/5 pt-12">
            <p className="text-slate-400 text-sm mb-4 font-medium">Vous avez déjà un compte ?</p>
            <Link href="/auth/login" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-300 group font-semibold">
              <span>Accéder à mon espace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-500 text-sm border-t border-white/5">
        <p>© 2025 ENSA-Connect. Développé avec passion / Khliha Ela Allah.</p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          33% { transform: translate(30px, -30px) rotate(120deg); opacity: 0.6; }
          66% { transform: translate(-20px, 20px) rotate(240deg); opacity: 0.4; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}