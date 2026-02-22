import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // auth ve db tek yerden geliyor
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LogOut, Save, Phone, ShieldCheck, RefreshCcw } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State: phone3 alanını başlangıç değerlerine ekledik
  const [siteSettings, setSiteSettings] = useState({
    phone1: "",
    phone2: "",
    phone3: "",
    address: "",
    premiumTitle: ""
  });

  // 1. GÜVENLİK KONTROLÜ: Oturum kapalıysa login sayfasına yönlendir
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  // 2. VERİ ÇEKME: Panel açıldığında mevcut verileri Firebase'den çek
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "ayarlar", "genel");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSiteSettings(docSnap.data());
      }
    };
    fetchData();
  }, []);

  // 3. GÜNCELLEME: Firebase'e verileri kaydet
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "ayarlar", "genel"), siteSettings);
      alert("Tebrikler amcaoğlu! Site anında güncellendi.");
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir şeyler ters gitti.");
    }
    setLoading(false);
  };

  // 4. ÇIKIŞ YAPMA: Oturumu sonlandır
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans relative overflow-hidden text-left">
      {/* Arka Plan Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Üst Başlık ve Aksiyonlar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Yönetim Paneli</h1>
            <button 
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition-colors text-sm uppercase tracking-widest"
            >
              <LogOut size={18}/> Güvenli Çıkış Yap
            </button>
          </div>
          <button 
            onClick={handleUpdate} 
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <RefreshCcw className="animate-spin" size={24}/> : <Save size={24}/>}
            {loading ? "KAYDEDİLİYOR..." : "DEĞİŞİKLİKLERİ YAYINLA"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Metin İçerikleri Kartı */}
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-slate-800">
              <ShieldCheck className="text-blue-600" size={28}/> Metin İçerikleri
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Ana Başlık (Hero Section)</label>
                <input 
                  type="text" 
                  value={siteSettings.premiumTitle}
                  onChange={(e) => setSiteSettings({...siteSettings, premiumTitle: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold transition-all"
                  placeholder="Örn: Güvenilir Bakıcı Hizmetleri"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Adres Bilgisi</label>
                <textarea 
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold transition-all h-32"
                  placeholder="Ofis adresi..."
                />
              </div>
            </div>
          </div>

          {/* İletişim Kanalları Kartı */}
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-slate-800">
              <Phone className="text-emerald-500" size={28}/> İletişim Kanalları
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Ana Telefon (WhatsApp)</label>
                <input 
                  type="text" 
                  value={siteSettings.phone1}
                  onChange={(e) => setSiteSettings({...siteSettings, phone1: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold transition-all text-xl"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Yardımcı Hat 1</label>
                <input 
                  type="text" 
                  value={siteSettings.phone2}
                  onChange={(e) => setSiteSettings({...siteSettings, phone2: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold transition-all text-xl"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Yardımcı Hat 2</label>
                <input 
                  type="text" 
                  value={siteSettings.phone3}
                  onChange={(e) => setSiteSettings({...siteSettings, phone3: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold transition-all text-xl"
                  placeholder="05XX XXX XX XX"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;