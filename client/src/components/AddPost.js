import React,{useState} from 'react'
import {addItem} from '../actions/itemActions'
import {useDispatch} from 'react-redux'

export default function AddPost() {
    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("image",image)
        formData.append("caption",title)
        dispatch(addItem(formData))

        setImage('')
        setTitle('')

    }

    return (
        <div className="user-form">
        <div className="form-container addpost-form"> 
            <nav>
                    <div className="twitter-icon primary-text">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </div>
                    <h1 className="primary-text">Twitter</h1>
                </nav>
            <form className="login-form" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* <Navbar></Navbar> */}
                <div className="feild">
                    <textarea cols="25" rows="5"
                            name="title"
                            placeholder="Title...." 
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            required/>
                </div>
                <div className="feild">
                <label htmlFor="image">Choose a file <i className="fa fa-file-image-o" aria-hidden="true"></i></label>
                    <input type="file" 
                    id="image"
                    placeholder="image" 
                    onChange={e => setImage(e.target.files[0])}
                    />
                </div>
                <button className="form-btn" type="submit">Add Post</button>
            </form>
        </div>
        </div>
    )
}
