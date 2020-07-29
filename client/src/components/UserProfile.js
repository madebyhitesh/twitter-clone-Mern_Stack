import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {logout} from '../actions/authActions'
import SinglePost from "./SinglePost"
export default function UserProfile() {
    const [posts,setPosts] = useState([])
    const [image,setImage] = useState("")
    const user = useSelector(state => state.auth.user)
    const items = useSelector(state => state.item.items)
    console.log(image)
    const dispatch = useDispatch()
    useEffect(()=>{
        setPosts(items.filter(item => item.user_id === user._id))
    },[])

    const handleUpload = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("profile",image)

        const token = localStorage.getItem('token')
          //Headers
       const config = {
        headers: {
            "Content-Type" : "application/json"
        }
        }
    //If token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
         axios.post(`/posts/profile`,formData,config)
         .then(res => console.log(res.data)) 
         .catch(err => console.log(err))
    }
    return (
        <div className="profile-page">
            <nav>
                <div className="primary-text">
                <i className="fa fa-twitter" aria-hidden="true"></i>
                </div>
                <h1 className="primary-text">Twitter</h1>
            </nav>
            <header>
                <div className="hero">
                    <img src={user.profile_image[0].image} alt="current-user-profile"/>
                </div>
                <h1>{user.name}</h1>
                <div className="call-to-action">
                    <form onSubmit = {handleUpload}>
                    <input type="file" name="profile" id="profile" accept="image/*"
                    onChange= {(e)=> {
                        setImage(e.target.files[0])
                    }}/>
                    <label htmlFor="profile">Upload <i className="fa fa-file-image-o" aria-hidden="true"></i></label>
                        {image !== "" ? <button type="submit">Confirm to Upload</button> : ""}
                    </form>
                    <button onClick={ ()=> dispatch(logout())}>LogOut <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </header>
            <main>
                { posts.length !== 0 ? posts.map(item => <SinglePost key={item._id}
                            userId = {item.user_id}
                            postId = {item._id}
                            username={item.user_name}
                            title={item.caption}
                            titleHero ={item.imgPath}
                            comment = {item.comments}
                ></SinglePost>) : <h1>Wow ! Such empty</h1>}
            </main>
        </div>
    )
}
