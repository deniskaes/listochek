const { connect, pluralize, Schema, model, connection } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  firstName: String,
  secondName: String,
  email: { type: String, unique: true },
  password: String,
  telegramID: String,
});

const listSchema = new Schema({
  title: String,
  goods: [{
    title: String,
    isCompleted: Boolean,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guestList: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  }
});

const groupSchema = new Schema({
  name: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'list'
  }]
})



module.exports = {
  connect,
  connection,
  User: model('user', userSchema),
  List: model('list', listSchema),
  Group: model('group', groupSchema)
};
