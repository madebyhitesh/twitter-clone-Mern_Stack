const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
      },
    profile_image: {
      type : Array,
      default: [{image:"https://res.cloudinary.com/webdev310799/image/upload/v1594204462/beard_treqvr.png"}]
    },
    email: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('User',userSchema)