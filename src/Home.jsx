import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, Phone, Baby, Heart, Activity, 
  Palette, Sparkles, Home as HomeIcon, ShieldCheck, 
  Zap, CheckCircle, MapPin, Star, ChevronDown, Clock, Award, Users
} from 'lucide-react';
import { db } from './firebase';
import { doc, onSnapshot } from "firebase/firestore";

// FOTOĞRAF IMPORTLARI
import heroBg from './hero-bg.png';
import bebekFoto from './bebek-bakici-detay.jpg';
import hastaFoto from './hasta-bakici-detay.jpg';
import oyunFoto from './oyun-ablasi-detay.jpg';
import temizlikFoto from './temizlik-detay.jpg';
import yasliFoto from './yasli-bakici-detay.jpg';
import yatiliFoto from './yatili-bakici-detay.jpg';
import { useEffect } from 'react';

const Home = () => {

    const [liveSettings, setLiveSettings] = useState(null);

 useEffect(() => {
    console.log("Bağlantı kuruluyor..."); // Bunu ekle
    const unsub = onSnapshot(doc(db, "ayarlar", "genel"), (docSnap) => {
      if (docSnap.exists()) {
        console.log("Veri Geldi Amcaoğlu:", docSnap.data()); // Veriyi burada görelim
        setLiveSettings(docSnap.data());
      } else {
        console.log("Döküman bulunamadı!");
      }
    });
    return () => unsub();
  }, []);

  const HERO_TITLE = liveSettings?.premiumTitle || "Güvenilir Bakıcı ve Ev Destek Hizmetleri";
  const COMPANY_NAME = "Bi Tıkla Bakıcı";
  const ADDRESS = liveSettings?.address || "Yakuplu Merkez Mah. 59. Sk. No:84 Daire:3 Beylikdüzü/İstanbul";
  const PHONES = [
    liveSettings?.phone1 || "05544041444", 
    liveSettings?.phone2 || "05546882092",
    liveSettings?.phone3 || "05343084678"
  ];
  const DISPLAY_PHONES = PHONES.map(num => 
    num.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")
  );

  const openWhatsApp = (service = "Genel") => {
    const messages = {
      "Bebek": "Merhaba, bebek bakıcısı için bilgi almak istiyorum.",
      "Yaşlı": "Merhaba, yaşlı bakıcısı için bilgi almak istiyorum.",
      "Hasta": "Merhaba, hasta bakıcısı arıyorum.",
      "Oyun": "Merhaba, oyun ablası hizmeti hakkında bilgi almak istiyorum.",
      "Temizlik": "Merhaba, günlük temizlik hizmeti almak istiyorum.",
      "Yatılı": "Merhaba, yatılı bakıcı hizmeti almak istiyorum.",
      "Genel": "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum."
    };
    const text = encodeURIComponent(messages[service] || messages["Genel"]);
    window.open(`https://wa.me/9${PHONES[0]}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 md:pb-0 selection:bg-blue-100">
      
      {/* 1. KATMANLI ARKA PLAN (Blobs) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[100px]"></div>
      </div>

      {/* --- NAVBAR (Glassmorphism) --- */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-blue-600 leading-none tracking-tighter">{COMPANY_NAME.toUpperCase()}</span>
            <span className="text-[10px] tracking-[0.2em] text-slate-400 font-bold mt-1">GÜVENİLİR EV HİZMETLERİ</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <a href={`tel:${PHONES[0]}`} className="font-black text-slate-800 hover:text-blue-600 transition-colors leading-none tracking-tight text-lg">
  {DISPLAY_PHONES[0]}
</a>
              <span className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ÇEVRİMİÇİ
              </span>
            </div>
            <button onClick={() => openWhatsApp(HERO_TITLE)} className="bg-slate-900 text-white px-8 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 transition-all shadow-xl shadow-slate-200">
              <MessageCircle size={18}/> WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Modern Split Style) --- */}
      <header className="relative px-6 py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Bakıcı Hizmeti"
            className="w-full h-full object-cover opacity-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/80 to-[#F8FAFC]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-white px-5 py-2 rounded-2xl shadow-sm text-blue-600 text-xs font-bold mb-8 backdrop-blur-sm">
             <Star size={14} fill="currentColor"/> %98 GERÇEK MÜŞTERİ MEMNUNİYETİ
          </div>
          {/* --- Home.jsx içindeki Hero Başlığı --- */}
<h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1] mb-8 text-slate-900">
  {/* Eğer " ve " varsa böler, yoksa direkt başlığı yazar */}
  {HERO_TITLE.includes(" ve ") ? HERO_TITLE.split(" ve ")[0] : HERO_TITLE} <br/>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
    {HERO_TITLE.includes(" ve ") ? HERO_TITLE.split(" ve ")[1] : ""}
  </span>
</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Siz hayatın tadını çıkarın, sevdiklerinize biz bakalım. İstanbul'un en prestijli bakıcı havuzuyla dakikalar içinde tanışın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <button onClick={() => openWhatsApp()} className="bg-green-500 text-white px-12 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-green-200 hover:bg-green-600 hover:-translate-y-1 transition-all active:scale-95">
              <MessageCircle size={28}/> WhatsApp’tan Yaz
            </button>
            <a href={`tel:${PHONES[0]}`} className="bg-white border-2 border-slate-100 text-slate-900 px-12 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:border-blue-600 hover:shadow-xl transition-all active:scale-95">
              <Phone size={28} className="text-blue-600"/> Hemen Ara
            </a>
          </div>

          {/* HİZMET KARTLARI GRID */}
          <div id="hizmetler" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            <QuickLink to="/hizmet/bebek-bakicisi" icon={<Baby/>} label="Bebek Bakıcısı" color="blue" />
            <QuickLink to="/hizmet/yasli-bakicisi" icon={<Heart/>} label="Yaşlı Bakıcısı" color="red" />
            <QuickLink to="/hizmet/hasta-bakicisi" icon={<Activity/>} label="Hasta Bakıcısı" color="emerald" />
            <QuickLink to="/hizmet/oyun-ablasi" icon={<Palette/>} label="Oyun Ablası" color="purple" />
            <QuickLink to="/hizmet/gunluk-temizlik" icon={<Sparkles/>} label="Günlük Temizlik" color="amber" />
            <QuickLink to="/hizmet/yatili-bakici" icon={<HomeIcon/>} label="Yatılı Bakıcı" color="indigo" />
          </div>
        </div>
      </header>

      {/* --- NEDEN BİZ? (Premium Cards) --- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Neden Biz?</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">Süreç boyunca yanınızda olan elit yönetim anlayışı.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard icon={<ShieldCheck/>} title="Referans Kontrollü" desc="Tüm adaylarımızın geçmiş iş deneyimleri ve güvenilirliği titizlikle doğrulanır." />
            <FeatureCard icon={<Zap/>} title="Hızlı Geri Dönüş" desc="Talebinizi ilettiğiniz anda uzman ekibimiz dakikalar içinde size uygun adayları sunar." />
            <FeatureCard icon={<CheckCircle/>} title="Değişim Desteği" desc="Memnun kalmadığınız takdirde, süreci aksatmadan yeni bir aday ile değişim sağlıyoruz." />
          </div>
        </div>
      </section>

      {/* --- NASIL ÇALIŞIR? (Timeline Style) --- */}
      <section id="nasil" className="py-24 px-6 bg-white/50 backdrop-blur-sm border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Nasıl Çalışıyoruz?</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">3 basit adımda profesyonel çözüm.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 relative">
            <StepCard number="01" title="İhtiyacınızı Dinliyoruz" desc="WhatsApp veya telefonla bize beklentilerinizi ve kriterlerinizi iletin." />
            <StepCard number="02" title="Uygun Adayları Sunuyoruz" desc="Havuzumuzdaki en uygun 3 adayı sizinle paylaşıp görüşme organize ediyoruz." />
            <StepCard number="03" title="Süreci Başlatıyoruz" desc="Karar verdiğiniz aday ile süreci başlatıyor, sonrasında takibini yapıyoruz." />
          </div>
        </div>
      </section>

      {/* --- SSS (Modern Accordion) --- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">Sıkça Sorulan Sorular</h2>
          <div className="space-y-6">
            <FAQItem question="Bakıcı seçimi nasıl yapılıyor?" answer="İhtiyacınızı detaylı şekilde dinledikten sonra aday havuzumuz içerisinden deneyim, referans ve uygunluk kriterlerine göre ön eleme yapıyoruz. Size en uygun adayları sunuyor, görüşme sürecini birlikte planlıyoruz. Karar tamamen sizin onayınızla verilir." />
            <FAQItem question="Aynı gün içinde bakıcı bulabilir miyim?" answer="İhtiyacın aciliyetine göre mümkün olan en hızlı şekilde dönüş sağlıyoruz. Uygun aday bulunması genellikle kısa sürede gerçekleşir, ancak kesin süre ihtiyaç detaylarına göre değişebilir." />
            <FAQItem question="Adaydan memnun kalmazsam ne olur?" answer="Sözleşme süreci dahilinde ücretsiz değişim desteği sunuyoruz. Size en uygun adayı bulana kadar yanınızdayız." />
            <FAQItem question="Adayların referans kontrolü yapılıyor mu?" answer="Evet. Tüm adaylarımızın daha önce çalıştıkları ailelerden referans kontrolleri yapılır. Deneyim, güvenilirlik ve çalışma disiplini titizlikle değerlendirilir. Amacımız yalnızca uygun değil, güvenilir eşleşme sağlamaktır." />
            <FAQItem question="Çalışma saatleri ve sistem nasıl belirleniyor?" answer="Gündüzlü, yarı zamanlı, tam zamanlı veya yatılı seçenekler ihtiyaçlarınıza göre belirlenir. Saat aralığı ve görev tanımı netleştirildikten sonra buna uygun aday yönlendirilir." />
            <FAQItem question="Fiyatlandırma nasıl yapılıyor?" answer="Ücretlendirme; çalışma süresi, görev kapsamı ve hizmet türüne göre değişiklik gösterir. Net bilgi için ihtiyaç detaylarının paylaşılması gerekir. Size şeffaf ve açık bir bilgilendirme yapılır." />
            <FAQItem question="Süreç boyunca destek veriyor musunuz?" answer="Evet. Eşleşme sağlandıktan sonra da iletişimde kalıyor, olası ihtiyaçlarda destek sunuyoruz. Amacımız yalnızca eşleştirme yapmak değil, sürecin sorunsuz ilerlemesini sağlamaktır." />

          </div>
        </div>
      </section>

      {/* --- PREMIUM FOOTER --- */}
      <footer id="iletisim" className="bg-slate-900 text-white pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="text-4xl font-black mb-8 uppercase tracking-tighter text-blue-500">{COMPANY_NAME}</div>
              <p className="text-slate-400 leading-relaxed text-lg font-medium">
                {ADDRESS}
                Beylikdüzü merkezli ofisimizle tüm İstanbul'da profesyonel bakıcı ve temizlik hizmetleri sağlıyoruz. 
                Sevdikleriniz için güven ve şefkat odaklı çözümler üretiyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                <div className="p-2 bg-blue-600/20 rounded-lg"><Phone size={24} className="text-blue-500"/></div>
                İletişim Hattı
              </h4>
              <div className="space-y-4">
  {PHONES.map((num, i) => (
    <a key={i} href={`tel:${num}`} className="block text-2xl font-black hover:text-blue-500 transition-colors tracking-tight">
      {DISPLAY_PHONES[i]}
    </a>
  ))}
</div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                <div className="p-2 bg-blue-600/20 rounded-lg"><MapPin size={24} className="text-blue-500"/></div>
                Adres
              </h4>
              <p className="text-slate-400 leading-relaxed font-medium">{ADDRESS}</p>
              <div className="mt-8 flex gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-blue-500"><Award size={24}/></div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-emerald-500"><ShieldCheck size={24}/></div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-10 text-center text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
            © 2026 {COMPANY_NAME} | DESIGNED FOR YMSB
          </div>
        </div>
      </footer>

      {/* --- MOBİL SABİT BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white/80 backdrop-blur-2xl border-t border-white/20 p-4 gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <button onClick={() => openWhatsApp()} className="flex-1 bg-green-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-lg active:scale-95 transition-all shadow-lg shadow-green-200">
          <MessageCircle size={24}/> WhatsApp
        </button>
        <a href={`tel:${PHONES[0]}`} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-lg active:scale-95 transition-all shadow-lg shadow-blue-200">
          <Phone size={24}/> Ara
        </a>
      </div>

    </div>
  );
};

// --- PREMIUM ALT BİLEŞENLER ---

const QuickLink = ({ icon, label, color, to }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white",
    red: "bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white",
    purple: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white",
    amber: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white",
  };
  return (
    <Link to={to} className={`${colors[color]} border p-8 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden bg-white`}>
      <div className="group-hover:scale-125 transition-transform duration-500 relative z-10">{React.cloneElement(icon, { size: 40 })}</div>
      <span className="text-xs font-black uppercase tracking-widest text-center relative z-10">{label}</span>
    </Link>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-10 rounded-[3rem] border border-white bg-white/60 backdrop-blur-sm hover:shadow-2xl hover:bg-white transition-all duration-500 group">
    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-2xl font-black mb-4 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="relative text-center group">
    <div className="w-20 h-20 bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-8 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
      {number}
    </div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed px-4">{desc}</p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white bg-white/40 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors">
        <span className="font-black text-slate-800 text-lg">{question}</span>
        <div className={`p-2 rounded-full bg-slate-100 transition-all ${isOpen ? 'rotate-180 bg-blue-600 text-white' : ''}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      {isOpen && (
        <div className="px-8 py-6 bg-white/60 text-slate-600 font-medium leading-relaxed border-t border-white/50">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Home;