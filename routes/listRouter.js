const router = require('express').Router();
const { List, User } = require('../db/models');
const bot = require('../bot');


router.post('/', async (req, res) => {
  const { addList_form__title, goods } = req.body;
  console.log(addList_form__title, goods);
  let goodsArrayObj;
  if (Array.isArray(goods)) {
    goodsArrayObj = goods.map(el => el = { title: el, isCompleted: false });
  } else {
    goodsArrayObj = [{ title: goods, isCompleted: false }]
  }
  console.log(addList_form__title, goodsArrayObj);
  try {
    const newList = new List({ title: addList_form__title, goods: goodsArrayObj, user: res.locals.user._id });
    console.log(newList);
    await newList.save();
    res.redirect('/')
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
});
// { addList_form__title: 'продукты', goods: [ 'молоко', 'хлеб' ] }

router.get('/:idList', async (req, res) => {
  const { idList } = req.params;
  try {
    const listDb = await List.findById(idList).populate('user').populate('guestList').populate('group');
    if (listDb) {
      res.status(200).send(listDb);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/update', async (req, res) => {
  const { _id } = req.body
  try {
    const listDb = await List.findById(_id).populate('guestList').populate('user');
    const updatedList = await List.findByIdAndUpdate(_id, { ...req.body });
    listDb.guestList.forEach(async (el)=>{
      const userDb = await User.findById(el);
      if (userDb && userDb.telegramID){
        bot.telegram.sendMessage(userDb.telegramID, `Обноивлся список ${updatedList.title}`);
      }
    });
    console.log(listDb.user);
    if (listDb.user.telegramID){
      console.log('adsasdads');
    bot.telegram.sendMessage(listDb.user.telegramID, `Обноивлся список ${updatedList.title}`);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  const { idList, idUser } = req.body;
  try {
    const listDb = await List.findByIdAndUpdate(idList, { guestList: idUser });
    const newList = await List.findById(idList).populate('user');

    if (Array.isArray(idUser)) {
      idUser.forEach(async (idUser) => {
        const userDb = await User.findById(idUser);
        if (userDb && userDb.telegramID) {
          const stringGoods = newList.goods.reduce((acc, {title}) =>  acc += '<i>' + title + '</i>\n' , '');
          console.log(newList.goods);
          bot.telegram.sendMessage(userDb.telegramID,
            `Вы добавлены в список ${newList.title}, созданный ${newList.user.firstName}, состоящий из:\n ${stringGoods}`, { parse_mode: "HTML" });
        }
      }
      )
    }

    res.status(200).json(newList);
  } catch (err) {
    res.sendStatus(500);
  }
})

module.exports = router;
