/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  BookOpen, 
  Users, 
  Heart, 
  Utensils, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Menu,
  X,
  ChevronRight,
  Edit2,
  Save,
  RotateCcw,
  ArrowUp,
  Search,
  Check,
  CreditCard,
  Banknote,
  ShieldCheck,
  ArrowLeft,
  DollarSign,
  Gift
} from 'lucide-react';
import { PrayerTime, Service, Event, GalleryItem } from './types';

const PRAYER_TIMES: PrayerTime[] = [
  { 
    name: 'Fajr', 
    time: '05:15 AM',
    description: 'The dawn prayer, performed before sunrise. It signifies the beginning of the day and spiritual awakening.'
  },
  { 
    name: 'Sunrise', 
    time: '06:45 AM',
    description: 'The time when the sun begins to appear. While not a prayer itself, it marks the end of the Fajr prayer time.'
  },
  { 
    name: 'Dhuhr', 
    time: '12:30 PM',
    description: 'The noon prayer, performed after the sun passes its zenith. It provides a spiritual break during the busy workday.'
  },
  { 
    name: 'Asr', 
    time: '03:45 PM',
    description: 'The afternoon prayer. It is a time for reflection and gratitude as the day progresses towards evening.'
  },
  { 
    name: 'Sunset', 
    time: '06:15 PM',
    description: 'The time when the sun disappears below the horizon, marking the beginning of the Maghrib prayer time.'
  },
  { 
    name: 'Maghrib', 
    time: '06:20 PM',
    description: 'The evening prayer, performed just after sunset. It is often a time for families to gather and break their fast.'
  },
  { 
    name: 'Isha', 
    time: '07:45 PM',
    description: 'The night prayer, performed after twilight has disappeared. It is the final prayer of the day before rest.'
  },
  { 
    name: 'Jummah', 
    time: '01:15 PM',
    description: 'The Friday congregational prayer. It replaces Dhuhr on Fridays and includes a sermon (Khutbah) to guide the community.'
  },
];

const SERVICES: Service[] = [
  { 
    id: 'quran-classes',
    title: 'Quran Classes', 
    description: 'Structured learning for all ages to master Tajweed and Hifz. Our qualified instructors provide personalized guidance to help students connect deeply with the Holy Quran, ensuring correct pronunciation and memorization techniques.',
    icon: 'BookOpen',
    imageUrl: 'https://picsum.photos/seed/quran/800/600'
  },
  { 
    id: 'community-support',
    title: 'Community Support', 
    description: 'Providing counseling, financial aid, and moral support to families in our neighborhood. We offer a range of programs designed to help those facing hardships, ensuring that no one in our community feels alone or unsupported.',
    icon: 'Heart',
    imageUrl: 'https://picsum.photos/seed/support/800/600'
  },
  { 
    id: 'social-activities',
    title: 'Social Activities', 
    description: 'Youth programs and community gatherings to strengthen bonds. From sports tournaments to educational seminars, we provide a vibrant space for social interaction and growth within an Islamic framework.',
    icon: 'Users',
    imageUrl: 'https://picsum.photos/seed/social/800/600'
  },
  { 
    id: 'maktab-classes',
    title: 'Maktab Classes', 
    description: 'After-school Islamic education for children focusing on basic tenets of faith, history, and ethics. We aim to nurture a strong Islamic identity in the younger generation through engaging and age-appropriate lessons.',
    icon: 'BookOpen',
    imageUrl: 'https://picsum.photos/seed/maktab/800/600'
  },
  { 
    id: 'food-distribution',
    title: 'Friday Food Distribution', 
    description: 'Weekly meals shared with those in need after Jummah. Our volunteers prepare and distribute nutritious food, embodying the spirit of charity and brotherhood that defines our faith.',
    icon: 'Utensils',
    imageUrl: 'https://picsum.photos/seed/food/800/600'
  },
];

const EVENTS: Event[] = [
  { 
    id: 'khutbah-patience',
    title: 'Friday Khutbah: Patience in Trials', 
    date: 'Feb 27, 2026', 
    description: 'Join us for an inspiring talk on navigating life\'s challenges.',
    imageUrl: 'https://picsum.photos/seed/khutbah/800/600'
  },
  { 
    id: 'tajweed-workshop',
    title: 'Quran Tajweed Workshop', 
    date: 'Mar 05, 2026', 
    description: 'A 3-day intensive workshop for beginners and intermediates.',
    imageUrl: 'https://picsum.photos/seed/tajweed/800/600'
  },
  { 
    id: 'community-iftar',
    title: 'Community Iftar Dinner', 
    date: 'Mar 15, 2026', 
    description: 'Breaking fast together as one community. All are welcome.',
    imageUrl: 'https://picsum.photos/seed/iftar/800/600'
  },
];

