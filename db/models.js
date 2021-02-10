const { connect, pluralize, Schema, model, connection } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  firstName: String,
  secondName: String,
  login: String,
  password: String,
});

const listSchema = new Schema({
  title: String,
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
