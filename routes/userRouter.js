const router = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { firstName, secondName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, secondName, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    req.session.user = newUser
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDb = await User.findOne({ email });
  if (userDb && (await bcrypt.compare(password, userDb.password))) {
    req.session.user = userDb;
    return res.redirect('/');
  }
  return res.render('login');
});

module.exports = router;
