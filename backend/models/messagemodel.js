const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    to:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },

    from:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },

    body: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// export model user with MessageSchema
module.exports = mongoose.model("message", MessageSchema);