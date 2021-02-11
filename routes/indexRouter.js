const router = require('express').Router();

router.get('/', async (req, res) => {
  if (req.session?.user) {
   return res.render('index')
  }
  return res.render('login')
})

module.exports = router;