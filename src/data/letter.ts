// Konten untuk Section LoveLetter (Surat Cinta Digital).
// Tuliskan kata-kata hatimu di sini pada bagian bertanda [GANTI].

export interface LoveLetterConfig {
  badge: string;
  sealText: string;
  envelopeTitle: string;
  envelopeHint: string;
  letterTitle: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  senderSignature: string;
  postScript: string;
}

export const loveLetterData: LoveLetterConfig = {
  badge: "SURAT UNTUKMU 💌", // [GANTI]
  sealText: "Buka Surat 💖",
  envelopeTitle: "Sepucuk Surat Digital Buat Kamu", // [GANTI]
  envelopeHint: "Ketuk amplop atau stempel cinta untuk membaca isi surat 💌", // [GANTI]
  letterTitle: "Untuk Orang yang Paling Spesial di Dunia,", // [GANTI]
  greeting: "Halo Manisku,", // [GANTI]
  paragraphs: [
    "Selamat ulang tahun ya! Bertambah satu tahun lagi usia kamu hari ini. Jangan sedih atau takut tua ya, di mataku kamu bakal selalu jadi sosok yang paling menggemaskan dan bikin nyaman.", // [GANTI]
    "Terima kasih banyak sudah bertahan, berjuang, dan selalu menyinari hari-hariku dengan tawa khasmu. Di saat dunia luar lagi berisik dan bikin lelah, mendengar suaramu atau sekadar duduk di sebelahmu selalu jadi tempat istirahat terbaik buatku.", // [GANTI]
    "Di lembaran umur yang baru ini, aku berdoa semoga segala hal yang kamu semogakan satu per satu terwujud. Semoga kamu selalu dikelilingi orang-orang baik, diberi kesehatan yang prima, rezeki yang berkah, dan hati yang selalu lapang.", // [GANTI]
    "Dan semoga... aku masih terus diizinkan buat nemenin kamu di ulang tahun-ulang tahun berikutnya. Menemani kamu makan enak, jalan-jalan santai, sampai menua bersama.", // [GANTI]
  ],
  closing: "Dengan segenap rasa sayang, bangga, dan sedikit gombalan receh,", // [GANTI]
  senderSignature: "Dari Pengagum Nomor Satumu 💛", // [GANTI]
  postScript:
    "P.S. Hari ini kamu bebas minta apa aja (tapi jangan minta aku cuci piring ya, hehe canda!) 🧁✨", // [GANTI]
};

