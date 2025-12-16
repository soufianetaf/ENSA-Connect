'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ArrowRight, LogIn, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  
  // États du formulaire
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // États pour le design 3D
  const [isLoaded, setIsLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const posX = (e.clientX - centerX) / centerX;
      const posY = (e.clientY - centerY) / centerY;

      setTilt({
        x: posY * -8, 
        y: posX * 8   
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIQUE API INTEGRÉE (Back-End) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Appel au Backend (Port 5000)
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Stockage du token et des infos user
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // 3. Redirection selon le rôle
        if (data.user.role === 'admin') {
           router.push('/admin/dashboard');
        } else if (data.user.role === 'graduate') {
           router.push('/graduate/dashboard');
        } else {
           router.push('/student/dashboard');
        }
      } else {
        // Erreur (Mauvais mot de passe...)
        alert(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 perspective-[2000px] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a0a1a] to-slate-950"></div>
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-[120px] animate-aurora-1 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-[120px] animate-aurora-2 mix-blend-screen" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Lien Retour */}
      <Link href="/" className={`absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 group z-20 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all hover:scale-105">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </div>
        <span className="font-medium hidden sm:inline text-sm tracking-wide">Retour à l'accueil</span>
      </Link>

      {/* --- CARTE 3D --- */}
      <div 
        className={`relative z-10 w-full max-w-[500px] transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40 transition-all duration-300 group-hover:opacity-60 -z-10"
            style={{ transform: `translateZ(-50px) translateX(${-tilt.y * 1.5}px) translateY(${-tilt.x * 1.5}px)` }}
          ></div>
          
          <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/5">
            
            <div className="relative p-8 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-900/50"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-4 group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                    <Sparkles className="w-8 h-8 text-white/90" />
                    </div>
                </div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-white mb-1 tracking-tight">ENSA-Connect</h1>
                <p className="text-indigo-200/70 text-sm font-medium tracking-wide uppercase">Portail d'accès intelligent</p>
              </div>
            </div>

            <div className="p-8 pt-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300/80 uppercase tracking-wider ml-1">Email académique</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:bg-slate-900/80 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 outline-none"
                      placeholder="exemple@ensa.ma"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-semibold text-slate-300/80 uppercase tracking-wider">Mot de passe</label>
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Oublié ?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:bg-slate-900/80 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 outline-none"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full group overflow-hidden rounded-xl mt-2 p-[1px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-xy"></div>
                  <div className="relative h-full bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 rounded-xl p-3.5 transition-all duration-300">
                    <div className="flex items-center justify-center gap-2 text-white font-bold tracking-wide">
                        {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Connexion...</span>
                        </>
                        ) : (
                        <>
                            <LogIn className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            <span>Se connecter</span>
                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </>
                        )}
                    </div>
                  </div>
                </button>
              </form>

              <div className="relative flex items-center py-6">
                <div className="flex-grow h-px bg-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-500 font-medium uppercase tracking-wider">Ou rejoindre en tant que</span>
                <div className="flex-grow h-px bg-white/10"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/auth/register?role=student" className="group relative p-[1px] rounded-xl overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <div className="relative flex flex-col items-center gap-2 p-4 bg-slate-950/50 border border-white/10 rounded-xl group-hover:border-blue-500/50 group-hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
                    <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <GraduationCap className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <span className="text-sm font-bold text-white">Étudiant</span>
                  </div>
                </Link>

                <Link href="/auth/register?role=graduate" className="group relative p-[1px] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <div className="relative flex flex-col items-center gap-2 p-4 bg-slate-950/50 border border-white/10 rounded-xl group-hover:border-purple-500/50 group-hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
                    <div className="p-2.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Briefcase className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    </div>
                    <span className="text-sm font-bold text-white">Diplômé</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes aurora-shift-1 { 0% { transform: translate(0,0); } 100% { transform: translate(10px, 10px); } }
        @keyframes aurora-shift-2 { 0% { transform: translate(0,0); } 100% { transform: translate(-10px, -10px); } }
        .animate-aurora-1 { animation: aurora-shift-1 10s ease-in-out infinite alternate; }
        .animate-aurora-2 { animation: aurora-shift-2 12s ease-in-out infinite alternate; }
        @keyframes gradient-xy { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 3s ease infinite; }
      `}</style>
    </div>
  );
}