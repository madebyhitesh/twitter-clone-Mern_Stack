const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required:true
    },
    caption: {
        type: String
      },
    imgPath: {
        type: String,
      },
    post_date: {
        type: Date,
        default: Date.now
      },
    comments :[
      {
        user_id:{
          type: String,
          required: true
        },
        user_name:{
          type:String,
          required: true
        },
        comment:{
          type:String,
          required:true
        },
        date:{
          type: Date,
          default: Date.now
        }

      }
    ]
});

module.exports = mongoose.model('Post',postSchema)