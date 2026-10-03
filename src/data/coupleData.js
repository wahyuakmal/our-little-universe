/**
 * OUR LITTLE UNIVERSE - Configuration & Content Data (ID & EN)
 * 
 * Anda dapat menyesuaikan nama, tanggal, kutipan, foto, cerita, dan musik di bawah ini.
 * Bahasa default adalah Bahasa Indonesia ('id'), dan mendukung beralih ke Bahasa Inggris ('en').
 */

export const coupleConfig = {
  // Identitas Pasangan
  partner1: "Wahyu",
  partner2: "Nur",
  anniversaryDate: "2024-05-18", // Format YYYY-MM-DD untuk penghitung hari otomatis

  // Musik Latar
  music: {
    audioSrc: "/audio/music.mp3",
    title: "River Flows In You / Ambient Romance",
    artist: "Acoustic Melody"
  }
};

export const coupleDataByLang = {
  // ==========================================
  // BAHASA INDONESIA (DEFAULT)
  // ==========================================
  id: {
    title: "OUR LITTLE UNIVERSE",
    tagline: "Ruang digital untuk mendokumentasikan perjalanan cinta kita",

    nav: {
      story: "01 CERITA",
      timeline: "02 LINIMASA",
      moments: "03 MOMEN",
      prologue: "Prolog",
      replay: "Putar Ulang Prolog"
    },

    opening: {
      strangersText: "Berawal dari dua asing di riuhnya dunia.",
      storyText: "Terselip satu cerita yang tak pernah diduga.",
      pauseText: "Hingga detik demi detik berlalu…",
      culminationText: "Kita menjadi satu",
      buttonText: "MASUKI SEMESTA KITA",
      chapterText: "Babak 00 • Prolog",
      skipText: "Lewati intro"
    },

    hero: {
      badge: "SEMESTA KECIL KITA",
      title: "Di antara dua orang asing,\nkita menjadi Satu.",
      subtitle: "Kumpulan momen kecil, kenangan, dan cerita sunyi yang perlahan menjadi segalanya bagi kita berdua.",
      scrollText: "GULIR UNTUK MENJELAJAHI",
      mainImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1600&auto=format&fit=crop",
      imageCaption: "Koordinat petang yang teduh / 18:42 WIB",
      quoteOverlay: "“Di semesta yang seluas ini, hatiku memilih ketenangan di sampingmu.”",
      daysPrefix: "Hari ke-",
      daysSuffix: "di semesta kita"
    },

    story: {
      sectionNumber: "01",
      sectionTitle: "AWAL KISAH KITA",
      subheading: "Setiap kisah memiliki awal.\nKisah kita bersemi di antara kebetulan dan takdir.",
      date: "25.07.2025",
      chapterTag: "Babak I",
      title: "Pertemuan di Ranggon Jaya",
      location: "Tempat Kerja — Ranggon Jaya",
      description: `Awalnya, kita hanyalah dua orang yang menjalani hari seperti biasanya. Datang untuk bekerja, menyelesaikan tugas, dan pulang dengan cerita masing-masing. Tidak ada yang istimewa dari hari itu—setidaknya, sampai kita dipertemukan di tempat yang sama.

Di antara kesibukan, rutinitas, dan suasana tempat kerja di Ranggon Jaya, sebuah pertemuan sederhana perlahan menjadi awal dari sesuatu yang tidak pernah kita duga. Mungkin hanya sapaan kecil, percakapan singkat, atau sekadar tatapan yang bahkan saat itu tidak kita sadari akan memiliki arti begitu besar.

Hari-hari berikutnya membuat kita semakin sering bertemu. Dari yang awalnya hanya rekan di tempat kerja, perlahan muncul rasa nyaman yang sulit dijelaskan. Percakapan yang tadinya biasa mulai menjadi sesuatu yang ditunggu. Kehadiran yang awalnya terasa kebetulan, perlahan berubah menjadi bagian dari keseharian.

Lucunya, kita tidak pernah tahu bahwa seseorang yang kita temui di tengah rutinitas pekerjaan ternyata akan menjadi seseorang yang begitu berarti dalam perjalanan hidup kita.

Ranggon Jaya mungkin hanya sebuah tempat di mana kita bekerja. Namun bagi kita, tempat itu akan selalu menjadi saksi dari satu hal sederhana yang mengubah banyak hal:

hari ketika dua orang yang tidak saling mengenal, akhirnya dipertemukan.`,
      quote: "“Dunia di luar begitu bising, namun duduk di hadapanmu terasa seperti menemukan ruang paling tenang di seluruh semesta.”",
      image1: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
      image1Caption: "Sudut kedai kopi tempat waktu terasa berhenti",
      image2: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop",
      image2Caption: "Tatap mata pertama di tengah gerimis",
      coordinates: "40°42'46.1\"N 74°00'21.8\"W",
      archiveText: "Tersimpan dalam arsip kenangan kita"
    },

    timeline: {
      sectionNumber: "02",
      sectionTitle: "LINIMASA KITA",
      subheading: "Momen-momen kecil yang perlahan merangkai kisah kita.",
      milestones: [
        {
          id: "milestone-1",
          date: "25 JULI 2025",
          title: "Sapaan Pertama",
          subtitle: "Hujan gerimis, secangkir kopi, dan rasa canggung",
          description: "Sebuah percakapan spontan di bawah atap kedai kopi kala hujan. Kita berdua berusaha bersikap biasa, meski di dalam hati tak satupun dari kita yang ingin hujan lekas reda.",
          image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop",
          tag: "Babak I"
        },
        {
          id: "milestone-2",
          date: "02 JUNI 2024",
          title: "Kencan Pertama",
          subtitle: "Menyusuri jalanan kota hingga tengah malam",
          description: "Makan malam santai yang berlanjut menjadi jalan kaki melintasi jembatan kota yang hening sampai lampu jalan padam. Kita berbagi hidangan penutup dan baru menyadari selera musik kita sama persis.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
          tag: "Babak II"
        },
        {
          id: "milestone-3",
          date: "14 JULI 2024",
          title: "Kita Menjadi Kita",
          subtitle: "Di bawah langit senja keemasan",
          description: "Duduk berdampingan di atas bukit memandang matahari terbenam. Tanpa perlu kata-kata yang muluk, kita saling meyakini sebuah janji sunyi bahwa mulai detik itu, kita akan melangkah bersama.",
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
          tag: "Babak III"
        },
        {
          id: "milestone-4",
          date: "28 OKTOBER 2024",
          title: "Perjalanan Tengah Malam",
          subtitle: "Jendela terbuka, udara dingin, dan alunan lagu lama",
          description: "Spontan kabur dari hiruk pikuk kota pukul 11 malam. Kita berkendara menuju pantai dengan cokelat hangat di dalam termos, menatap langit malam yang bertabur bintang tak berujung.",
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
          tag: "Babak IV"
        },
        {
          id: "milestone-5",
          date: "15 FEBRUARI 2025",
          title: "Babak Baru",
          subtitle: "Membangun rumah dan ruang hangat bersama",
          description: "Menata tempat tinggal kita, merapikan piringan hitam, menyalakan lampu-lampu kecil, dan menyadari bahwa 'rumah' bukan lagi sekadar tempat tinggal—melainkan di mana pun kita berada bersama.",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
          tag: "Babak V"
        }
      ]
    },

    moments: {
      sectionNumber: "03",
      sectionTitle: "MOMEN KECIL",
      subheading: "Momen-momen yang awalnya tampak sederhana,\nnamun perlahan menjadi bagian paling berharga bagi kita.",
      memoryLabel: "Momen",
      ofLabel: "dari",
      gallery: [
        {
          id: "m-1",
          date: "12.08.2024",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
          caption: "“Sore santai tanpa rencana yang kini menjadi salah satu sore favoritku.”",
          location: "Toko Buku Tua",
          aspect: "portrait"
        },
        {
          id: "m-2",
          date: "23.09.2024",
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
          caption: "“Tangan saling menggenggam, secangkir teh hangat, dan hening yang menenangkan.”",
          location: "Teras Sore",
          aspect: "landscape"
        },
        {
          id: "m-3",
          date: "04.11.2024",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
          caption: "“Kutemukan tawamu yang paling tulus tepat di bawah hangatnya mentari.”",
          location: "Taman Kota",
          aspect: "portrait"
        },
        {
          id: "m-4",
          date: "19.12.2024",
          image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop",
          caption: "“Udara dingin di luar jendela, namun di sini selalu terasa hangat.”",
          location: "Di Sudut Ruang Kita",
          aspect: "square"
        },
        {
          id: "m-5",
          date: "01.01.2025",
          image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop",
          caption: "“Fajar pertama di tahun baru, menyambut perjalanan kita berikutnya.”",
          location: "Tebing Pantai Timur",
          aspect: "landscape"
        },
        {
          id: "m-6",
          date: "14.02.2025",
          image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1000&auto=format&fit=crop",
          caption: "“Bisikan lembut sebelum terlelap, ditemani irama rintik hujan di atap.”",
          location: "Kamar Kita",
          aspect: "portrait"
        },
        {
          id: "m-7",
          date: "30.03.2025",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          caption: "“Foto polaroid tua dari kamera antik yang kita temukan di pasar loak.”",
          location: "Pasar Seni",
          aspect: "square"
        },
        {
          id: "m-8",
          date: "22.06.2025",
          image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
          caption: "“Kaki telanjang di atas pasir pantai, tertawa sampai lupa waktu.”",
          location: "Pesisir Teluk",
          aspect: "landscape"
        }
      ]
    },

    loveLetter: {
      heading: "SECARIK CATATAN DI BAWAH LANGIT BINTANG",
      date: "Bisikan tulus di keheningan tengah malam",
      paragraphs: [
        "Dulu aku berpikir bahwa cinta adalah sesuatu yang bising dan riuh—seperti kembang api yang meledak di langit kota yang ramai. Namun bersamamu, aku menyadari bahwa cinta sejati justru bersemayam dalam keheningan yang tenang. Cinta hadir dalam denting cangkir kopi di pagi hari, dalam caramu memandang dunia dengan kelembutan, dan dalam keyakinan bahwa apa pun yang terjadi esok, kita akan menghadapinya berdua.",
        "Terima kasih telah menjadi dermaga yang teduh, teman percakapan tengah malam favoritku, dan rumah di setiap langkah hidupku. Jika hidup kita adalah ribuan buku di perpustakaan semesta, aku akan menghabiskan setiap waktu hanya untuk mencari rak di mana kisah kita berada."
      ],
      signature: "Selamanya milikmu, dengan segenap cinta"
    },

    final: {
      quote: "“Dan ini hanyalah sebuah permulaan.”",
      subtext: "Masih ada begitu banyak detik, tawa, dan cerita\nyang belum kita jalani bersama.",
      buttonText: "KISAH KITA BERLANJUT",
      footerText: "Dibuat dengan segenap cinta.",
      infinitySymbol: "∞",
      copyright: "Our Little Universe • Terukir selamanya di dalam hati kita"
    },

    musicPlayer: {
      label: "♫ LAGU KITA",
      playing: "Memutar lembut",
      paused: "Klik untuk memutar"
    },

    customization: {
      button: "Kustomisasi",
      title: "Panduan Kustomisasi Konten",
      subtitle: "src/data/coupleData.js",
      swapTitle: "Mengganti Foto, Teks & Cerita:",
      swapDesc: "Semua nama pasangan, tanggal penting, kutipan, foto, linimasa, dan lagu dapat diedit secara langsung di",
      keyTitle: "Pengaturan yang tersedia:",
      namesDesc: "Ubah nama pada partner1 dan partner2.",
      dateDesc: "Ubah anniversaryDate (misal: '2024-05-18') untuk menghitung otomatis jumlah hari bersama.",
      photosDesc: "Ganti tautan gambar Unsplash dengan URL foto Anda atau letakkan foto di folder public/images/.",
      musicDesc: "Ganti audioSrc dengan file MP3 lokal di folder public/audio/ atau tautan audio favorit kalian.",
      copyBtn: "Salin Konfigurasi",
      copiedBtn: "Tersalin!",
      closeBtn: "Tutup"
    }
  },

  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    title: "OUR LITTLE UNIVERSE",
    tagline: "A digital sanctuary for our shared memories",

    nav: {
      story: "01 STORY",
      timeline: "02 TIMELINE",
      moments: "03 MOMENTS",
      prologue: "Prologue",
      replay: "Replay Prologue"
    },

    opening: {
      strangersText: "Two strangers.",
      storyText: "One unexpected story.",
      pauseText: "And somehow…",
      culminationText: "We became us.",
      buttonText: "ENTER OUR UNIVERSE",
      chapterText: "Chapter 00 • Prologue",
      skipText: "Skip intro"
    },

    hero: {
      badge: "OUR LITTLE UNIVERSE",
      title: "Somewhere between two strangers,\nwe became us.",
      subtitle: "A collection of little moments, memories, and quiet stories that slowly turned into everything.",
      scrollText: "SCROLL TO EXPLORE",
      mainImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1600&auto=format&fit=crop",
      imageCaption: "Coordinates of a quiet evening / 18:42 PM",
      quoteOverlay: "“In a universe of billions, my heart chose the stillness next to you.”",
      daysPrefix: "Day",
      daysSuffix: "in our universe"
    },

    story: {
      sectionNumber: "01",
      sectionTitle: "HOW IT STARTED",
      subheading: "Every story has a beginning.\nOurs started somewhere between coincidence and fate.",
      date: "18.05.2024",
      chapterTag: "Chapter I",
      title: "The Accidental Intersection",
      location: "Rainy Street Corner & A Little Coffee Shop",
      description: `We didn't plan for this to happen. It was an ordinary Thursday afternoon, the kind where the rain lingers on the car glass and the city moves too quickly. We were both rushing from different worlds, seeking shelter under the exact same wooden awning.

What started as a shared half-smile over spilled espresso slowly dissolved into hours of conversation. We talked about obscure cinema, the books that kept us awake at three in the morning, and the strange feeling that we had already met somewhere in a forgotten dream.

Before that day, we were merely two people wandering the chaos of our own orbits. After that day, the gravity began to shift.`,
      quote: "“The world was loud, but sitting across from you felt like finding the quietest room in the universe.”",
      image1: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
      image1Caption: "The corner where coffee turned into hours",
      image2: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop",
      image2Caption: "Our first shared glance in the rain",
      coordinates: "40°42'46.1\"N 74°00'21.8\"W",
      archiveText: "In our memory archive"
    },

    timeline: {
      sectionNumber: "02",
      sectionTitle: "OUR TIMELINE",
      subheading: "Little moments that slowly became our story.",
      milestones: [
        {
          id: "milestone-1",
          date: "18 MAY 2024",
          title: "The First Hello",
          subtitle: "The rain, the coffee, and the hesitation",
          description: "A spontaneous conversation under a rainy café roof. We both pretended we weren't nervous, yet neither of us wanted the rain to stop.",
          image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop",
          tag: "Chapter I"
        },
        {
          id: "milestone-2",
          date: "02 JUNE 2024",
          title: "The First Date",
          subtitle: "Walking without a destination until midnight",
          description: "An unplanned dinner that extended into walking across quiet cobblestone bridges until the city streetlamps flickered out. We shared dessert and discovered our playlists were identical.",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
          tag: "Chapter II"
        },
        {
          id: "milestone-3",
          date: "14 JULY 2024",
          title: "We Became Us",
          subtitle: "Underneath the city horizon at twilight",
          description: "Sitting at the edge of the scenic overlook overlooking the amber sunset. Without needing grandiose speeches, we made a quiet promise that we were in this together.",
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
          tag: "Chapter III"
        },
        {
          id: "milestone-4",
          date: "28 OCTOBER 2024",
          title: "The Midnight Road Trip",
          subtitle: "Windows down, cold autumn air, and old cassettes",
          description: "Escaping the city noise on a whim at 11 PM. We drove towards the coast with hot chocolate in thermos flasks, staring at a sky sprinkled with endless constellations.",
          image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
          tag: "Chapter IV"
        },
        {
          id: "milestone-5",
          date: "15 FEBRUARY 2025",
          title: "Another Chapter",
          subtitle: "Building our sanctuary step by step",
          description: "Moving into our shared home, unpacking vinyl records, hanging fairy lights, and realizing that home is no longer a place—it's whenever we are side by side.",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
          tag: "Chapter V"
        }
      ]
    },

    moments: {
      sectionNumber: "03",
      sectionTitle: "LITTLE MOMENTS",
      subheading: "The moments that didn't seem important at first,\nbut somehow became our favorites.",
      memoryLabel: "Memory",
      ofLabel: "of",
      gallery: [
        {
          id: "m-1",
          date: "12.08.2024",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
          caption: "“A random afternoon that became one of my favorites.”",
          location: "Greenwich Bookstore",
          aspect: "portrait"
        },
        {
          id: "m-2",
          date: "23.09.2024",
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
          caption: "“Hands intertwined, warm tea, and zero words needed.”",
          location: "Sunday Porch",
          aspect: "landscape"
        },
        {
          id: "m-3",
          date: "04.11.2024",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
          caption: "“Caught you laughing in the middle of a golden ray.”",
          location: "Central Gardens",
          aspect: "portrait"
        },
        {
          id: "m-4",
          date: "19.12.2024",
          image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop",
          caption: "“Winter chill outside, but eternal warmth right here.”",
          location: "Home by the Fire",
          aspect: "square"
        },
        {
          id: "m-5",
          date: "01.01.2025",
          image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop",
          caption: "“The first sunrise of a new year, promising forever.”",
          location: "Eastern Cliff",
          aspect: "landscape"
        },
        {
          id: "m-6",
          date: "14.02.2025",
          image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1000&auto=format&fit=crop",
          caption: "“Soft whispers before falling asleep to the sound of rain.”",
          location: "Our Bedside Nook",
          aspect: "portrait"
        },
        {
          id: "m-7",
          date: "30.03.2025",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
          caption: "“Polaroids taken on a 1980s camera we found at a flea market.”",
          location: "Antique Market",
          aspect: "square"
        },
        {
          id: "m-8",
          date: "22.06.2025",
          image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
          caption: "“Bare feet in the ocean tide, laughing until our stomachs hurt.”",
          location: "Sunset Bay",
          aspect: "landscape"
        }
      ]
    },

    loveLetter: {
      heading: "A NOTE WRITTEN IN THE STARS",
      date: "A quiet midnight confession",
      paragraphs: [
        "I used to believe that love was something loud—like fireworks bursting over crowded city squares. But with you, I realized that true love is found in the stillness. It's the gentle clinking of coffee mugs at 7 AM. It's the way your eyes soften when you see something beautiful. It's the quiet reassurance that whatever the world throws at us tomorrow, we will face it with two pairs of hands.",
        "Thank you for being my gentle harbor, my favorite late-night conversation, and my home across all dimensions. If our lives were a thousand books, I would spend every lifetime searching the shelves just to find the one where you and I exist."
      ],
      signature: "Forever yours, with all my love"
    },

    final: {
      quote: "“And this is only the beginning.”",
      subtext: "There are still so many moments\nwe haven't lived yet.",
      buttonText: "OUR STORY CONTINUES",
      footerText: "Made with love.",
      infinitySymbol: "∞",
      copyright: "Our Little Universe • All rights reserved in our hearts"
    },

    musicPlayer: {
      label: "♫ OUR SONG",
      playing: "Playing softly",
      paused: "Click to play"
    },

    customization: {
      button: "Customize",
      title: "Customization Guide",
      subtitle: "src/data/coupleData.js",
      swapTitle: "Easily swap photos & text:",
      swapDesc: "All partner names, dates, quotes, photos, timeline events, and music can be edited directly inside",
      keyTitle: "Key settings available:",
      namesDesc: "Change partner1 & partner2.",
      dateDesc: "Set anniversaryDate (e.g. '2024-05-18') to calculate days together dynamically.",
      photosDesc: "Replace Unsplash image URLs with your own URLs or local images inside public/images/.",
      musicDesc: "Replace audioSrc with any local MP3 file in public/audio/ or custom audio URL.",
      copyBtn: "Copy Configuration",
      copiedBtn: "Copied!",
      closeBtn: "Close"
    }
  }
};

// Default export alias for compatibility
export const coupleData = {
  ...coupleConfig,
  ...coupleDataByLang.id,
  music: coupleConfig.music
};
