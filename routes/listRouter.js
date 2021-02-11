const router = require('express').Router();
const { List } = require('../db/models');

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
})
module.exports = router;
