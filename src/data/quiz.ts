// Konten untuk Section Quiz (Kuis Cinta Lucu & Romantis).
// Bagian bertanda [GANTI] bisa disesuaikan dengan kenangan dan cerita kalian berdua.

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResultLevel {
  title: string;
  desc: string;
  emoji: string;
}

export interface QuizConfig {
  badge: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  results: {
    perfect: QuizResultLevel;
    good: QuizResultLevel;
    remedial: QuizResultLevel;
  };
}

export const quizConfig: QuizConfig = {
  badge: "TES KECOCOKAN KITA 🧩", // [GANTI]
  title: "Ujian Kelayakan Pasangan", // [GANTI]
  subtitle: "Seberapa ingat dan peka kamu sama kisah perjalanan kita? Buktikan di sini!", // [GANTI]
  questions: [
    {
      id: "q-1",
      question: "Siapa yang biasanya paling lama kalau lagi milih menu makanan? 🤔", // [GANTI]
      options: [
        "Kamu lah pastinya!",
        "Aku yang plin-plan",
        "Dua-duanya sama aja",
        "Tukang parkirnya",
      ], // [GANTI]
      correctIndex: 0,
      explanation: "Haha! Ujung-ujungnya pasti jawab 'Terserah mau makan apa aja' kan! 😆", // [GANTI]
    },
    {
      id: "q-2",
      question: "Apa hal pertama yang bikin aku naksir sama kamu? ✨", // [GANTI]
      options: [
        "Senyum manisnya yang bikin adem",
        "Tawanya yang nular",
        "Tatapan matanya",
        "Semuanya tanpa terkecuali!",
      ], // [GANTI]
      correctIndex: 3,
      explanation: "Betul banget, dari atas sampai bawah semuanya bikin jatuh cinta berkali-kali! 🥰", // [GANTI]
    },
    {
      id: "q-3",
      question: "Kalau kita lagi nonton film berdua, siapa yang paling sering ketiduran duluan? 🍿", // [GANTI]
      options: [
        "Kamu pas intro film",
        "Aku di pertengahan cerita",
        "Gak ada, nonton sampai tamat",
        "Ngemilnya yang habis duluan",
      ], // [GANTI]
      correctIndex: 1,
      explanation: "Ngaku deh! Padahal awalnya yang ngajak nonton semangat banget! 😴", // [GANTI]
    },
    {
      id: "q-4",
      question: "Kalau lagi ngambek, obat paling ampuh buat bikin baikan apa coba? 🍦", // [GANTI]
      options: [
        "Dibelikan es krim & seblak",
        "Dipeluk erat-erat",
        "Ditransfer uang jajan",
        "Semua opsi di atas sekaligus!",
      ], // [GANTI]
      correctIndex: 3,
      explanation: "Paket komplit memang selalu jadi solusi terbaik anti-ngambek! 🥳", // [GANTI]
    },
  ],
  results: {
    perfect: {
      emoji: "🏆",
      title: "Skor 100% Sempurna! Soulmate Sejati!", // [GANTI]
      desc: "Luar biasa! Daya ingat dan kepekaanmu setingkat dewa. Resmi dinyatakan sebagai pasangan paling idaman di muka bumi! 💖", // [GANTI]
    },
    good: {
      emoji: "🌟",
      title: "Hampir Sempurna! Tetap Kesayangan!", // [GANTI]
      desc: "Cuma meleset dikit, tapi cintanya tetap 1000%! Boleh minta hadiah tambahan nanti pas ketemu ya! 🥰", // [GANTI]
    },
    remedial: {
      emoji: "😜",
      title: "Perlu Les Tambahan Nih!", // [GANTI]
      desc: "Ada beberapa yang lupa ya? Hukumannya wajib ditemenin jalan-jalan dan ditraktir makan enak akhir pekan ini! 🍜", // [GANTI]
    },
  },
};
