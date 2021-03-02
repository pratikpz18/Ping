const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  friendsList: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user'
    },
    // status: {
    //   type: Number,
    //   enums: [
    //       1,    //'requested',
    //       2,    //'pending',
    //       3,    //'friends'
    //   ]
    // }
    }]
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
