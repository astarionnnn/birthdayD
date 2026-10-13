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
  subtitle: "Coba buktikan kejagoanmu lewat 5 pertanyaan ini!", // [GANTI]
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
      correctIndex: 3,
      explanation: "u know what i thin yeahhhh wkwkw", // [GANTI]
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
        "Semuanya!!!", // [GANTI]
      ],
      correctIndex: 3,
      explanation: "Hehe i love u sayang 🥰", // [GANTI]
      wrongAnswerResponses: [
        "Jawaban kamu lucu, tapi masih salah! Coba tanya langsung aja ya 😏", // [GANTI]
        "Hampir! Tapi sepertinya kamu masih butuh lebih banyak waktu buat kenali aku 😄", // [GANTI]
        "Salah, tapi tetep manis sih orangnya. Oke lah, dimaafkan! 💕", // [GANTI]
      ],
    },
    {
      id: "q-3",
      question: "Kalimat apa yang sering diucapkan Divya kepada Cowoknya?🍿", // [GANTI]
      options: [
        "Kamuu kok ganteng banget si sayang", // [GANTI]
        "Kamu masih sayang aku?", // [GANTI]
        "Kenyang banget aku sayang", // [GANTI]
        "I love u sayangg", // [GANTI]
      ],
      correctIndex: 1,
      explanation: "SAYANGG BANYAKK BANYAKKKK!", // [GANTI]
      wrongAnswerResponses: [
        "Makasii ya sayang, emang gue ganteng maxxx 😁", // [GANTI]
        "Kalimat ini muncul jikaa setelah makan", // [GANTI]
        "I love u moreee sayangg", // [GANTI]
      ],
    },
    {
      id: "q-4",
      question: "Kalau kamu lagi badmood / ngambek, pertolongan pertama paling ampuh apa? 🍦", // [GANTI]
      options: [
        "Dicium sebanyak banyaknya", // [GANTI]
        "Dipeluk erat-erat", // [GANTI]
        "Berkeliling jogja", // [GANTI]
        "Semua opsi di atas sekaligus!", // [GANTI]
      ],
      correctIndex: 3,
      explanation: "Hehe, mau peluk cium dong sayangg 🥳", // [GANTI]
      wrongAnswerResponses: [
        "Bolee si tapi mosoo cium doang?", // [GANTI]
        "Mau si dipeluk erat tapi plus cium juga dong", // [GANTI]
        "Strolling around jogja is the best, with u", // [GANTI]
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
