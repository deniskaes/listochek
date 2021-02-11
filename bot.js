const { Telegraf, session, Markup, Scenes: { BaseScene, Stage } } = require('telegraf');
const mongoose = require('mongoose');
const { User } = require('./db/models');
const fetch = require('node-fetch');
// const { inline_keyboard, likes } = require('./keyboard');
// const apis = require('./apis');

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

const stage = new Stage();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.use(((ctx, next) => {
  ctx.session.lastContext = ctx;
  next()
}))
bot.use(Telegraf.log());
bot.telegram.sendMessage(process.env.CHAT_ID, 'Что бы начать нажми /start');

bot.start(async (ctx) => {
  const { id, first_name, last_name, username } = ctx.message.from;
  // let user = await User.findOne({ id });
  // if (user === null) {
  //   user = new User({ id, first_name, last_name, username });
  //   await user.save();
  // }
  // ctx.session.user = user;
  ctx.reply(`Приветству, ${ctx.message.from.first_name}!`);
  // Что желаешь сделать? Выбирай!`, inline_keyboard);
});


// bot.action('fox', async (ctx) => {
//   ctx.session.url = apis[3] + String(Math.floor(Math.random() * 122));;
//   await ctx.replyWithPhoto(ctx.session.url);
//   ctx.reply('likes', likes);
// });

// bot.action('nasa', async (ctx) => {
//   const req = await fetch(apis[1]);
//   const res = await req.json();
//   ctx.session.url = res.url;
//   ctx.replyWithPhoto(res.url);
//   ctx.reply('likes', likes);
// });

// bot.action('like', async (ctx) => {
//   const user = await User.findOne({ id: ctx.session.user.id })
//   if (user.links && user.links.length !== 0 && !user.links.includes(ctx.session.url)) {
//     user.links.push(ctx.session.url);
//     await user.save();
//   } else {
//     user.links.push(ctx.session.url);
//     await user.save();
//   }
//   ctx.session.user = user;
//   ctx.reply('картинка добавлена в коллекию', inline_keyboard)
// })

// bot.action('dislike', async (ctx) => {
//   ctx.reply('да найдется достойная', inline_keyboard)
// })

// bot.action('lovedPic', (ctx) => {
//   if (ctx.session?.user?.links?.length !== 0) {
//     let number = Math.round(Math.random() * ctx.session.user.links.length - 1)
//     console.log(number);
//     ctx.replyWithPhoto(ctx.session.user.links[number], inline_keyboard);
//   } else {
//     ctx.reply('коллекцтя еще пустая', inline_keyboard)
//   }
// })

bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
