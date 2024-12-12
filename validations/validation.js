const Joi = require('joi')

// Validation for registration
const validationRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  return schema.validation(data)
}

// Validation for the user login
const validationLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
  return schema.validation(data)
}

// Validation for creating a post
const validationPost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    topic: Joi.string()
      .valid('Politics', 'Health', 'Sport', 'Tech')
      .required(),
    body: Joi.string().min(10).max(5000).required(),
    expirationTime: Joi.date().required(),
  })
  return schema.validation(data)
}

// Validation for to add a comment
const validationComment = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(1).max(500).required(),
  })
  return schema.validation(data)
}

//Validation for a post like or dislike
const validationReaction = (data) => {
  const schema = Joi.object({
    reaction: Joi.string().valid('like', 'dislike').required(),
  })
  return schema.validation(data)
}

module.exports = {
  validationRegistration,
  validationLogin,
  validationPost,
  validationComment,
  validationReaction,
}
