'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, UploadCloud, FileText, CheckCircle, 
  AlertCircle, Loader2, Database, Shield 
} from 'lucide-react';

export default function AdminDocuments() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ragStatus, setRagStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setRagStatus(""); // Reset status on new file
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setRagStatus("Upload du fichier en cours...");
    setStatusType("loading");

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload du fichier
      const res = await fetch('http://localhost:5000/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        // 2. Demander au serveur de mettre à jour l'IA
        await updateRAG();
      } else {
        setRagStatus("Erreur lors de l'upload du fichier.");
        setStatusType("error");
        setUploading(false);
      }
    } catch (err) {
      console.error(err);
      setRagStatus("Erreur de connexion au serveur.");
      setStatusType("error");
      setUploading(false);
    }
  };

  const updateRAG = async () => {
    setRagStatus("Mise à jour du cerveau de l'IA (Indexation)...");
    try {
      const res = await fetch('http://localhost:5000/api/admin/refresh-rag', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok) {
        setRagStatus("Succès ! Le document a été intégré à l'IA.");
        setStatusType("success");
        setFile(null); // Reset file input
        // Reset l'input file visuellement
        document.getElementById('file-upload').value = ""; 
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setRagStatus("Le fichier est uploadé, mais l'IA n'a pas pu être mise à jour.");
      setStatusType("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 text-white font-sans selection:bg-red-500/30 p-4 md:p-8 flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        
        {/* Header Navigation */}
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Retour au Dashboard</span>
        </button>

        {/* Main Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

          {/* Title Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-6">
              <Database className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Base de Connaissances IA</h1>
            <p className="text-slate-400">
              Importez des documents PDF pour enrichir les connaissances de l'assistant Smart Guidance.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex gap-4 items-start">
            <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <strong className="text-blue-100 block mb-1">Fonctionnement du RAG</strong>
              L'IA analyse le texte, le découpe en vecteurs et l'indexe. Les étudiants pourront interroger ce contenu immédiatement après l'upload.
            </div>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleUpload} className="space-y-6">
            
            <div className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 group
              ${file ? 'border-green-500/50 bg-green-500/5' : 'border-slate-700 hover:border-red-500/50 hover:bg-white/5'}
            `}>
              <input 
                id="file-upload"
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                {file ? (
                  <>
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-lg font-bold text-white mb-1">{file.name}</p>
                    <p className="text-sm text-green-400">Prêt à être envoyé</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-red-400 transition-colors" />
                    </div>
                    <p className="text-lg font-bold text-white mb-1">Cliquez ou glissez un fichier ici</p>
                    <p className="text-sm text-slate-500">Supporte uniquement les fichiers PDF (.pdf)</p>
                  </>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={uploading || !file}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300
                ${uploading 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : !file 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transform hover:-translate-y-0.5'
                }
              `}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5" />
                  Uploader & Indexer
                </>
              )}
            </button>
          </form>

          {/* Status Message */}
          {ragStatus && (
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2
              ${statusType === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 
                statusType === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 
                'bg-blue-500/10 border border-blue-500/20 text-blue-400'}
            `}>
              {statusType === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {statusType === 'success' && <CheckCircle className="w-5 h-5" />}
              {statusType === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="font-medium text-sm">{ragStatus}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}