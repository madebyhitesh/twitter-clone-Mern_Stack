const express = require('express')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
require('dotenv/config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  }); 

//Post modal
const Post = require('../modal/Post')
const User = require('../modal/User');

// Get all post 
// Post /posts
// public
router.get('/', async (req,res)=>{
    try {
        const posts = await Post.find().sort({date :1})
        if(posts)
        res.status(200).json(posts)   
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

// Add post 
// Post /posts
// Private

router.post('/', auth , async (req,res)=>{
    
    const user = await User.findById(req.user.id).select('-password')
    if(!req.body && !req.files)
    return res.status(404).json({message:'Please enter all feilds'})
    try {
        if(req.files){
            const caption = req.body.caption;
            const file = req.files.image; 
            cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
                    const newPost = new Post({
                                user_id : user._id,
                                user_name : user.name,
                                caption : caption,
                                imgPath : result.url
                            })
                            fs.unlink(file.tempFilePath, (err) => {
                                if (err)
                                console.log('err',err) 
                                console.log('successfully deleted');
                              });
                        const newEntry = await newPost.save() 
                    if(newEntry)         
                    return res.status(200).json(newPost)        
                })
            }
           if(!req.files && req.body)
           {
            if(req.body.caption === "")
            return res.status(404).json({message:"enter something to post"})
            const newPost = new Post({
                user_id : user._id,
                user_name : user.name,
                caption : req.body.caption,
                imgPath : null
            })
            const newEntry = await newPost.save() 
            if(newEntry)         
            return res.status(200).json(newPost) 
              return res.status(200).json(newPost)
           }
    } 
    catch (error) {
        res.status(500).json({msg: error.message})
    }  
})
//  Get Profile Image
//  GET /posts/profile/
//  public
router.get('/profile/:id', async (req,res)=>{

    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).json({msg: "User does not exist"})
        
        return res.status(200).json({
            profileImage : user.profile_image[0].image
        })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

//  Add Profile Image
//  Post /posts/profile
//  private

router.post('/profile',auth, async (req,res)=>{
    
    try {
    const user = await User.findById(req.user.id).select('-password')
    if(user){
        if(req.files){
            const file = req.files.profile; 
            cloudinary.uploader.upload(file.tempFilePath,async (err,result)=>{
                    const newProfile = {
                            image: result.url
                        }
                        fs.unlink(file.tempFilePath, (err) => {
                                if (err)
                                console.log('err',err) 
                                console.log('successfully deleted');
                        });
    //add image to prfiles array
     user.profile_image.unshift(newProfile)


    //save it
     const newProfileimg = await user.save()
     if(newProfileimg)
     return res.status(200).json(user)

     return res.status(400).json({message: "Cannot add your profile image right now"})    
                })
            }

    }

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

})


//  Add Comment
//  Post /posts/comment/:id 
//  private

router.post('/comment/:id',auth, async (req,res)=>{
    
    try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id) 
    const newComment = {
        user_id: user.id,
        user_name: user.name,
        comment: req.body.comment
      }
      //add comment to comments array

     post.comments.unshift(newComment)

     //save it
     const newCommententry = await post.save()
     if(newCommententry)
      return res.status(200).json(post)

      return res.status(400).json({message: "Cannot add your comment right now"})
    }
    catch(error){
       return res.status(500).json({message:error.message})
    }

})

module.exports = router