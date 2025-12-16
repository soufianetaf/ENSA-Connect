'use client';

import { useRouter } from 'next/navigation';
import { 
  Code2, Database, Zap, ShieldCheck, Leaf, PieChart, 
  ArrowLeft, Sparkles, BookOpen, BrainCircuit, GraduationCap, Download
} from 'lucide-react';

export default function FilieresPage() {
  const router = useRouter();

  // --- DONNÉES CYCLE INGÉNIEUR (AVEC LIENS PDF) ---
  const cycleIngenieur = [
    {
      id: "GI",
      acronym: "GI",
      title: "Génie Informatique",
      desc: "Formation d'ingénieurs experts en développement logiciel, architectures complexes et transformation digitale.",
      icon: Code2,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      tags: ["Dév Fullstack", "Cloud", "DevOps"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2025/03/Depliant-GI-2024-2025.pdf"
    },
    {
      id: "IID",
      acronym: "IID",
      title: "Informatique et Ingénierie des Données",
      desc: "Maîtrise du Big Data, de l'Intelligence Artificielle et de l'analyse de données massives.",
      icon: Database,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      tags: ["Data Scientist", "IA Engineer", "Big Data"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2025/02/Depliant-IID.pdf"
    },
    {
      id: "IRIC",
      acronym: "IRIC",
      title: "Ingénierie des Réseaux et Cybersécurité",
      desc: "Conception d'infrastructures réseaux sécurisées et protection contre les cybermenaces.",
      icon: ShieldCheck,
      color: "red",
      gradient: "from-red-500 to-rose-500",
      tags: ["Cybersécurité", "Admin Réseaux", "Pentester"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2024/09/IRIC-Broch_VM-1.pdf"
    },
    {
      id: "GE",
      acronym: "GE",
      title: "Génie Électrique",
      desc: "Systèmes embarqués, électronique de puissance et automatisation industrielle.",
      icon: Zap,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      tags: ["Systèmes Embarqués", "Automatisme", "Électronique"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2025/03/Depliant-GE-VF.pdf"
    },
    {
      id: "GPEE",
      acronym: "GPEE",
      title: "Génie des Procédés et Environnement",
      desc: "Ingénierie énergétique, énergies renouvelables et gestion durable de l'environnement.",
      icon: Leaf,
      color: "green",
      gradient: "from-emerald-500 to-green-500",
      tags: ["Énergies Renouvelables", "Efficacité Énergétique", "QSE"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2025/03/Depliant-GPEE_2024-2025_v1.pdf"
    },
    {
      id: "MGSI",
      acronym: "MGSI",
      title: "Management des Systèmes d'Information",
      desc: "Double compétence en ingénierie informatique et en pilotage stratégique de projets.",
      icon: PieChart,
      color: "indigo",
      gradient: "from-indigo-500 to-violet-500",
      tags: ["Chef de Projet", "Consultant SI", "Audit"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2024/09/Depliant-MGSI-2024-1.pdf"
    }
  ];

  // --- DONNÉES CYCLE MASTER (AVEC LIEN PDF) ---
  const cycleMaster = [
    {
      id: "MIMSD",
      acronym: "MIMSD",
      title: "Master Info & Maths pour la Data Science",
      desc: "Formation d'excellence combinant mathématiques avancées et informatique pour la science des données (S1 à S4).",
      icon: BrainCircuit,
      color: "teal",
      gradient: "from-teal-400 to-emerald-400",
      tags: ["Modélisation Math", "Deep Learning", "Recherche"],
      pdfLink: "http://ensak.usms.ac.ma/ensak/wp-content/uploads/2025/08/Binder1-1.pdf"
    }
  ];

  // Helper pour les styles de couleur
  const getColorStyle = (color) => {
    const styles = {
      blue: { border: 'group-hover:border-blue-500/50', bg: 'bg-blue-500/10', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      purple: { border: 'group-hover:border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      red: { border: 'group-hover:border-red-500/50', bg: 'bg-red-500/10', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300 border-red-500/30' },
      yellow: { border: 'group-hover:border-yellow-500/50', bg: 'bg-yellow-500/10', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      green: { border: 'group-hover:border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      indigo: { border: 'group-hover:border-indigo-500/50', bg: 'bg-indigo-500/10', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      teal: { border: 'group-hover:border-teal-500/50', bg: 'bg-teal-500/10', text: 'text-teal-400', badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
    };
    return styles[color] || styles.blue;
  };

  const renderCard = (f) => {
    const style = getColorStyle(f.color);
    return (
      <div key={f.id} className={`group relative h-full`}>
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${f.gradient} rounded-3xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
        
        <div className={`relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 ${style.border} rounded-3xl p-8 transition-all hover:-translate-y-1 flex flex-col`}>
          
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 ${style.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <f.icon className={`w-7 h-7 ${style.text}`} />
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style.badge}`}>
              {f.acronym}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
            {f.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            {f.desc}
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {f.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-xs text-slate-300 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5">
              <a 
                href={f.pdfLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 group/btn ${style.text}`}
              >
                <BookOpen className="w-4 h-4" />
                Voir le programme
                <Download className="w-4 h-4 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-indigo-500/30 pb-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group"
            >
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">Retour au Dashboard</span>
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mb-3">
              Offre de Formation
            </h1>
            <p className="text-slate-400 flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Découvrez les spécialités d'excellence de l'ENSA Khouribga
            </p>
          </div>
        </div>

        {/* SECTION 1 : CYCLE INGÉNIEUR */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Cycle Ingénieur d'État</h2>
            <div className="h-px flex-grow bg-white/10 ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycleIngenieur.map((f) => renderCard(f))}
          </div>
        </div>

        {/* SECTION 2 : CYCLE MASTER */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <GraduationCap className="w-6 h-6 text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Cycle Master</h2>
            <div className="h-px flex-grow bg-white/10 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycleMaster.map((f) => renderCard(f))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
          <p className="text-indigo-200 text-sm">
            <span className="font-bold">Note :</span> Le cycle ingénieur dure 3 ans (S5-S10) et le Master dure 2 ans (S1-S4).
          </p>
        </div>

      </div>
    </div>
  );
}