const palette = [
  ["#facc15", "#ef4444", "#111827"],
  ["#22d3ee", "#2563eb", "#020617"],
  ["#a78bfa", "#ec4899", "#18181b"],
  ["#34d399", "#84cc16", "#052e16"],
  ["#fb923c", "#f97316", "#1c1917"],
  ["#f472b6", "#8b5cf6", "#111827"],
  ["#38bdf8", "#14b8a6", "#0f172a"],
  ["#fde047", "#f59e0b", "#1c1917"]
] as const;

const soon = (seed: string) => {
  const [from, to, ink] = palette[Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient><pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0v48" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/></pattern></defs><rect width="1200" height="675" fill="url(#g)"/><rect width="1200" height="675" fill="url(#p)" opacity=".45"/><circle cx="210" cy="115" r="250" fill="rgba(255,255,255,.34)"/><circle cx="1010" cy="585" r="280" fill="rgba(0,0,0,.24)"/><g transform="rotate(-8 600 337.5)"><rect x="410" y="250" width="380" height="145" rx="18" fill="rgba(255,255,255,.82)"/><text x="600" y="347" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="900" letter-spacing="8" fill="${ink}">SOON</text></g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const heroSlides = [
  {
    type: "Épisode",
    quote:
      "برشة توانسة يستناو حتى يوجعهم بدنهم باش يمشيو للطبيب. الوقاية تبدأ كي تسمع للعلامات الصغيرة قبل ما تكبر.",
    speaker: "د. آمنة الحداد",
    profession: "طبيبة قلب",
    episode: "Épisode 14",
    image: soon("hero-1")
  },
  {
    type: "Épisode",
    quote:
      "الدار موش كان حيطان وسقف. كي تكون معمولة على قياس الناس، تبدّل خدمتهم وراحتهم وحتى مزاجهم.",
    speaker: "مروان الفارسي",
    profession: "مهندس معماري",
    episode: "Épisode 11",
    image: soon("hero-2")
  },
  {
    type: "Court",
    quote: "أخطر بند في العقد هو اللي تقول عليه عادي ونعدّي. غادي تبدأ المشاكل.",
    speaker: "كريم المنصوري",
    profession: "محامي أعمال",
    episode: "Court · 3 min",
    image: soon("hero-3")
  },
  {
    type: "Épisode",
    quote:
      "باش تبيع تكوينك، ما تبداش بالسعر. إبدا بالمشكل اللي تحلو وبالنتيجة اللي يشوفها المتعلّم.",
    speaker: "سارة الرياحي",
    profession: "مكوّنة UX",
    episode: "Épisode 9",
    image: soon("hero-4")
  },
  {
    type: "Série",
    quote:
      "الماكلة اليومية تنجم تعمل التهاب ساكت في البدن. موش ديما تحسّ بيه، أما التحاليل والحيوية يفضحوه.",
    speaker: "د. نادية البربار",
    profession: "أخصائية تغذية",
    episode: "Série · Partie 3",
    image: soon("hero-5")
  },
  {
    type: "Épisode",
    quote:
      "النجاح موش تجري أكثر. النجاح تعمل سيستام يخدم حتى كي تكون تعبان ولا السوق يتبدّل.",
    speaker: "ليلى حداد",
    profession: "مستشارة استراتيجية",
    episode: "Épisode 15",
    image: soon("hero-6")
  }
] as const;

export const podcasts = [
  {
    title: "علاش الوقاية أهم من الدواء وقت اللي المشكلة تكبر",
    guest: "د. آمنة الحداد",
    guestProfession: "طبيبة قلب",
    episode: "Épisode 14",
    duration: "42 min",
    image: soon("podcast-1")
  },
  {
    title: "كيفاش نصممو فضاءات تخدم الناس موش العكس",
    guest: "مروان الفارسي",
    guestProfession: "مهندس معماري",
    episode: "Épisode 11",
    duration: "38 min",
    image: soon("podcast-2")
  },
  {
    title: "كيفاش تبيع تكوينك بلا ما تنقص من قيمتك",
    guest: "سارة الرياحي",
    guestProfession: "مكوّنة UX",
    episode: "Épisode 9",
    duration: "35 min",
    image: soon("podcast-3")
  },
  {
    title: "العقد اللي يلزمك قبل أول نهار خدمة",
    guest: "كريم المنصوري",
    guestProfession: "محامي أعمال",
    episode: "Épisode 7",
    duration: "44 min",
    image: soon("podcast-4")
  }
] as const;

export const articles = [
  {
    title: "5 علامات في القلب برشة ناس يحسبوها تعب",
    excerpt:
      "طلوع الدروج بصعوبة ولا خفقان خفيف موش ديما قلة نوم. دكتورة قلب تفسّر وقتاش يلزمك تتحرّك.",
    author: "د. آمنة الحداد",
    authorProfession: "طبيبة قلب",
    category: "صحة",
    readTime: "6 min de lecture",
    image: soon("article-1")
  },
  {
    title: "3 بنود في العقد الفريلانس يلزمك تقراهم مليح",
    excerpt:
      "محامي أعمال يفسّر البنود اللي تنجم تكسّر العلاقة مع الحريف وكيفاش تفاوض عليها قبل الإمضاء.",
    author: "كريم المنصوري",
    authorProfession: "محامي أعمال",
    category: "قانون",
    readTime: "8 min de lecture",
    image: soon("article-2")
  },
  {
    title: "علاش الأوبن سبيس ينقص في التركيز",
    excerpt:
      "الإضاءة، الصوت، وحركة الناس يبدلو الإنتاجية. مهندس معماري يشرح القرارات الصغيرة اللي تعمل فرق كبير.",
    author: "مروان الفارسي",
    authorProfession: "مهندس معماري",
    category: "هندسة",
    readTime: "5 min de lecture",
    image: soon("article-3")
  },
  {
    title: "التهاب ساكت في البدن: شنوّة تنجم تعمل الماكلة اليومية",
    excerpt:
      "أخصائية تغذية تحكي على التحاليل، العادات اللي تزيد الالتهاب، والحلول الواقعية في الروتين التونسي.",
    author: "د. نادية البربار",
    authorProfession: "أخصائية تغذية",
    category: "تغذية",
    readTime: "7 min de lecture",
    image: soon("article-4")
  }
] as const;

export const ads = [
  {
    label: "Événement à venir",
    headline:
      "Sommet arabe des professionnels de santé 2026 — là où les praticiens partagent ce qu'ils ne disent jamais en consultation.",
    brand: "AHP Summit",
    location: "Grand Hyatt, Dubaï",
    date: "15 – 17 mars 2026",
    image: soon("ad-1")
  },
  {
    label: "Événement à venir",
    headline:
      "Forum Juridique de Demain : contrats, propriété intellectuelle et nouvelles règles pour les indépendants.",
    brand: "LFF 2026",
    location: "The Ritz-Carlton, Riyad",
    date: "8 – 9 avril 2026",
    image: soon("ad-2")
  }
] as const;

export const shorts = [
  {
    title: "تحليل دم برشة ناس ما يطلبوهش رغم إنو مهم",
    speaker: "د. نادية البربار",
    profession: "أخصائية تغذية",
    views: "24,1K vues",
    image: soon("short-1")
  },
  {
    title: "البند الصغير في العقد اللي ينجم يوقف خدمتك",
    speaker: "كريم المنصوري",
    profession: "محامي",
    views: "18,4K vues",
    image: soon("short-2")
  },
  {
    title: "علاش السلالم في البناية أهم مما تتصور",
    speaker: "مروان الفارسي",
    profession: "مهندس معماري",
    views: "11,7K vues",
    image: soon("short-3")
  },
  {
    title: "كيفاش تحدد سعر تكوينك بلا خوف",
    speaker: "سارة الرياحي",
    profession: "مكوّنة",
    views: "15,3K vues",
    image: soon("short-4")
  },
  {
    title: "شنوّة يشوف طبيب القلب في ECG ما تشوفوش إنتي",
    speaker: "د. آمنة الحداد",
    profession: "طبيبة قلب",
    views: "31,8K vues",
    image: soon("short-5")
  }
] as const;
