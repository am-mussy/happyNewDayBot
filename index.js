const TelegramApi = require('node-telegram-bot-api')
const token = '5365734624:AAG8LXcQSjK4Tlh2DXYUNh7HwDWj-bvGdEo'
const bot = new TelegramApi(token, {polling: true})

const today = new Date();
const hoursNow = today.getUTCHours().toString()
const minutsNow = today.getUTCMinutes().toString()
const timeNow = `${today.getUTCHours() + 3}:${today.getUTCMinutes().toString().length > 1 ? today.getUTCMinutes()}`
console.log(timeNow)
bot.on('message', msg => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Доброе утро!')
})

