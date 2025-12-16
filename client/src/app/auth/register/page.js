'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import Link from 'next/link'; 
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, GraduationCap, Briefcase, BookOpen, Calendar } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role') || 'student'; 

  // États du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: roleParam,
    filiere: '',
    promotionYear: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // États d'animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  // Initialisation au chargement
  useEffect(() => {
    setIsLoaded(true);
    setFormData(prev => ({ ...prev, role: roleParam }));

    // Génération des particules côté client (Correction Hydration)
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [roleParam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role, filiere: '', promotionYear: '' });
  };

  // --- LOGIQUE API BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Appel au Backend (Port 5000)
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Succès
        alert('Compte créé avec succès ! Connectez-vous.');
        router.push('/auth/login');
      } else {
        // Erreur (Email déjà pris, etc.)
        alert(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error(error);
      alert('Impossible de contacter le serveur backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const filieres = [
    'Génie Informatique',
    'IID',
    'Génie Électrique',
    'Réseaux & Télécoms',
    'GP',
    'MGSI',
    'Master - Data Science'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
            left: `${20 + mousePosition.x / 40}px`,
            top: `${-50 + mousePosition.y / 40}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        
        {/* Floating Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/" 
        className={`absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 group z-20 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </div>
        <span className="font-medium hidden sm:inline">Retour</span>
      </Link>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-2xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Register Box */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-30" />
          
          <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 p-8 text-center">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative flex justify-center mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-black text-white mb-2">ENSA-Connect</h1>
              <p className="text-indigo-100 font-medium">Créer votre compte</p>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-10">
              
              {/* Role Selection */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-slate-300 mb-3 block">Je suis :</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`relative group ${formData.role === 'student' ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur ${formData.role === 'student' ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'} transition-opacity`} />
                    <div className={`relative flex flex-col items-center gap-3 p-5 ${formData.role === 'student' ? 'bg-blue-500/20 border-blue-400/50' : 'bg-slate-800/80 border-white/10'} backdrop-blur-sm border-2 rounded-xl transition-all duration-300`}>
                      <div className={`w-12 h-12 ${formData.role === 'student' ? 'bg-blue-500/30' : 'bg-blue-500/20'} rounded-xl flex items-center justify-center`}>
                        <GraduationCap className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold mb-1">Étudiant</div>
                        <div className="text-xs text-slate-400">Orientation & Stages</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('graduate')}
                    className={`relative group ${formData.role === 'graduate' ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur ${formData.role === 'graduate' ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'} transition-opacity`} />
                    <div className={`relative flex flex-col items-center gap-3 p-5 ${formData.role === 'graduate' ? 'bg-purple-500/20 border-purple-400/50' : 'bg-slate-800/80 border-white/10'} backdrop-blur-sm border-2 rounded-xl transition-all duration-300`}>
                      <div className={`w-12 h-12 ${formData.role === 'graduate' ? 'bg-purple-500/30' : 'bg-purple-500/20'} rounded-xl flex items-center justify-center`}>
                        <Briefcase className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold mb-1">Diplômé</div>
                        <div className="text-xs text-slate-400">Opportunités Pro</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" /> Nom complet
                  </label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all" placeholder="Votre nom complet" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" /> Adresse Email
                  </label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all" placeholder="votre@email.com" />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-400" /> Mot de passe
                  </label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all pr-12" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.role === 'student' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-400" /> Filière
                    </label>
                    <select name="filiere" value={formData.filiere} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:border-indigo-500 outline-none cursor-pointer">
                      <option value="" className="bg-slate-900">-- Choisir ma filière --</option>
                      {filieres.map((fil, i) => <option key={i} value={fil} className="bg-slate-900">{fil}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" /> Année de promotion
                    </label>
                    <input type="number" name="promotionYear" value={formData.promotionYear} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all" placeholder="Ex: 2023" />
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="relative w-full group overflow-hidden mt-8">
                  <div className={`absolute inset-0 ${formData.role === 'student' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'} rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <div className={`relative flex items-center justify-center gap-2 px-6 py-4 ${formData.role === 'student' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'} rounded-xl text-white font-bold transition-all duration-300 shadow-lg`}>
                    {isLoading ? "Inscription..." : <><span>Créer mon compte</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                  </div>
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-slate-400 text-sm mb-3">Vous avez déjà un compte ?</p>
                  <Link href="/auth/login" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                    <span>Se connecter</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}