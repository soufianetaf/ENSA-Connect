'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Phone, Linkedin, Github, FileText, 
  Save, ArrowLeft, UploadCloud, Lock, Sparkles, 
  Briefcase, BookOpen, MapPin, CheckCircle
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // États du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    bio: '',
    skills: '',
    filiere: '',
    promotionYear: '',
    password: '',
  });
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Pré-remplir le formulaire avec les nouvelles données
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      linkedin: parsedUser.linkedin || '',
      github: parsedUser.github || '',
      bio: parsedUser.bio || '',
      skills: parsedUser.skills || '',
      filiere: parsedUser.filiere || '',
      promotionYear: parsedUser.promotionYear || '',
      password: '',
    });
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const dataToSend = new FormData();
    // Ajout de tous les champs
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });
    
    if (cvFile) {
      dataToSend.append('cv', cvFile);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/update/${user.id}`, {
        method: 'PUT',
        body: dataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Profil mis à jour avec succès !");
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Petit délai pour admirer le succès avant de rediriger
        setTimeout(() => {
            const dashboardLink = data.user.role === 'student' ? '/student/dashboard' : '/graduate/dashboard';
            router.push(dashboardLink);
        }, 1500);
      } else {
        alert(data.message || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition-all group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Modifier mon profil
            </h1>
          </div>
          <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            {user.role === 'student' ? 'Compte Étudiant' : 'Compte Diplômé'}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne Gauche : Photo & Info Rapide */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">
              <div className="relative inline-block mb-4 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center text-4xl border-4 border-slate-900 shadow-xl overflow-hidden">
                  {/* Avatar par défaut ou image si dispo */}
                  <span className="font-bold text-slate-400">{user.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full border-4 border-slate-900 flex items-center justify-center cursor-pointer hover:bg-indigo-400 transition-colors">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-slate-400 text-sm mb-4">{user.email}</p>
              
              <div className="flex justify-center gap-3">
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
            </div>

            {/* Upload CV Box */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Mon CV
              </h3>
              
              <div className="relative group">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  cvFile ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700 bg-white/5 group-hover:bg-white/10 group-hover:border-indigo-500/50'
                }`}>
                  <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${cvFile ? 'text-green-400' : 'text-slate-400'}`} />
                  <p className="text-sm font-medium text-slate-300">
                    {cvFile ? cvFile.name : "Cliquez pour uploader (PDF)"}
                  </p>
                </div>
              </div>

              {user.cv_url && (
                <a 
                  href={`http://localhost:5000${user.cv_url}`} 
                  target="_blank"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-indigo-300 hover:bg-white/10 transition-all"
                >
                  <FileText className="w-4 h-4" /> Voir le CV actuel
                </a>
              )}
            </div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Infos Personnelles */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" /> Informations Personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="email@ensa.ma" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="+212 6..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Localisation</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input disabled value="Maroc" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-400 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio / Description</label>
                <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all resize-none" placeholder="Présentez-vous en quelques mots..." />
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ShareIcon className="w-5 h-5 text-purple-400" /> Réseaux Sociaux
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">LinkedIn URL</label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="linkedin.com/in/..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">GitHub URL</label>
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="github" value={formData.github} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="github.com/..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Compétences & Cursus */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-400" /> Compétences & Cursus
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compétences Techniques (séparées par des virgules)</label>
                  <div className="relative">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input name="skills" value={formData.skills} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="React, Node.js, Python, SQL..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.role === 'student' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filière</label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select name="filiere" value={formData.filiere} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none appearance-none">
                          <option value="" className="bg-slate-900 text-slate-400">Choisir...</option>
                          <option value="Génie Informatique" className="bg-slate-900">Génie Informatique</option>
                          <option value="Data Science" className="bg-slate-900">Data Science</option>
                          <option value="Génie Electrique" className="bg-slate-900">Génie Electrique</option>
                          <option value="Réseaux & Télécoms" className="bg-slate-900">Réseaux & Télécoms</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Année Promotion</label>
                      <input name="promotionYear" type="number" value={formData.promotionYear} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-400" /> Sécurité
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-white/10 outline-none transition-all" placeholder="Laisser vide pour ne pas changer" />
                </div>
              </div>
            </div>

            {/* Bouton Save */}
            <div className="sticky bottom-6 z-20">
                <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-[1px] shadow-2xl shadow-indigo-500/30"
                >
                <div className="relative px-6 py-4 bg-slate-900 group-hover:bg-slate-800 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3">
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="font-bold text-white">Sauvegarde...</span>
                        </>
                    ) : successMessage ? (
                        <>
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <span className="font-bold text-green-400">Modifications enregistrées !</span>
                        </>
                    ) : (
                        <>
                            <Save className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                            <span className="font-bold text-white text-lg">Enregistrer les modifications</span>
                        </>
                    )}
                </div>
                </button>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

// Icone helper
function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}