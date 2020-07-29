const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
require('dotenv/config')
const router = express.Router();

//User model
const User = require('../modal/User')
//login user
// Post /users/login
// Public

router.post('/login', async (req,res)=>{
    const {name,password} = req.body;

    //validation
    if(!name || !password)
    return res.status(404).json({msg:'Please enter all feilds'})

    try {
        const user = await User.findOne({name})
        if(!user) return res.status(404).json({msg:'User does not exist'})
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched) return res.status(404).json({msg:'Incorrect password'})
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
         return res.status(201).json({token,user
        });
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
    


})


//Register new user
// Post /users/register
// Public

router.post('/register', async (req,res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;

    //validation
    if(name === null|| email === null || password === null) 
    return res.status(404).json({msg:'Please enter all the feilds'})
    
    try {
        const user = await User.findOne({name}) 
        if(user !== null) 
        return res.status(404).json({msg:'User already exist'})
        const salt = await bcrypt.genSalt(10)
        if(salt === null)
        return res.status(500).json({msg:'something went wrong with hashing password'})

        const hash = await bcrypt.hash(password,salt)
        if(hash === null)
        return res.status(500).json({msg:'something went wrong with hashing password'})
        const newUser = new User({
            name:name,
            email:email,
            password: hash
        });

      const newEntry = await newUser.save()

      if(newEntry === null)
        return res.status(500).json({msg:'Cannot register the user right now'})

    const token = jwt.sign({id: newEntry._id},process.env.JWT_SECRET);
    res.status(201).json({token,
        user:{
            id: newEntry.id,
            name:newEntry.name,
            email:newEntry.email,
            password: newEntry.password,
        }    
    });

    } catch (error) {
        res.status(400).json({msg: error.message})
    }

})


//Get user
// Post /users
// Private
router.get('/user',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(user === null) return res.status(404).json({msg:'User not found'})

        res.json(user)
    } catch (error) {
        res.status(400).json({msg:error.message})        
    }
})

module.exports = router