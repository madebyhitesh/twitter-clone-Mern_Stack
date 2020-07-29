import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../actions/authActions'
export default function Registerform() {
    const error= useSelector(state => state.error)
    const dispatch = useDispatch()
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleRegistration = (e)=>{
        e.preventDefault();
        const user = {
            name,
            email,
            password
        }
        console.log(user)
        dispatch(register(user))
    }

    return (
        <div>
            <div className="user-form">
            <div className="form-container">
                <nav>
                    <div className="twitter-icon primary-text">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </div>
                    <h1 className="primary-text">Twitter</h1>
                </nav>
                <form className="login-form" onSubmit={handleRegistration}>
                {error.id === "Register_Fail" ?<h5>{error.msg.msg}</h5>
                    : "" }
                   <div className="feild">
                    <label htmlFor="username">Username:</label>
                    <input type="text" 
                    name="name"
                    value = {name}
                    onChange={(e)=>setUsername(e.target.value)} 
                    required/>   
                    </div> 
                   <div className="feild">
                    <label htmlFor="email">Email:</label>
                    <input type="email" 
                    name="email" 
                    value = {email}
                    onChange={(e)=>setEmail(e.target.value)} 
                    required/>   
                    </div> 
                   <div className="feild">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    name="password" 
                    value = {password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    required/>   
                    </div>
                    <button type="submit" className="form-btn">Register</button>
                </form>
                <div className="footer">
                    <p>Already have an account</p>
                    <Link to="/"><h1 className="primary-text">Login</h1></Link>
                </div>
            </div>
        </div>
        </div>
    )
}
