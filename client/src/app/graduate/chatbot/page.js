'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, ArrowLeft, Mic, Paperclip, MoreVertical, 
  Bot, User, Zap, TrendingUp, Lightbulb, MessageSquare, 
  Clock, CheckCheck, Briefcase, DollarSign, FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GraduateChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: 'Félicitations pour ton diplôme ! 🎓\nJe suis ton Assistant Carrière.\n\nJe suis là pour t\'aider à :\n• Trouver des offres ciblées\n• Optimiser ton CV et ta Lettre de motivation\n• Préparer tes entretiens techniques\n• Négocier ton salaire',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Suggestions adaptées aux Diplômés
  const quickSuggestions = [
    { icon: FileText, text: "Comment améliorer mon CV ?", color: "green" },
    { icon: Briefcase, text: "Questions types en entretien RH", color: "purple" },
    { icon: DollarSign, text: "Salaire ingénieur débutant au Maroc ?", color: "yellow" },
  ];

  const sendMessage = async (e, suggestedText = null) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const messageText = suggestedText || input;
    if (!messageText.trim()) return;

    const userMessage = { 
      role: 'user', 
      content: messageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      const aiMessage = {
        role: 'ai',
        content: data.reply || "Je n'ai pas trouvé d'information précise dans les documents.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Erreur:", error);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "Erreur de connexion au serveur.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 relative overflow-hidden text-white font-sans">
      
      {/* Background (Teinte plus verte pour Diplômé) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-50 animate-pulse" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-black text-white flex items-center gap-2">
                  Coach Carrière
                  <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Actif
                  </span>
                </h1>
                <p className="text-xs text-emerald-300/80 font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Expert en Recrutement IA
                </p>
              </div>
            </div>
          </div>

          <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <MoreVertical className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600'
              } shadow-lg`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              <div className={`flex flex-col max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`relative group ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    : 'bg-slate-800/90 backdrop-blur-xl border border-white/10'
                } rounded-2xl px-5 py-3 shadow-xl`}>
                  
                  {msg.role === 'ai' && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                  )}
                  
                  <div className="relative">
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-white' : 'text-slate-200'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-xs text-slate-500">{formatTime(msg.timestamp)}</span>
                  {msg.role === 'user' && <CheckCheck className="w-3 h-3 text-blue-400" />}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <p className="text-sm text-slate-400 font-medium px-1">💡 Boostez votre carrière :</p>
              <div className="grid gap-2">
                {quickSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={(e) => sendMessage(e, suggestion.text)}
                    className="group relative text-left w-full"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-${suggestion.color}-500 to-${suggestion.color}-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity`} />
                    <div className="relative flex items-center gap-3 p-4 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all w-full">
                      <div className={`w-10 h-10 bg-${suggestion.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <suggestion.icon className={`w-5 h-5 text-${suggestion.color}-400`} />
                      </div>
                      <span className="text-sm text-slate-200 font-medium flex-1">{suggestion.text}</span>
                      <Send className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 backdrop-blur-xl bg-slate-900/80 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-20" />
            <div className="relative bg-slate-800/90 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-2 flex items-end gap-2">
              
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex-shrink-0">
                <Paperclip className="w-5 h-5 text-slate-400" />
              </button>

              <div className="flex-1 max-h-32 overflow-y-auto">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Posez votre question carrière..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 resize-none py-3 px-2 text-sm"
                  rows="1"
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>

              <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex-shrink-0">
                <Mic className="w-5 h-5 text-slate-400" />
              </button>

              <button
                onClick={(e) => sendMessage(e)}
                disabled={loading || !input.trim()}
                className="relative group flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center gap-2 text-white font-bold hover:from-emerald-500 hover:to-teal-500 transition-all">
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Envoyer</span>
                </div>
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-2">
            L'IA peut faire des erreurs. Vérifiez les informations contractuelles.
          </p>
        </div>
      </div>
    </div>
  );
}