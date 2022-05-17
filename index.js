const moment = require("moment");
const TelegramApi = require("node-telegram-bot-api");
const { godMorning } = require("./GoodMorning");

const token = "5365734624:AAFgXN_sOEIdNYGFWT7rbG-Lbx3S_qDgNV8";

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
  console.log(`hoursNow: ${hoursNow}`);
  console.log(`sendMessageToday: ${sendMessageToday}`);
  console.log(`getUTCHours: ${today.getUTCHours()}`);
  console.log(`moment().format("H"): ${moment().format("H")}`);
  console.log(`moment().utc().format("H"): ${moment().utc().format("H")}`);

  if (moment().utc().format("H") === "6" && !sendMessageToday) {
    sendLog()(`Good morning messages send`);
    bot.sendMessage(
      -1001765763490,
      `${getGodMorningMessages()}
    Если вы видете это сообщение в 9:00 по МСК, значит моя задумка сработала и бот отправил все что нужно тогда, когда это было нужно.
    
    Не смотря, на то, что бот вроде как работает, его работу придется прекратить в том виде в котором я задумывал его изначально.
    Я сам сомневался в этой идеии, а так же по крайней мере два человека, которым я доверяю выразили сомнения по поводу данных сообщений в канале.
    
    Тема ботов мне понравилась, по этому сейчас решил взяться за бота, который соберет какую-то статистику по моим постам и тд. Пока нет четкого понимания, что из этого выйдет.
    И выйдет ли что-то.
    
    Всем пока.
    Сообщение отправлено автоматически.
    `
    );

    sendMessageToday = true;
  }
}, 10000);

setInterval(() => {
  if (moment().utc().format("H") === "9") {
    sendLog()(`sendMessageToday set false`);
    sendMessageToday = false;
  }
}, 30000);
