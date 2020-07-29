import React from 'react'
import {Link} from 'react-router-dom'
import {changeTheme} from '../actions/darkAction'
import {useDispatch} from 'react-redux'
export default function Navbar() {
  const dispatch = useDispatch();

  // getting the width of the window
  const width = window.innerWidth;
// Setup isScrolling variable
  var isScrolling;
  if(width<500){
    document.addEventListener('scroll', function ( event ) {
    
        const nav = document.querySelector('aside')
                document.addEventListener("scroll",()=>{
                        nav.style.opacity = 0;
                })
      // Clear our timeout throughout the scroll
      window.clearTimeout( isScrolling );
    
      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(function() {
    
        // Run the callback
            nav.style.opacity = 1;
    
      }, 66);
    
    }, false);
  }

    return (
        <div>
        <aside>
        <div className="nav-icon-container">
          <Link to="/">
        <div className="nav-icon" id="home">
          <i className="fa fa-home" aria-hidden="true"></i>
          <span>Home</span>
        </div>
        </Link>
        <Link to="/addpost">
        <div className="nav-icon active" id="add-post-btn">
          <i className="fa fa-plus-square" aria-hidden="true"></i>
          <span>New</span>
        </div>
        </Link>
        <div onClick={()=>dispatch(changeTheme())} className="nav-icon" id="dark-mode">
          <i className="fa fa-sun-o" aria-hidden="true"></i>
          <span>Dark</span>
        </div>
        <Link to="/profile">
        <div className="nav-icon" id="profile-btn">
          <i className="fa fa-user" aria-hidden="true"></i>
          <span>User</span>
        </div>
        </Link>
      </div>
      </aside>
      </div>
    )
}
