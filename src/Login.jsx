import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Giriş başarılıysa panele uçur
    } catch (error) {
      alert("Hatalı giriş! Bilgilerini kontrol et amcaoğlu.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Arka Plan Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Yönetici Girişi</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Bi Tıkla Bakıcı Ltd. Şti.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all border-none"
                  placeholder="admin@mail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold transition-all border-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group">
              Sisteme Gir <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;