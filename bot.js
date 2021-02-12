const { Telegraf, session, Markup, Extra, Scenes: { BaseScene, Stage } } = require('telegraf');
const mongoose = require('mongoose');
const { User } = require('./db/models');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const loginScene = new BaseScene('login');
loginScene.enter(ctx => ctx.reply('Давай привяжем ваш аккаунт к вашему телеграмм каналу. Укажи свой email на нашем сайте'));
loginScene.on('text', async (ctx) => {
  const emailFromMessages = ctx.message.text.toLowerCase();
  try {
    const user = await User.findOne({ email: emailFromMessages });
    if (user) {
      ctx.session.email = emailFromMessages;
      await ctx.reply('Все супер! Введите пароль.');
      ctx.scene.enter('password')
    } else {
      await ctx.reply('Пользователь не найден.');
      ctx.scene.reenter();
    }
  } catch (error) {
    await ctx.reply('Проблемы с подключением.')
  }

})

const passwordScene = new BaseScene('password');
passwordScene.on('text', async (ctx) => {
  const user = await User.findOne({ email: ctx.session.email });
  const passwordFromMessages = ctx.message.text;
  if (await bcrypt.compare(passwordFromMessages, user.password)) {
    user.telegramID = Number(ctx.message.chat.id);
    await user.save();
    await ctx.reply('Ваши аккаунты успешно связаны.');
    ctx.scene.leave();
  } else {
    await ctx.reply('Неправильный пароль.');
  }
})

const stage = new Stage([loginScene, passwordScene]);

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.use(((ctx, next) => {
  ctx.session.lastContext = ctx;
  next()
}))
bot.use(Telegraf.log());
bot.start(async (ctx) => {
  const { id, first_name, last_name, username } = ctx.message.from;
  ctx.reply(`Приветствую, ${ctx.message.from.first_name}! Чтобы войти в аккаунт, нажми /login`);
});
bot.command('/login', async (ctx) => {
  ctx.scene.enter('login')
})
bot.on('message', async (ctx) => {
  console.log("Айди чата", ctx.message.chat.id, "Текст сообщения", ctx.message.text);
})

bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;
