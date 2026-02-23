import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, MessageCircle, CheckCircle, ShieldCheck, 
  Clock, Star, ChevronDown, Info, Heart, Award, Users, MapPin, Phone, Sparkles
} from 'lucide-react';
import { db } from './firebase'; 
import { doc, onSnapshot } from "firebase/firestore"; 

// Fotoğraf Importları
import bebekFoto from './bebek-bakici-detay.jpg';
import hastaFoto from './hasta-bakici-detay.jpg';
import oyunFoto from './oyun-ablasi-detay.jpg';
import temizlikFoto from './temizlik-detay.jpg';
import yasliFoto from './yasli-bakici-detay.jpg';
import yatiliFoto from './yatili-bakici-detay.jpg';

const serviceData = {
  "bebek-bakicisi": {
    title: "Profesyonel Bebek Bakıcısı",
    image: bebekFoto,
    stats: { family: "1.150+", match: "2.800+", rating: "4.9/5" },
    heroDesc: "Bebeğiniz İçin Güvenli, Şefkatli ve Bilinçli Bakım",
    about: "Bebek bakımı, yalnızca “bakmak” değildir; güvenli ortam kurmak, rutini doğru yönetmek ve aileyle aynı dili konuşmaktır. Bi Tıkla Bakıcı olarak, bebeğinizin gelişim dönemine uygun adayları titizlikle seçiyoruz.",
    whoFor: [
      "İlk kez bakıcıyla çalışacak ebeveynler",
      "İş temposu yoğun olan profesyoneller",
      "Düzenli rutin ve disiplin isteyen aileler",
      "Gelişimi bilinçli aktivitelerle desteklemek isteyenler"
    ],
    scope: [
      "Günlük bakım, hijyen ve kıyafet düzeni",
      "Beslenme hazırlığı ve düzenli takip",
      "Uyku eğitimi ve geçiş desteği",
      "Yaşa uygun duyusal oyunlar ve kitap okuma"
    ],
    faqs: [
      { q: "Yatılı mı yoksa gündüzlü mü hizmet veriyorsunuz?", a: "İhtiyacınıza göre her iki seçenek için de geniş aday havuzumuz mevcuttur." },
      { q: "Bakıcının tecrübesinden nasıl emin olabilirim?", a: "Tüm adaylarımızın önceki çalıştığı ailelerden aldığımız referansları sizinle paylaşıyoruz." },
      { q: "Adayla anlaşamazsak değişim yapıyor musunuz?", a: "Evet, ilk 3 ay içinde ücretsiz yeni aday yönlendirme garantisi sunuyoruz." }
    ]
  },
  "yasli-bakicisi": {
    title: "Şefkatli Yaşlı Bakıcısı",
    image: yasliFoto,
    stats: { family: "980+", match: "1.900+", rating: "5.0" },
    heroDesc: "Sevdiklerinizin Konforu, Güvenliği ve Huzuru İçin",
    about: "Yaşlı bakımı; sabır, saygı ve güven ister. Ailenizin büyüğü evinde huzurla kalırken, siz de onun yalnız olmadığını bilmenin rahatlığını yaşayın.",
    whoFor: [
      "Tek başına yaşayan yaşlı yakınları",
      "Gün içinde refakatçi arayan aileler",
      "Sosyal yalnızlıktan kurtulmak isteyen bireyler",
      "Günlük yaşam desteğine (yemek, ilaç) ihtiyaç duyanlar"
    ],
    scope: [
      "Ev içi güvenli hareket desteği",
      "İlaç saatlerinin titiz takibi",
      "Sohbet ve moral odaklı sosyal destek",
      "Yürüyüş ve dış mekan refakati"
    ],
    faqs: [
      { q: "Bakıcılar tıbbi müdahale yapar mı?", a: "Bakıcılarımız refakat odaklıdır; ancak hemşire kökenli aday talebiniz olursa ona göre yönlendirme yapabiliriz." },
      { q: "Yaşlı birey yabancı birini istemezse ne yapıyoruz?", a: "İletişim dili güçlü, sabırlı ve yaşlı psikolojisinden anlayan adaylarla deneme süreci yapıyoruz." }
    ]
  },
  "hasta-bakicisi": {
    title: "Profesyonel Hasta Bakıcısı",
    image: hastaFoto,
    stats: { family: "720+", match: "1.200+", rating: "4.8/5" },
    heroDesc: "Zor Zamanlarda Profesyonel ve Düzenli Destek",
    about: "Hasta bakımında en kritik şey sürekliliktir. Ameliyat sonrası veya kronik durumlarda deneyimli adaylarımızla fiziksel ve mental yükünüzü hafifletiyoruz.",
    whoFor: [
      "Ameliyat sonrası evde destek bekleyenler",
      "Evde yalnız kalması sakıncalı hastalar",
      "Fiziksel destek gerektiren kronik durumlar",
      "Hastaneden eve geçiş sürecindeki aileler"
    ],
    scope: [
      "Mobilizasyon (hareket ettirme) desteği",
      "Vital bulguların takibi (ateş, nabız vb.)",
      "Beslenme ve kişisel hijyen yardımı",
      "Yara bakımı ve pansuman refakati"
    ],
    faqs: [
      { q: "Gece yatılı kalabiliyorlar mı?", a: "Evet, 24 saat esaslı yatılı hasta bakıcı hizmetimiz en çok tercih edilen seçeneğimizdir." },
      { q: "Kısa süreli (birkaç günlük) hizmet alabilir miyim?", a: "Genellikle uzun dönemli çalışıyoruz ancak acil durumlar için dönemsel aday sorabilirsiniz." }
    ]
  },
  "oyun-ablasi": {
    title: "Eğitici Oyun Ablası",
    image: oyunFoto,
    stats: { family: "860+", match: "1.500+", rating: "4.9/5" },
    heroDesc: "Oyunla Öğrenen, Mutlu ve Özgüvenli Çocuklar",
    about: "Oyun ablası, çocuğun enerjisini doğru yönlendiren, ekran süresini azaltıp yerine yaratıcılığı koyan modern bir destek sistemidir.",
    whoFor: [
      "2-8 yaş arası çocuğu olanlar",
      "Çocuğun sosyal becerilerini geliştirmek isteyenler",
      "İngilizce veya sanat odaklı oyun arayanlar",
      "Evde çalışırken çocuğuna kaliteli vakit ayırmak isteyenler"
    ],
    scope: [
      "Yaratıcı el sanatları ve boyama",
      "İnteraktif kitap okuma saatleri",
      "Zeka geliştirici oyunlar ve puzzle",
      "Dışarıda park ve aktivite refakati"
    ],
    faqs: [
      { q: "Oyun ablası derslerine yardım eder mi?", a: "Evet, okul öncesi hazırlık veya ilkokul ödev takibi konusunda destek sağlıyoruz." },
      { q: "Haftada kaç gün gelebilir?", a: "Haftalık planınıza göre 2 günden 6 güne kadar esnek çalışma saatleri mevcuttur." }
    ]
  },
  "gunluk-temizlik": {
    title: "Detaylı Temizlik Hizmeti",
    image: temizlikFoto,
    stats: { family: "2.300+", match: "5.000+", rating: "4.7/5" },
    heroDesc: "Hijyenik, Titiz ve Düzenli Temizlik Çözümleri",
    about: "Sadece görünen tozu değil, evinizdeki yaşam kalitesini artıracak derinlemesine hijyeni sağlıyoruz. Taşınma öncesi veya periyodik destekle yanınızdayız.",
    whoFor: [
      "Yeni eve taşınacak olanlar",
      "Haftalık düzenli temizlik isteyenler",
      "Bayram veya özel gün öncesi detaylı temizlik arayanlar",
      "Zamanı kısıtlı çalışan profesyoneller"
    ],
    scope: [
      "Mutfak ve banyo derinlemesine dezenfeksiyon",
      "Cam, çerçeve ve yüzey temizliği",
      "Dolap içi düzenleme (istek üzerine)",
      "İnşaat sonrası detaylı kalıntı temizliği"
    ],
    faqs: [
      { q: "Temizlik malzemelerini siz mi getiriyorsunuz?", a: "Genellikle aile temin eder ancak talep ederseniz malzemeli paketimizi de seçebilirsiniz." },
      { q: "Personel güvenilir mi?", a: "Tüm personelimiz adli sicil kaydı kontrol edilmiş ve referanslı kişilerden oluşur." }
    ]
  },
  "yatili-bakici": {
    title: "Yatılı Ev Yardımcısı",
    image: yatiliFoto,
    stats: { family: "1.450+", match: "3.200+", rating: "4.9/5" },
    heroDesc: "Evinizin Düzeni İçin Güvenilir ve Sürekli Destek",
    about: "Evinizin tüm yükünü omuzlayan, düzeni sağlayan ve sizin yaşamınızı kolaylaştıran profesyonel ev yardımcıları.",
    whoFor: [
      "Geniş evlerde düzen sağlamak isteyenler",
      "Hem ev işi hem çocuk bakımı desteği arayanlar",
      "Yatılı kalarak tam zamanlı destek isteyen aileler",
      "Mutfak ve yemek düzenine yardımcı arayanlar"
    ],
    scope: [
      "Günlük ev işleri, çamaşır ve ütü",
      "Yemek hazırlığı ve mutfak yönetimi",
      "Genel ev organizasyonu ve alışveriş",
      "Misafir ağırlama ve servis desteği"
    ],
    faqs: [
      { q: "İzin günleri nasıl ayarlanıyor?", a: "Genellikle haftada 1 gün (pazar veya cumartesi) izin kullanımı yaygındır." },
      { q: "Yabancı uyruklu adaylarınız var mı?", a: "Evet, hem Türk hem de oturma izinli deneyimli yabancı yardımcı seçeneklerimiz mevcuttur." }
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const data = serviceData[serviceId] || serviceData["bebek-bakicisi"];
  const [openFaq, setOpenFaq] = useState(null);
  const [liveSettings, setLiveSettings] = useState(null); // Firebase verisi için state

  useEffect(() => {
    // 1. Firebase'deki genel ayarları dinle
    const unsub = onSnapshot(doc(db, "ayarlar", "genel"), (docSnap) => {
      if (docSnap.exists()) {
        setLiveSettings(docSnap.data());
      }
    });

    window.scrollTo(0, 0);
    return () => unsub(); // Listener temizleme
  }, [serviceId]);

  // Firebase'den gelen veya varsayılan değerler
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

  const openWhatsApp = () => {
    // Numaradaki boşlukları temizleyerek gönderiyoruz
    const cleanPhone = PHONES[0].replace(/\s/g, '');
    const text = encodeURIComponent(`Merhaba, ${data.title} hizmetiniz hakkında detaylı bilgi almak istiyorum.`);
    window.open(`https://wa.me/9${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 font-sans text-slate-900 selection:bg-blue-100">
      <Helmet>
        <title>{data.title} | Bi Tıkla Bakıcı</title>
        <meta name="description" content={`${data.title} hizmetimizle İstanbul genelinde yanınızdayız. ${data.heroDesc}`} />
        <link rel="canonical" href={`https://www.bitiklabakici.com/hizmet/${serviceId}`} />
      </Helmet>
      {/* 1. PREMIUM BLOBS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute top-[30%] -right-[10%] w-[45%] h-[45%] bg-emerald-100/50 rounded-full blur-[110px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-indigo-100/30 rounded-full blur-[120px]"></div>
      </div>

      {/* 2. GLASS NAV */}
      <nav className="border-b border-white/20 px-6 py-4 sticky top-0 bg-white/70 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-left">
          <Link to="/" className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all">
            <div className="bg-white p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={18}/>
            </div>
            <span className="hidden sm:inline">Geri Dön</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Destek Hattı</span>
              <a href={`tel:${PHONES[0]}`} className="font-black text-slate-800 text-lg leading-none mt-1">{DISPLAY_PHONES[0]}</a>
            </div>
            <button onClick={openWhatsApp} className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
              <MessageCircle size={18}/> Teklif Al
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-left">
        
        {/* 3. HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-white px-4 py-2 rounded-2xl shadow-sm text-blue-600 text-xs font-bold mb-6 backdrop-blur-sm">
              <Sparkles size={14}/> 2026 PREMIUM ÜYELİK AVANTAJI
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
              {data.title} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Ayrıcalığını Keşfedin</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed mb-10 font-medium">
              {data.heroDesc} En az sizin kadar özenli, sizin kadar hassas bir süreç yönetimi.
            </p>
            
            {/* İSTATİSTİK KUTUCUKLARI */}
            <div className="flex flex-wrap gap-4 mb-12">
              {Object.entries(data.stats).map(([key, val], i) => (
                <div 
                  key={i} 
                  className="flex-1 min-w-[140px] bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300 text-center group"
                >
                  <div className="text-3xl font-black text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {val}
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                    {key === 'family' ? 'MUTLU AİLE' : key === 'match' ? 'EŞLEŞME' : 'MEMNUNİYET'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl overflow-hidden">
               <img src={data.image} alt={data.title} className="w-full h-[550px] object-cover rounded-[2rem]" />
            </div>
          </div>
        </section>

        {/* 4. CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none text-left">
                <ShieldCheck size={180} />
              </div>
              <h2 className="text-2xl font-black mb-6">Hizmet Vizyonumuz</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.about}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle className="text-emerald-400" /> Kapsamlı Destek
                </h3>
                <ul className="space-y-4">
                  {data.scope.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 text-left">
                <h3 className="text-xl font-bold mb-6 text-blue-900 flex items-center gap-2">
                  <Users className="text-blue-600" /> Hedef Kitle
                </h3>
                <ul className="space-y-4">
                  {data.whoFor.map((w, i) => (
                    <li key={i} className="flex items-center gap-3 text-blue-800 text-sm font-semibold">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-black mb-2">Hemen Başvurun</h3>
                <p className="text-sm text-slate-400">Danışmanımız 15 dakikada arasın.</p>
              </div>
              <button onClick={openWhatsApp} className="w-full bg-green-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-green-600 transition-all mb-4 flex items-center justify-center gap-2">
                WhatsApp Hattı
              </button>
              <a href={`tel:${PHONES[0]}`} className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-black border border-slate-200 transition-all flex items-center justify-center gap-2 hover:bg-white">
                <Phone size={18}/> Şimdi Ara
              </a>
              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4 text-xs font-bold text-slate-400">
                 <ShieldCheck size={20} className="text-blue-500"/> %100 Gizlilik ve Güvenlik
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* --- PREMIUM FOOTER (CANLI VERİLİ) --- */}
      <footer id="iletisim" className="bg-slate-900 text-white pt-24 pb-12 px-6 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 mb-20 text-left">
            <div>
              <div className="text-4xl font-black mb-8 uppercase tracking-tighter text-blue-500 leading-none">{COMPANY_NAME}</div>
              <p className="text-slate-400 leading-relaxed text-lg font-medium">
                Beylikdüzü merkezli ofisimizle tüm İstanbul'da profesyonel bakıcı ve temizlik hizmetleri sağlıyoruz. 
                Sevdikleriniz için güven ve şefkat odaklı çözümler üretiyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">İletişim Hattı</h4>
              <div className="space-y-4">
                {PHONES.map((num, i) => (
                  <a key={i} href={`tel:${num}`} className="block text-2xl font-black hover:text-blue-500 transition-colors tracking-tight">
                    {DISPLAY_PHONES[i]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">Adres</h4>
              <p className="text-slate-400 leading-relaxed font-medium">{ADDRESS}</p>
              <div className="mt-8 flex gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-blue-500"><Award size={24}/></div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-emerald-500"><ShieldCheck size={24}/></div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-10 text-center text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
            © 2026 {COMPANY_NAME} | DESIGNED FOR PREMIUM CARE
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetail;