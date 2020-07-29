import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../actions/authActions'
export default function User() {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    return (
        <div className="user-profile">
            <div className="hero">
                <img src={user.profile_image[0].image} alt="user-profile"/>
                <h1>{user.name}</h1>
            </div>
           <div className="logout-btn">
               <button onClick={ ()=> dispatch(logout())}>Log Out</button>
           </div>
        </div>
    )
}
