const mongoose = require('mongoose')
const postSchema = mongoose.Schema({

title:{
    type: String, required: true 
},
  body:{
    type: String, required: true    
},
topic:{ 
    type: [String], 
    enum: ['Politics', 'Health', 'Sport', 'Tech'], 
    required: true 
  }, // Allows multiple topics
  owner:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
  },
  status:{
    type: String, enum: ['Live', 'Expired'], default: 'Live'
},
  expirationTime:{
    type: Date, required: true
},
  createdAt:{
    type: Date, default: Date.now
},
  likes:[{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
}], // Users who liked the post
  dislikes:[{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
}], // Users who disliked the post
  comments:[{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
}],

})

module.exports = mongoose.model('Post', postSchema)
