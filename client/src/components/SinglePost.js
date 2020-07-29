import React,{useEffect,useState} from 'react'
import axios from 'axios'

export const getprofileImage = (id) =>{
  return axios.get(`/posts/profile/${id}`)
}

export default function SinglePost({userId,postId,username,title,titleHero,comment}) {
    const [profileImage,setProfileImage] = useState({})
    const [commentprofile,setCommmentProfile] = useState({})
    const [addComment,setAddComment] = useState('')
    function handleAddComment(e){
       e.preventDefault();
      const token = localStorage.getItem('token')
        //Headers
     const config = {
      headers: {
          "Content-Type" : "application/json"
      }
      }
      const body = {
        comment : addComment
      }

  //If token, add to headers
  if(token){
      config.headers['x-auth-token'] = token;
  }
       axios.post(`/posts/comment/${postId}`,body,config)
       .then(res => console.log(res.data)) 
       .catch(err => console.log(err))

       setInterval( ()=>{window.location.reload(false)},1000)
    }

    useEffect(()=>{
      getprofileImage(userId)
      .then(res => setProfileImage(res.data))
      .catch(err => console.log(err))
      //getting commenter profile image
      if(comment.length !== 0){
        getprofileImage(comment[0].user_id)
        .then(res => setCommmentProfile(res.data))
        .catch(err => console.log(err))
      }


    },[])
    return (
          <div className="container">
            <div className="header">
              <div className="user">
                <div className="hero">
                  <img
                    src={profileImage.profileImage}
                    alt="profile"
                  />
                </div>
                <div className="user-name">
                  <h1>{username}</h1>
                  <span>12/7/20</span>
                </div>
              </div>
              <div className="menu-dots">
                <i className="fa fa-ellipsis-h dots" aria-hidden="true"></i>
              </div>
            </div>
            <div className="title">
              <h1>
                {title}
              </h1>
            </div>
          {
            titleHero !== null ? <div className="title-hero">
            <img src={titleHero} alt="title-hero" />
          </div> 
          : ""
          }
            <div className="icons">
                <div className="icon heart">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                    <span>250</span>
                </div>
                <div className="icon">
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                  <span>{comment.length}</span>
                </div>
            </div>
            <div className="show-comment">
              {
                comment.length === 0 ? "" : <>
                <div className="comment">
                  <div className="hero">
                  <img
                    src={commentprofile.profileImage}
                    alt="profile"
                    />
                    <p><b>{comment[0].user_name}</b></p>
                </div>
                </div>
                <p>{comment[0].comment}</p>
                </>
              }
            </div>
            <div className="add-comment">
              <form onSubmit={handleAddComment}>
                <input type="text" 
                placeholder="add your comments....."
                name="comment"
                onChange={(e)=>setAddComment(e.target.value)} 
                value={addComment}/>
                <button type="submit" ><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
              </form>
            </div>
          </div>
    )
}
