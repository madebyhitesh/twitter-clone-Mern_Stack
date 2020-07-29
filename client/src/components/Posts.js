import React from 'react'
import {useSelector} from 'react-redux'
import SinglePost from './SinglePost'
import User from './User'
export default function Posts() {
    const items = useSelector(state => state.item.items)
    return (
        <div className="all-posts-container">
            {items.map(item =>(
                <SinglePost key={item._id}
                            userId = {item.user_id}
                            postId = {item._id}
                            username={item.user_name}
                            title={item.caption}
                            titleHero ={item.imgPath}
                            comment = {item.comments}
                ></SinglePost>
            ))}
          
         {window.innerWidth >600 ? <User></User> : ""}
        </div>
    )
}
