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
  musicNote?: string; // Catatan lagu pengiring surat ini — opsional, hapus jika tidak dipakai
}

export const loveLetterData: LoveLetterConfig = {
  badge: "SURAT UNTUKMU 💌", // [GANTI]
  sealText: "Buka Surat 💖", // [GANTI]
  envelopeTitle: "Sepucuk Surat Tanah *eh, Surat Amplop Buat Kamu", // [GANTI]
  envelopeHint: "Ketuk amplop atau stempel cinta untuk membaca isi surat 💌", // [GANTI]
  letterTitle: "Untuk Orang yang Paling Spesial di Dunia,", // [GANTI]
  greeting: "Halo Sayanggg,", // [GANTI]
  paragraphs: [
    "Selamat ulang tahun ya! Bertambah satu tahun lagi usia kamu hari ini, dan percayalah, satu tahun itu bukan pengurangan, tapi penambahan. Penambahan cerita, penambahan rezeki, penambahan alasan agar aku makin kagum sama kamu. Di mataku kamu bakal selalu jadi sosok yang paling menggemaskan, hangat, dan bikin nyaman.", // [GANTI]
    "Terima kasih sudah menjadi kamu. Terima kasih sudah bertahan di hari-hari yang berat, sudah berjuang di saat lelah pun ikut mendera, dan masih sempat-sempatnya menyinari hari-hariku dengan tawa khasmu itu. Di saat dunia luar lagi berisik dan bikin lelah, mendengar suaramu atau sekadar duduk di sebelahmu sudah cukup jadi obat paling mujarab. Kamu itu ajaib, sungguh.", // [GANTI]
    "Di lembaran umur yang baru ini, aku berdoa dengan sepenuh hati, semoga segala yang kamu semogakan satu per satu terwujud. Semoga kamu selalu dikelilingi orang-orang baik yang mencintaimu dengan tulus. Semoga kesehatan selalu menemanimu, rezeki terus mengalir tanpa henti, dan hatimu selalu lapang menghadapi apapun yang datang.", // [GANTI]
    "Dan lebih dari segalanya, semoga aku masih terus diizinkan untuk menemanimu. Menemani kamu makan enak di tempat-tempat yang belum pernah kita coba, jalan-jalan tanpa tujuan, mendengarkan semua cerita cerita randommu, dan perlahan-lahan, menua bersama. Itu bukan sekadar harapan. Itu doaku setiap malam.", // [GANTI]
    "Oh iya, satu hal lagi yang perlu kamu tahu, aku bangga sama kamu sayang. Bukan cuma hari ini, tapi setiap hari. Bangga sama cara kamu menghadapi hal-hal sulit, bangga sama semua kebaikan kecil yang kamu lakukan tanpa sadar, dan bangga bisa bilang ke dunia bahwa aku kenal kamu. Semoga hari ulang tahunmu penuh senyum, penuh tawa, dan penuh kenangan yang bisa kita ceritakan satu saat nanti. Selamat ulang tahun, sayangku, Divya! 🎉", // [GANTI]
  ],
  closing: "Dengan segenap rasa sayang dan bangga,", // [GANTI]
  senderSignature: "Daffa Maulana Putra ur BF <3", // [GANTI]
  postScript:
    "P.S. I love u banyak banyakk sayanggg, maaf kalau masih banyak salah yaa hehe 🧁✨", // [GANTI]
  musicNote:
    "Dinyanyikan sambil dengerin lagu 'penjaga hati by Nadhif Basalamah' di keheningan malam 🎵", // [GANTI] nama lagu yang mengiringi saat baca surat ini
};
