const TelegramApi = require("node-telegram-bot-api");
const { godMorning } = require("./GoodMorning");

const token = "5365734624:AAG8LXcQSjK4Tlh2DXYUNh7HwDWj-bvGdEo";
const bot = new TelegramApi(token, { polling: true });

const today = new Date();
const moscowUTC = 3;
const hoursNow = (today.getUTCHours() + 3).toString();
const minutsNow = today.getUTCMinutes().toString();
let sendMessageToday = false;
let chatID;
const timeNow =
  minutsNow.length === 1
    ? hoursNow + ":" + 0 + minutsNow
    : hoursNow + ":" + minutsNow;

const getGodMorningMessages = () => {
  let randomMessagesId = Math.floor(
    Math.random() * (godMorning.length - 0) + 0
  );

  return godMorning[randomMessagesId];
};

bot.on("channel_post", (msg) => {
  if (msg.text === "/Бот, работать") {
    chatID = msg.sender_chat.id;
    bot.sendMessage(chatID, `Бот GoodMorning успешно(?) запущен. [Mussybot]`);
  }
  if (msg.text === "/Бот, отдыхать") chatID = 0;
  console.log(msg);
});

bot.on("message", (msg) => {
  if (msg.text === "/доброе утро")
    bot.sendMessage(-1001765763490, `${getGodMorningMessages()} , [Mussybot]`);
  console.log(msg);
});

setInterval(() => {
  bot.sendMessage(
    179758893,
    `
  hoursNow: ${hoursNow}
  hoursNow === "9": ${hoursNow === "9"}
  sendMessageToday%: ${sendMessageToday}
  `
  );
  if (hoursNow === "9" && !sendMessageToday) {
    bot.sendMessage(-1001765763490, `${getGodMorningMessages()} , [Mussybot]`);

    sendMessageToday = true;
  }
}, 10000);

setInterval(() => {
  if (timeNow === "12:00") {
    console.log("sendMessageToday set false");
    sendMessageToday = false;
  }
}, 30000);
