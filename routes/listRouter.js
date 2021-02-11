const router = require('express').Router();
const { List } = require('../db/models');

router.post('/', async (req, res) => {
  console.log(req.body);
  console.log('я тут');
  const { addList_form__title, goods } = req.body;
  const goodsArrayObj = goods.map(el => el = { title: el, isCompleted: false });
  console.log(addList_form__title, goodsArrayObj);
  try {
    const newList = new List({ title: addList_form__title, goods:goodsArrayObj, user: res.locals.user._id });
    console.log(newList);
    await newList.save();
    res.redirect('/')
  } catch (error) {
    res.sendStatus(500)
  }
});
// { addList_form__title: 'продукты', goods: [ 'молоко', 'хлеб' ] }
module.exports = router;