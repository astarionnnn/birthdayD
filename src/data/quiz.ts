// Konten untuk Section Quiz (5 soal pilihan ganda "Seberapa kenal kamu sama aku?").
// Skor akhir selalu lulus dengan teks konyol: "Skor kamu 100/100. Soalnya yang bikin aku, jadi aku yang nentuin."

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongAnswerResponses: string[]; // Array 3 respons lucu saat jawaban salah — ganti sesuka hati!
}

export interface QuizConfig {
  badge: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  finalResult: {
    scoreDisplay: string;
    title: string;
    message: string;
  };
}

export const quizConfig: QuizConfig = {
  badge: "TES KECOCOKAN KITA 🧩", // [GANTI]
  title: "Seberapa Kenal Kamu Sama Aku?", // [GANTI]
  subtitle: "Coba buktikan kepekaan dan daya ingatmu lewat 5 pertanyaan krusial ini!", // [GANTI]
  questions: [
    {
      id: "q-1",
      question: "Siapa yang biasanya paling lama kalau lagi milih menu makanan? 🤔", // [GANTI]
      options: [
        "Kamu lah pastinya!", // [GANTI]
        "Aku yang plin-plan", // [GANTI]
        "Dua-duanya sama aja", // [GANTI]
        "Tukang parkirnya", // [GANTI]
      ],
      correctIndex: 0,
      explanation: "Haha! Ujung-ujungnya pasti bilang 'Terserah mau makan apa aja' kan! 😆", // [GANTI]
      wrongAnswerResponses: [
        "Wah, salah besar! Tapi gapapa, tetep disayang kok 😄", // [GANTI]
        "Hmm, kamu kurang memperhatikan aku nih! Denda: kasih aku 1 pelukan 🥺", // [GANTI]
        "Itu jawaban... kreatif! Tapi bukan itu 😂", // [GANTI]
      ],
    },
    {
      id: "q-2",
      question: "Apa hal pertama yang bikin aku langsung naksir sama kamu? ✨", // [GANTI]
      options: [
        "Senyum manisnya yang bikin adem", // [GANTI]
        "Tawanya yang nular", // [GANTI]
        "Tatapan matanya", // [GANTI]
        "Semuanya tanpa terkecuali!", // [GANTI]
      ],
      correctIndex: 3,
      explanation: "Betul banget! Dari ujung rambut sampai ujung kaki semuanya bikin jatuh cinta berkali-kali! 🥰", // [GANTI]
      wrongAnswerResponses: [
        "Jawaban kamu lucu, tapi masih salah! Coba tanya langsung aja ya 😏", // [GANTI]
        "Hampir! Tapi sepertinya kamu masih butuh lebih banyak waktu buat kenali aku 😄", // [GANTI]
        "Salah, tapi tetep manis sih orangnya. Oke lah, dimaafkan! 💕", // [GANTI]
      ],
    },
    {
      id: "q-3",
      question: "Kalau kita lagi nonton film berdua, siapa yang paling sering ketiduran duluan? 🍿", // [GANTI]
      options: [
        "Kamu pas intro film", // [GANTI]
        "Aku di pertengahan cerita", // [GANTI]
        "Gak ada, kita nonton sampai tamat", // [GANTI]
        "Ngemilnya yang habis duluan", // [GANTI]
      ],
      correctIndex: 1,
      explanation: "Ngaku deh! Padahal awalnya yang ngajak nonton paling semangat! 😴", // [GANTI]
      wrongAnswerResponses: [
        "Salah! Tapi oke, aku maafin. Cukup bayar dengan 1 senyuman 😁", // [GANTI]
        "Hmm... aku rasa kamu sedang melindungi pelakunya 🕵️", // [GANTI]
        "Nope! Tapi jawaban ini cukup menghibur sih, hehe 😂", // [GANTI]
      ],
    },
    {
      id: "q-4",
      question: "Kalau kamu lagi badmood / ngambek, pertolongan pertama paling ampuh apa? 🍦", // [GANTI]
      options: [
        "Dibelikan es krim & seblak", // [GANTI]
        "Dipeluk erat-erat", // [GANTI]
        "Ditransfer uang jajan", // [GANTI]
        "Semua opsi di atas sekaligus!", // [GANTI]
      ],
      correctIndex: 3,
      explanation: "Paket lengkap anti-gagal! Gak ada ceritanya masih cemberut setelah ini! 🥳", // [GANTI]
      wrongAnswerResponses: [
        "Kurang lengkap! Harus paket komplit biar manjur 😤", // [GANTI]
        "Nah ini tanda kamu butuh riset lebih lanjut tentang aku 📋", // [GANTI]
        "Salah dong! Tapi ide bagus, dicatat dulu ah buat referensi 😂", // [GANTI]
      ],
    },
    {
      id: "q-5",
      question: "Seberapa besar rasa sayang aku ke kamu di hari ulang tahun ini? 📈", // [GANTI]
      options: [
        "Sebesar gunung", // [GANTI]
        "Sebesar samudra", // [GANTI]
        "Tak terhingga kuadrat!", // [GANTI]
        "Gak bisa dihitung rumus matematika apapun", // [GANTI]
      ],
      correctIndex: 3,
      explanation: "Kalkulator tercanggih di dunia pun bakal meledak kalau disuruh menghitungnya! 💖", // [GANTI]
      wrongAnswerResponses: [
        "Kurang besar! Rasa sayangku tidak bisa diukur oleh alam semesta 🌌", // [GANTI]
        "Jawaban itu terlalu kecil untuk menggambarkan perasaanku 💔 (tapi tetep disayang!)", // [GANTI]
        "Masih salah! Hint: jawabannya lebih besar dari yang kamu bayangkan 🥹", // [GANTI]
      ],
    },
  ],
  finalResult: {
    scoreDisplay: "100 / 100", // [GANTI]
    title: "LULUS DENGAN PREDIKAT TERBAIK! 🏆🎉", // [GANTI]
    message:
      "Skor kamu 100/100. Soalnya yang bikin aku, jadi aku yang nentuin. Pokoknya kamu resmi jadi manusia terfavoritku di dunia! 💖", // [GANTI]
  },
};
