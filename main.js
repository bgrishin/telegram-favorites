import { Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("message", (x) => {
  const { message } = x.update;
  if (
    message.text === "В избранное!" ||
    message.text === "в избранное!" ||
    message.text === "в избранное"
  ) {
    if (!message.reply_to_message) return;
    bot.telegram.sendMessage(
      process.env.TARGET_CHANNEL_ID,
      `<a href="https://t.me/${x.update.message.chat.username}/${message.reply_to_message.message_id}">Перейти к сообщению ⬇️</a>`,
      { parse_mode: "HTML", disable_web_page_preview: true }
    );
    x.telegram.forwardMessage(
      process.env.TARGET_CHANNEL_ID,
      x.update.message.chat.id,
      message.reply_to_message.message_id
    );
  }
});

bot.launch().then(() => console.log("Bot started"));
