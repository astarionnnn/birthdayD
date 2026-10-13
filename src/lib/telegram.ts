// Helper pengiriman notifikasi ke bot Telegram saat kupon diklaim

export async function sendTelegramNotification(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      "[Telegram Notification Mock]",
      "Token atau Chat ID Telegram belum diset di .env.local. Notifikasi:",
      text
    );
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Gagal kirim Telegram:", err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error Telegram notification:", error);
    return false;
  }
}

