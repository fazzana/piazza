/*const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const validation = require('../validations/validation')

// Load environment variables
dotenv.config()

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: 'User already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ name, email, password: hashedPassword })
    const savedUser = await newUser.save()

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message })
  }
})

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid email or password' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' })

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message })
  }
})

// Token verification (Optional)
router.get('/verify', (req, res) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access Denied' })

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    res.status(200).json({ message: 'Token is valid', user: verified })
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' })
  }
})

module.exports = router
*/




const express = require('express')
const router = express.Router()
//const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res)=>{

    // Validation 1 to check user input
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists!
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }

    // I created a hashed represenation of my password!
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)

    // Code to insert data
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})

router.post('/login', async(req,res)=>{

    // Validation 1 to check user input
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists!
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    } 
    
    // Validation to check user password
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Password is wrong'})
    }
    
    // Generate an auth-token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})

})

module.exports=router