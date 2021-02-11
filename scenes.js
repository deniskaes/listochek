const { Scenes: { BaseScene, Stage } } = require('telegraf');
const { User } = require('./db/models');

// class SceneGenerator {
//   registerScene() {
//     const register = new BaseScene('register');
//     register.enter(async (ctx) => {
//       await ctx.reply('Давай привяжем ваш аккаунт к вашему телеграмм каналу. Укажи свой email на нашем сайте')
//     })
//     register.on('text', async (ctx) => {
//       const emailFromMessages = ctx.message.text;
//       try {
//         const user = await User.findOne({ email: emailFromMessages })
//         if (user) {
//           user.telegramID = ctx.message.chat.id
//           await user.save();
//           await ctx.reply('Вы успешно зарегистрированы.')
//         }
//       } catch {
//         await ctx.reply('Данного пользователя не существует.')
//       }
//       return register;
//     })
//   }
// }

module.exports = SceneGenerator;
