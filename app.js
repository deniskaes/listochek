require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');
const { connect, connection } = require('./db/models');

const indexRouter = require('./routes/indexRouter');
const groupRouter = require('./routes/groupRouter');
const userRouter = require('./routes/userRouter');
const listRouter = require('./routes/listRouter');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'))
app.use(logger('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sesionOptions = {
  secret: 'supperScret',
  key: 'sid',
  store: new MongoStore({ mongooseConnection: connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 30 * 10000 }
}

app.use(session(sesionOptions));

app.use((req, res, next) => {
  if (req.session?.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/list', listRouter);



app.listen(process.env.PORT, () => {
  console.log('server up');
  connect(process.env.DB_REMOTE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log('DB connected');
    })
});