const EVENT_DETAILS: Record<string, string> = {
  'khutbah-patience': 'This week\'s Khutbah will be delivered by Sheikh Ahmad, focusing on the Quranic perspective of Sabr (patience). We will explore how the Prophets handled adversity and how we can apply these lessons to our modern lives. The session will include a Q&A after the prayer.',
  'tajweed-workshop': 'Master the art of Quranic recitation. This workshop covers the fundamental rules of Tajweed, including articulation points (Makharij) and characteristics of letters (Sifaat). Participants will receive a digital handbook and personalized feedback from our qualified instructors.',
  'community-iftar': 'Join us for a warm evening of fellowship and food. The menu includes traditional dishes from around the Muslim world. We will start with dates and water at sunset, followed by Maghrib prayer and a full buffet dinner. Please RSVP for catering purposes.',
};

const GALLERY: GalleryItem[] = [
  { title: 'Main Prayer Hall', imageUrl: 'https://picsum.photos/seed/mosque1/800/600', category: 'Architecture' },
  { title: 'Quran Class', imageUrl: 'https://picsum.photos/seed/mosque2/800/600', category: 'Services' },
  { title: 'Community Service', imageUrl: 'https://picsum.photos/seed/mosque3/800/600', category: 'Services' },
  { title: 'Youth Program', imageUrl: 'https://picsum.photos/seed/mosque4/800/600', category: 'Events' },
  { title: 'Eid Celebration', imageUrl: 'https://picsum.photos/seed/mosque5/800/600', category: 'Events' },
  { title: 'Garden Area', imageUrl: 'https://picsum.photos/seed/mosque6/800/600', category: 'Architecture' },
  { title: 'Maktab', imageUrl: 'https://picsum.photos/seed/mosque7/800/600', category: 'Services' },
];

const MosqueLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C50 10 30 30 30 50C30 70 50 90 50 90C50 90 70 70 70 50C70 30 50 10 50 10Z" fill="currentColor" />
    <path d="M20 90H80V95H20V90Z" fill="currentColor" />
    <path d="M45 5V15M55 5V15M50 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="50" r="10" fill="white" fillOpacity="0.2" />
  </svg>
);

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonationPage />} />
      </Routes>
    </Router>
  );
}

const DonationPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleDonate = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-mosque-green flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-12 max-w-lg w-full text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-display font-bold text-mosque-green mb-4">JazakAllah Khair!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your generous donation of <span className="font-bold text-mosque-gold">${amount}</span>. 
            May Allah reward you abundantly and bless your wealth.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full gold-gradient text-white py-4 rounded-2xl font-bold text-xl shadow-xl hover:-translate-y-1 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mosque-cream/30 islamic-pattern py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-mosque-green font-bold mb-8 hover:text-mosque-gold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h1 className="text-5xl font-display font-bold text-mosque-green mb-6">Support Mosjid Al Fahad</h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Your donations are the lifeblood of our mosque. They help us maintain our facilities, 
              provide educational programs, and support those in need within our community.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-mosque-gold/10">
                <div className="w-12 h-12 bg-mosque-cream rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-mosque-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-mosque-green">Secure Payment</h3>
                  <p className="text-sm text-gray-500">Your transaction is encrypted and secure.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-mosque-gold/10">
                <div className="w-12 h-12 bg-mosque-cream rounded-2xl flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 text-mosque-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-mosque-green">Sadaqah Jariyah</h3>
                  <p className="text-sm text-gray-500">Invest in your hereafter with a recurring donation.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl border border-mosque-gold/10"
          >
            <form onSubmit={handleDonate} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-mosque-green uppercase tracking-widest mb-4">Select Amount</label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {['10', '50', '100'].map((val) => (
                    <button 
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                        amount === val 
                          ? 'bg-mosque-green text-white border-mosque-green' 
                          : 'border-mosque-cream text-mosque-green hover:border-mosque-gold'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="number" 
                    placeholder="Other Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-mosque-cream rounded-2xl focus:outline-none focus:border-mosque-gold transition-colors font-bold text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-mosque-green uppercase tracking-widest mb-4">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold border-2 transition-all ${
                      paymentMethod === 'card' 
                        ? 'bg-mosque-green text-white border-mosque-green' 
                        : 'border-mosque-cream text-mosque-green hover:border-mosque-gold'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" /> Card
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold border-2 transition-all ${
                      paymentMethod === 'bank' 
                        ? 'bg-mosque-green text-white border-mosque-green' 
                        : 'border-mosque-cream text-mosque-green hover:border-mosque-gold'
                    }`}
                  >
                    <Banknote className="w-5 h-5" /> Bank
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!amount || isProcessing}
                className="w-full gold-gradient text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Heart className="w-6 h-6" />
                    Donate ${amount || '0'} Now
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-[0.2em] font-bold">
                Securely processed by Mosjid Al Fahad
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(PRAYER_TIMES);
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrayerTimes, setTempPrayerTimes] = useState<PrayerTime[]>(PRAYER_TIMES);
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [loadingDetails, setLoadingDetails] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTime | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; timeRemaining: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateNextPrayer = () => {
      const now = currentTime;
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      const parsedTimes = prayerTimes
        .filter(p => p.name !== 'Sunrise' && p.name !== 'Sunset' && p.name !== 'Jummah')
        .map(p => {
          const [time, modifier] = p.time.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (modifier === 'PM' && hours !== 12) hours += 12;
          if (modifier === 'AM' && hours === 12) hours = 0;
          return { name: p.name, minutes: hours * 60 + minutes };
        })
        .sort((a, b) => a.minutes - b.minutes);

      let next = parsedTimes.find(p => p.minutes > currentMinutes);
      
      if (!next) {
        // If no more prayers today, next is Fajr tomorrow
        next = parsedTimes[0];
        const remaining = (24 * 60 - currentMinutes) + next.minutes;
        const h = Math.floor(remaining / 60);
        const m = remaining % 60;
        setNextPrayer({ name: next.name, timeRemaining: `${h}h ${m}m` });
      } else {
        const remaining = next.minutes - currentMinutes;
        const h = Math.floor(remaining / 60);
        const m = remaining % 60;
        setNextPrayer({ name: next.name, timeRemaining: `${h}h ${m}m` });
      }
    };

    calculateNextPrayer();
  }, [currentTime, prayerTimes]);

  useEffect(() => {
    if (isSearchOpen || selectedEvent || selectedImage || selectedService || selectedPrayer || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, selectedEvent, selectedImage, selectedService, selectedPrayer, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setTempPrayerTimes([...prayerTimes]);
    }
    setIsEditing(!isEditing);
  };

  const handleTimeChange = (index: number, newTime: string) => {
    const updated = [...tempPrayerTimes];
    updated[index] = { ...updated[index], time: newTime };
    setTempPrayerTimes(updated);
  };

  const handleSave = () => {
    setPrayerTimes(tempPrayerTimes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRegister = (eventTitle: string) => {
    setRegisteredEvents(prev => new Set(prev).add(eventTitle));
    setTimeout(() => {
      // Optional: hide message after some time if needed, 
      // but the prompt just says "shows a confirmation message"
    }, 3000);
  };

  const handleLearnMore = async (eventId: string) => {
    const event = EVENTS.find(e => e.id === eventId);
    if (event) {
      setLoadingDetails(eventId);
      // Simulate API fetch
      await new Promise(resolve => setTimeout(resolve, 600));
      setSelectedEvent(event);
      setLoadingDetails(null);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPopup = (service: Service) => {
    setSelectedService(service);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const filteredResults = searchQuery.trim() === '' ? [] : [
    ...SERVICES.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(s => ({ ...s, type: 'Service', link: '#services' })),
    ...EVENTS.filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(e => ({ ...e, type: 'Event', link: '#events' })),
    ...GALLERY.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(g => ({ ...g, type: 'Gallery', link: '#gallery' }))
  ];

  return (
    <div className="min-h-screen islamic-pattern">
      {/* Inquiry Success Toast */}
      <AnimatePresence>
        {inquirySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[200] bg-mosque-green text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-mosque-gold/30"
          >
            <div className="w-10 h-10 bg-mosque-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-mosque-green" />
            </div>
            <div>
              <p className="font-bold">Inquiry Sent Successfully!</p>
              <p className="text-sm text-white/80">We will contact you regarding <span className="text-mosque-gold font-semibold">{inquirySuccess}</span> soon.</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setInquirySuccess(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors border border-white/10"
              >
                Close
              </button>
              <button 
                onClick={() => setInquirySuccess(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prayer Detail Modal */}
      <AnimatePresence>
        {selectedPrayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedPrayer(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", damping: 25, stiffness: 300 }
              }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-16 text-center gold-gradient overflow-hidden">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                />
                <motion.div 
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"
                />
                
                <button 
                  onClick={() => setSelectedPrayer(null)}
                  className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90 z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3"
                >
                  <Clock className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-bold uppercase tracking-[0.3em] text-white/90 mb-3"
                >
                  {selectedPrayer.name} Prayer
                </motion.h2>
                
                <motion.p 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl font-display font-bold text-white tracking-tighter drop-shadow-lg"
                >
                  {selectedPrayer.time}
                </motion.p>
              </div>
              
              <div className="p-12 text-center bg-mosque-cream/30">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 leading-relaxed text-xl mb-10 font-medium"
                >
                  {selectedPrayer.description}
                </motion.p>
                
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setSelectedPrayer(null)}
                  className="w-full py-5 gold-gradient text-white rounded-2xl font-bold shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all text-lg"
                >
                  Close Details
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-mosque-green/95 backdrop-blur-xl p-6 md:p-20"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-display font-bold text-white">Search Site</h2>
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="relative mb-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-mosque-gold w-6 h-6" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Type to search services, events, or gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-6 pl-16 pr-6 text-xl text-white placeholder:text-white/40 focus:outline-none focus:border-mosque-gold transition-all"
                />
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, idx) => (
                    <motion.a
                      key={`${result.type}-${idx}`}
                      href={result.link}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="block p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-mosque-gold text-xs font-bold uppercase tracking-widest">{result.type}</span>
                        <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-mosque-gold transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{result.title}</h3>
                      {'description' in result && (
                        <p className="text-white/60 text-sm line-clamp-2">{result.description}</p>
                      )}
                    </motion.a>
                  ))
                ) : searchQuery.trim() !== '' ? (
                  <div className="text-center py-20">
                    <p className="text-white/40 text-lg italic">No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-white/40 text-lg italic">Start typing to see results...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100, rotate: -5 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                rotate: 0,
                transition: { 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 200,
                  mass: 1.2
                }
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0, 
                y: 100, 
                rotate: 5,
                transition: { duration: 0.4, ease: "backIn" }
              }}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80 overflow-hidden group">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 skew-x-12"
                />
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={selectedEvent.imageUrl} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mosque-green/90 via-mosque-green/20 to-transparent flex items-end p-10">
                  <div className="flex flex-col gap-2">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold uppercase tracking-widest">{selectedEvent.date}</span>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-4xl font-display font-bold text-white drop-shadow-md">{selectedEvent.title}</h2>
                    </motion.div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-12 bg-mosque-cream/30 relative">
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-10 right-10 w-40 h-40 opacity-[0.03] pointer-events-none rotate-12"
                >
                  <Calendar className="w-full h-full" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-700 leading-relaxed text-xl mb-8 relative z-10 font-medium"
                >
                  {selectedEvent.description}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-mosque-gold/20 italic text-mosque-green mb-10 relative z-10 shadow-sm"
                >
                  {EVENT_DETAILS[selectedEvent.id]}
                </motion.div>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 relative z-10"
                >
                  <button 
                    onClick={() => {
                      handleRegister(selectedEvent.title);
                      setSelectedEvent(null);
                    }}
                    className="flex-1 gold-gradient text-white py-5 rounded-2xl font-bold shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg group"
                  >
                    <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" /> Register Now
                  </button>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="px-10 py-5 border-2 border-mosque-green/10 rounded-2xl font-bold text-mosque-green hover:bg-mosque-green/5 transition-all text-lg"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", damping: 25, stiffness: 300 }
              }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80 overflow-hidden group">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={selectedService.imageUrl} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mosque-green/90 via-mosque-green/20 to-transparent flex items-end p-10">
                  <div className="flex items-center gap-5">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3"
                    >
                      <IconComponent name={selectedService.icon} className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-4xl font-display font-bold text-white drop-shadow-md">{selectedService.title}</h2>
                    </motion.div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-12 bg-mosque-cream/30 relative">
                <div className="absolute -top-10 right-10 w-40 h-40 opacity-[0.03] pointer-events-none rotate-12">
                  <IconComponent name={selectedService.icon} className="w-full h-full" />
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-700 leading-relaxed text-xl mb-10 relative z-10 font-medium"
                >
                  {selectedService.description}
                </motion.p>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 relative z-10"
                >
                  <button 
                    onClick={() => {
                      setInquirySuccess(selectedService.title);
                      setSelectedService(null);
                      setTimeout(() => setInquirySuccess(null), 5000);
                    }}
                    className="flex-1 gold-gradient text-white py-5 rounded-2xl font-bold shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    <Mail className="w-6 h-6" /> Inquire Now
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-10 py-5 border-2 border-mosque-green/10 rounded-2xl font-bold text-mosque-green hover:bg-mosque-green/5 transition-all text-lg"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-[130] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl mb-6"
                referrerPolicy="no-referrer"
              />
              <div className="text-center">
                <span className="text-mosque-gold text-sm font-bold uppercase tracking-widest mb-2 block">{selectedImage.category}</span>
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 gold-gradient text-white rounded-full shadow-2xl flex items-center justify-center hover:-translate-y-2 transition-transform active:scale-95 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="absolute inset-0 gold-gradient blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <MosqueLogo className={`w-12 h-12 relative z-10 transition-colors ${scrolled ? 'text-mosque-gold' : 'text-white'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-display font-bold leading-none ${scrolled ? 'text-mosque-green' : 'text-white'}`}>Mosjid Al Fahad</span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-bold mt-1 ${scrolled ? 'text-mosque-gold' : 'text-white/60'}`}>Islamic Center</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Prayer Times', 'About', 'Services', 'Events', 'Gallery'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium hover:text-mosque-gold transition-colors ${scrolled ? 'text-mosque-green' : 'text-white'}`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${scrolled ? 'text-mosque-green' : 'text-white'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex flex-col items-end mr-4">
              <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5 ${scrolled ? 'text-mosque-gold' : 'text-white/60'}`}>Current Time</p>
              <p className={`font-display font-bold text-lg leading-none ${scrolled ? 'text-mosque-green' : 'text-white'}`}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                <span className="text-xs ml-1 opacity-60 font-sans">{currentTime.toLocaleTimeString([], { second: '2-digit' })}</span>
              </p>
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-8 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex items-center gap-2 group"
            >
              <Heart className="w-4 h-4 group-hover:scale-125 transition-transform" />
              Donate
            </button>
          </div>

          <button className="md:hidden text-mosque-green" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-mosque-green' : 'text-white'} /> : <Menu className={scrolled ? 'text-mosque-green' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {['Home', 'Prayer Times', 'About', 'Services', 'Events', 'Gallery'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-mosque-green font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/donate');
                  }}
                  className="gold-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" /> Donate Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/7Z4RbC2v/image.png" 
            alt="Mosjid Al Fahad" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Mosjid Al Fahad
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 font-light italic"
          >
            “A Place of Peace, Prayer & Community”
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#prayer-times"
              className="w-full sm:w-auto inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all hover:-translate-y-1 text-center"
            >
              View Prayer Times
            </a>
            <button 
              onClick={() => navigate('/donate')}
              className="w-full sm:w-auto gold-gradient text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group"
            >
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Donate Now
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section id="prayer-times" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-20"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mosque-cream text-mosque-gold font-bold text-xs uppercase tracking-widest mb-6 border border-mosque-gold/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mosque-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mosque-gold"></span>
              </span>
              Live Prayer Schedule
            </div>
            
            <h2 className="text-5xl font-display font-bold text-mosque-green mb-4">Daily Prayer Times</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Join us for congregational prayers at Mosjid Al Fahad. Times are updated daily to reflect the solar calendar.
            </p>

            {nextPrayer && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-mosque-green text-white inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 p-6 md:p-8 rounded-[2rem] shadow-2xl mb-12 border border-mosque-gold/30 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-mosque-gold/20 rounded-2xl flex items-center justify-center text-mosque-gold">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <p className="text-mosque-gold font-bold uppercase tracking-widest text-xs mb-1">Next Prayer</p>
                    <h3 className="text-3xl font-display font-bold">{nextPrayer.name}</h3>
                  </div>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-white/20"></div>
                <div className="text-center md:text-left">
                  <p className="text-white/60 font-medium text-sm mb-1 uppercase tracking-wider">Starts In</p>
                  <p className="text-4xl font-display font-bold tracking-tighter text-mosque-gold">{nextPrayer.timeRemaining}</p>
                </div>
              </motion.div>
            )}
            
            <div className="flex justify-center gap-4">
              {!isEditing ? (
                <button 
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 text-mosque-light-green hover:text-mosque-gold transition-colors font-semibold text-sm"
                >
                  <Edit2 className="w-4 h-4" /> Edit Times
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-mosque-green text-white px-4 py-2 rounded-lg hover:bg-mosque-light-green transition-colors font-semibold text-sm shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {(isEditing ? tempPrayerTimes : prayerTimes).map((prayer, index) => {
              const isNext = nextPrayer?.name === prayer.name;
              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-3xl text-center transition-all duration-500 border cursor-pointer group relative overflow-hidden ${
                    isNext 
                      ? 'bg-mosque-green text-white border-mosque-gold shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] scale-105 z-10' 
                      : prayer.name === 'Jummah'
                        ? 'bg-mosque-cream text-mosque-green border-mosque-gold/30 shadow-lg'
                        : 'bg-white border-gray-100 hover:border-mosque-gold hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedPrayer(prayer)}
                >
                  {isNext && (
                    <div className="absolute top-0 right-0 p-2">
                      <div className="w-2 h-2 bg-mosque-gold rounded-full animate-ping"></div>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 ${
                    isNext ? 'bg-mosque-gold text-mosque-green' : 'bg-mosque-cream text-mosque-gold'
                  }`}>
                    <Clock className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${isNext ? 'text-mosque-gold' : 'text-gray-400'}`}>
                    {prayer.name}
                  </h3>
                  
                  {isEditing ? (
                    <input 
                      type="text"
                      value={prayer.time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className={`w-full text-center bg-white/10 border border-white/20 rounded px-1 py-1 text-sm font-bold focus:outline-none focus:border-mosque-gold ${isNext ? 'text-white' : 'text-mosque-green'}`}
                    />
                  ) : (
                    <p className={`text-xl font-display font-bold tracking-tight ${isNext ? 'text-white' : 'text-mosque-green'}`}>
                      {prayer.time}
                    </p>
                  )}

                  {isNext && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-[10px] font-bold uppercase tracking-widest text-mosque-gold"
                    >
                      Next Prayer
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            {...fadeIn}
            className="mt-20 p-10 bg-mosque-cream/30 rounded-[3rem] border border-mosque-gold/20 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-mosque-green mb-2">Help us maintain our sanctuary?</h3>
              <p className="text-gray-600">Your donations help us keep the mosque clean, comfortable, and open for all.</p>
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 group whitespace-nowrap"
            >
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Support Our Sanctuary
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-mosque-gold rounded-tl-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-mosque-gold rounded-br-3xl"></div>
            <img 
              src="https://i.postimg.cc/3rDfBjjQ/image.png" 
              alt="Our Story" 
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <span className="text-mosque-gold font-semibold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-mosque-green mb-8">A Center for Worship & Unity</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Mosjid Al Fahad stands as a beacon of spiritual guidance and community strength. More than just a place of prayer, it is a sanctuary where individuals from all walks of life come together to find peace and purpose.
              </p>
              <p>
                Our mission is to foster an environment of learning, compassion, and unity. Through our various programs and services, we strive to support our community, nurture the youth, and provide a welcoming space for all who seek to connect with their faith and fellow neighbors.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
              <button className="flex items-center gap-2 text-mosque-green font-bold hover:text-mosque-gold transition-colors group">
                Learn More About Our History <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/donate')}
                className="gold-gradient text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 group"
              >
                <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" />
                Support Our Mission
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-mosque-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="islamic-pattern w-full h-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-default"
              >
                <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <IconComponent name={service.icon} className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <div className="relative">
                  <p className="text-white/70 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <button 
                    onClick={() => openPopup(service)}
                    className="mt-4 text-mosque-gold text-sm font-bold hover:underline flex items-center gap-1 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            {...fadeIn}
            className="mt-20 p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Want to support these services?</h3>
              <p className="text-white/60">Your contributions directly fund our educational and community programs.</p>
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 group whitespace-nowrap"
            >
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Support Our Community
            </button>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-mosque-gold font-semibold tracking-widest uppercase text-sm mb-4 block">Stay Connected</span>
              <h2 className="text-4xl font-bold text-mosque-green">Upcoming Events</h2>
            </div>
            <button className="text-mosque-green font-bold border-b-2 border-mosque-gold pb-1 hover:text-mosque-gold transition-colors">
              View All Events
            </button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl group"
              >
                <div className="flex items-center gap-3 text-mosque-gold mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">{event.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-mosque-green mb-4 group-hover:text-mosque-gold transition-colors">{event.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{event.description}</p>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleLearnMore(event.id)}
                    className="w-full py-3 rounded-xl border border-mosque-green/20 text-mosque-green font-semibold hover:bg-mosque-green hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    {loadingDetails === event.id ? (
                      <div className="w-5 h-5 border-2 border-mosque-green border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Learn More'
                    )}
                  </button>
                  {registeredEvents.has(event.title) ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-center flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-emerald-700" /> Registration successful!
                    </motion.div>
                  ) : (
                    <button 
                      onClick={() => handleRegister(event.title)}
                      className="w-full py-3 rounded-xl gold-gradient text-white font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
                    >
                      Register
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            {...fadeIn}
            className="mt-20 p-10 bg-mosque-cream rounded-[3rem] border border-mosque-gold/20 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-mosque-green mb-2">Help us organize more events?</h3>
              <p className="text-gray-600">Your donations help us cover the costs of community gatherings and educational programs.</p>
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 group whitespace-nowrap"
            >
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Support Our Events
            </button>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-mosque-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-mosque-green mb-4">Photo Gallery</h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full mb-8"></div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Services', 'Events', 'Architecture'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    galleryFilter === filter 
                      ? 'gold-gradient text-white shadow-md' 
                      : 'bg-white text-mosque-green border border-gray-200 hover:border-mosque-gold'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {GALLERY.filter(item => galleryFilter === 'All' || item.category === galleryFilter).map((item, index) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(item)}
                  className="relative group overflow-hidden rounded-3xl cursor-pointer break-inside-avoid"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div>
                      <span className="text-mosque-gold text-xs font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                      <h3 className="text-white text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="mt-20 p-10 bg-white rounded-[3rem] border border-mosque-gold/20 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-mosque-green mb-2">Help us capture more moments?</h3>
              <p className="text-gray-600">Your support helps us expand our facilities and create more memories together.</p>
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 group whitespace-nowrap"
            >
              <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
              Support Our Growth
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mosque-green text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <MosqueLogo className="w-12 h-12 text-mosque-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold leading-none">Mosjid Al Fahad</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1 text-mosque-gold">Islamic Center</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-8">
              A place of worship, community, and peace. Dedicated to serving the spiritual and social needs of our neighborhood.
            </p>
            <div className="flex gap-4 mb-8">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-mosque-gold hover:border-mosque-gold transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <button 
              onClick={() => navigate('/donate')}
              className="gold-gradient text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 group"
            >
              <Heart className="w-4 h-4 group-hover:scale-125 transition-transform" />
              Support Our Mosque
            </button>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-mosque-gold">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-mosque-gold">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mosque-gold shrink-0" />
                <span>123 Islamic Center Way, Faith City, FC 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mosque-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mosque-gold shrink-0" />
                <span>info@mosjidalfahad.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-mosque-gold">Send a Message</h4>
            {contactSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-mosque-gold/30 p-6 rounded-2xl text-center"
              >
                <div className="w-12 h-12 bg-mosque-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-mosque-gold w-6 h-6" />
                </div>
                <p className="text-mosque-gold font-bold mb-2">Message Sent!</p>
                <p className="text-white/60 text-xs">Thank you for reaching out. We will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input 
                  required
                  type="text" 
                  placeholder="Name" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mosque-gold transition-colors"
                />
                <input 
                  required
                  type="email" 
                  placeholder="Email" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mosque-gold transition-colors"
                />
                <textarea 
                  required
                  placeholder="Message" 
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-mosque-gold transition-colors resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full gold-gradient text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Mosjid Al Fahad. All rights reserved. Designed with peace and purpose.</p>
        </div>
      </footer>
    </div>
  );
}
