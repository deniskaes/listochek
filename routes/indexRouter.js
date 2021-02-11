const router = require('express').Router();
const { User, List, Group } = require('../db/models');

router.get('/', async (req, res) => {
  if (req.session?.user) {
    const userData = await List.find({ user: res.locals.user._id }).populate('group').populate('guestList').populate('user');
    return res.render('index', { userData })
  }
  return res.render('login')
})

module.exports = router;