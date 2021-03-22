const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio:{
    type:String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  friendsList: [{
    // friendId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user'
    // },
  }]
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
