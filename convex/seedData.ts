const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const heroSlides = [
  {
    type: "Épisode",
    quote:
      "برشة توانسة يستناو حتى يوجعهم بدنهم باش يمشيو للطبيب. الوقاية تبدأ كي تسمع للعلامات الصغيرة قبل ما تكبر.",
    speaker: "د. آمنة الحداد",
    profession: "طبيبة قلب",
    episode: "Épisode 14",
    image: "/episodes/prevention-podcast.png"
  },
  {
    type: "Épisode",
    quote:
      "الدار موش كان حيطان وسقف. كي تكون معمولة على قياس الناس، تبدّل خدمتهم وراحتهم وحتى مزاجهم.",
    speaker: "مروان الفارسي",
    profession: "مهندس معماري",
    episode: "Épisode 11",
    image: "/episodes/episode-2.png"
  },
  {
    type: "Court",
    quote: "أخطر بند في العقد هو اللي تقول عليه عادي ونعدّي. غادي تبدأ المشاكل.",
    speaker: "كريم المنصوري",
    profession: "محامي أعمال",
    episode: "Court · 3 min",
    image: "/episodes/episode-3.png"
  },
  {
    type: "Épisode",
    quote:
      "باش تبيع تكوينك، ما تبداش بالسعر. إبدا بالمشكل اللي تحلو وبالنتيجة اللي يشوفها المتعلّم.",
    speaker: "سارة الرياحي",
    profession: "مكوّنة UX",
    episode: "Épisode 9",
    image: "/episodes/episode-4.png"
  },
  {
    type: "Série",
    quote:
      "الماكلة اليومية تنجم تعمل التهاب ساكت في البدن. موش ديما تحسّ بيه، أما التحاليل والحيوية يفضحوه.",
    speaker: "د. نادية البربار",
    profession: "أخصائية تغذية",
    episode: "Série · Partie 3",
    image: "/episodes/episode-5.png"
  },
  {
    type: "Épisode",
    quote:
      "النجاح موش تجري أكثر. النجاح تعمل سيستام يخدم حتى كي تكون تعبان ولا السوق يتبدّل.",
    speaker: "ليلى حداد",
    profession: "مستشارة استراتيجية",
    episode: "Épisode 15",
    image: "/episodes/episode-6.png"
  }
] as const;

export const podcasts = [
  {
    title: "علاش الوقاية أهم من الدواء وقت اللي المشكلة تكبر",
    guest: "د. آمنة الحداد",
    guestProfession: "طبيبة قلب",
    episode: "Épisode 14",
    duration: "42 min",
    image: "/episodes/prevention-podcast.png"
  },
  {
    title: "كيفاش نصممو فضاءات تخدم الناس موش العكس",
    guest: "مروان الفارسي",
    guestProfession: "مهندس معماري",
    episode: "Épisode 11",
    duration: "38 min",
    image: "/episodes/episode-2.png"
  },
  {
    title: "كيفاش تبيع تكوينك بلا ما تنقص من قيمتك",
    guest: "سارة الرياحي",
    guestProfession: "مكوّنة UX",
    episode: "Épisode 9",
    duration: "35 min",
    image: "/episodes/episode-3.png"
  },
  {
    title: "العقد اللي يلزمك قبل أول نهار خدمة",
    guest: "كريم المنصوري",
    guestProfession: "محامي أعمال",
    episode: "Épisode 7",
    duration: "44 min",
    image: "/episodes/episode-4.png"
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
    image: u("photo-1559757175-0eb30cd8c063", 1200, 675)
  },
  {
    title: "3 بنود في العقد الفريلانس يلزمك تقراهم مليح",
    excerpt:
      "محامي أعمال يفسّر البنود اللي تنجم تكسّر العلاقة مع الحريف وكيفاش تفاوض عليها قبل الإمضاء.",
    author: "كريم المنصوري",
    authorProfession: "محامي أعمال",
    category: "قانون",
    readTime: "8 min de lecture",
    image: u("photo-1450101499163-c8848c66ca85", 1200, 675)
  },
  {
    title: "علاش الأوبن سبيس ينقص في التركيز",
    excerpt:
      "الإضاءة، الصوت، وحركة الناس يبدلو الإنتاجية. مهندس معماري يشرح القرارات الصغيرة اللي تعمل فرق كبير.",
    author: "مروان الفارسي",
    authorProfession: "مهندس معماري",
    category: "هندسة",
    readTime: "5 min de lecture",
    image: u("photo-1497366216548-37526070297c", 1200, 675)
  },
  {
    title: "التهاب ساكت في البدن: شنوّة تنجم تعمل الماكلة اليومية",
    excerpt:
      "أخصائية تغذية تحكي على التحاليل، العادات اللي تزيد الالتهاب، والحلول الواقعية في الروتين التونسي.",
    author: "د. نادية البربار",
    authorProfession: "أخصائية تغذية",
    category: "تغذية",
    readTime: "7 min de lecture",
    image: u("photo-1512621776951-a57141f2eefd", 1200, 675)
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
    image: u("photo-1587825140708-dfaf72ae4b04", 900, 360)
  },
  {
    label: "Événement à venir",
    headline:
      "Forum Juridique de Demain : contrats, propriété intellectuelle et nouvelles règles pour les indépendants.",
    brand: "LFF 2026",
    location: "The Ritz-Carlton, Riyad",
    date: "8 – 9 avril 2026",
    image: u("photo-1560472354-b33ff0c44a43", 900, 360)
  }
] as const;

export const shorts = [
  {
    title: "تحليل دم برشة ناس ما يطلبوهش رغم إنو مهم",
    speaker: "د. نادية البربار",
    profession: "أخصائية تغذية",
    views: "24,1K vues",
    image: u("photo-1579154204601-01588f351e67", 540, 960)
  },
  {
    title: "البند الصغير في العقد اللي ينجم يوقف خدمتك",
    speaker: "كريم المنصوري",
    profession: "محامي",
    views: "18,4K vues",
    image: u("photo-1450101499163-c8848c66ca85", 540, 960)
  },
  {
    title: "علاش السلالم في البناية أهم مما تتصور",
    speaker: "مروان الفارسي",
    profession: "مهندس معماري",
    views: "11,7K vues",
    image: u("photo-1519710164239-da123dc03ef4", 540, 960)
  },
  {
    title: "كيفاش تحدد سعر تكوينك بلا خوف",
    speaker: "سارة الرياحي",
    profession: "مكوّنة",
    views: "15,3K vues",
    image: u("photo-1516321318423-f06f85e504b3", 540, 960)
  },
  {
    title: "شنوّة يشوف طبيب القلب في ECG ما تشوفوش إنتي",
    speaker: "د. آمنة الحداد",
    profession: "طبيبة قلب",
    views: "31,8K vues",
    image: u("photo-1628595351029-c2bf17511435", 540, 960)
  }
] as const;
