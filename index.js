const TelegramApi = require("node-telegram-bot-api");
const { godMorning } = require("./GoodMorning");

const token = "5365734624:AAG8LXcQSjK4Tlh2DXYUNh7HwDWj-bvGdEo";
const bot = new TelegramApi(token, { polling: true });

const today = new Date();
const hoursNow = today.getUTCHours() + 3;
const myChatWithBot = 179758893;
let sendMessageToday = false;

const sendLog = (chatId = myChatWithBot) => {
  return (log) => {
    bot.sendMessage(chatId, `${log}`);
  };
};

const getGodMorningMessages = () => {
  let randomMessagesId = Math.floor(
    Math.random() * (godMorning.length - 0) + 0
  );
  return godMorning[randomMessagesId];
};

bot.on("message", function (message) {
  console.log(message);
});

bot.on("message", (msg) => {
  if (msg.text === "/доброе утро")
    bot.sendMessage(-1001765763490, `${getGodMorningMessages()} , [Mussybot]`);
  console.log(msg);
});

bot.on("new_chat_members", (user) => {
  console.log(user);
  bot.sendMessage(
    user.chat.id,
    `Добро пожаловать, @${user.new_chat_members[0].username}. Чувствуй себя как дома!`
  );
});

setInterval(() => {
  sendLog()(`hoursNow: ${hoursNow}`);
  sendLog()(`sendMessageToday: ${sendMessageToday}`);
  if (hoursNow === "9" && !sendMessageToday) {
    bot.sendMessage(-1001765763490, `${getGodMorningMessages()} , [Mussybot]`);
    sendMessageToday = true;
  }
}, 10000);

setInterval(() => {
  if (hoursNow === 12) {
    sendLog()(`sendMessageToday set false`);
    sendMessageToday = false;
  }
}, 30000);
