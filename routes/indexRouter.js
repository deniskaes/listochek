const router = require('express').Router();
const { User, List, Group } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session?.user) {
    const userData = await User.findById(res.locals.user._id);
    let userList = await List.find({ user: res.locals.user._id });
    const allLists = await List.find({ guestList: res.locals.user._id });
    userList = userList.concat(allLists);
    console.log('array list',userList);
    return res.render('index', { userData, userList });
  }
  return res.render('login')
})

module.exports = router;
