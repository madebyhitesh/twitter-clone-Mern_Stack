import React from 'react'
import Navbar from './Navbar'
import Posts from './Posts'
export default function Twitter() {
    return (
        <div className="home-page">
            <nav>
                <div className="primary-text">
                <i className="fa fa-twitter" aria-hidden="true"></i>
                </div>
                <h1 className="primary-text">Twitter</h1>
            </nav>
            <Posts></Posts>
            {/* <Navbar></Navbar> */}
        </div>
    )
}
