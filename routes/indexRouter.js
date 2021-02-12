const router = require('express').Router();
const { User, List, Group } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session?.user) {
    const userData = await User.findById(res.locals.user._id);
    const userList = await List.find({ user: res.locals.user._id });
    return res.render('index', { userData, userList });
  }
  return res.render('login')
})

module.exports = router;
