import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {login} from '../actions/authActions'
import {useDispatch,useSelector} from 'react-redux'
export default function Loginform() {
    const error= useSelector(state => state.error)
    const dispatch = useDispatch()
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e)=>{
        e.preventDefault()

        const user = {
            name,
            password
        }
        
        dispatch(login(user))
        setUsername("")
        setPassword("")
    }
    return (
        <div className="user-form">
            <div className="form-container">
                <nav>
                    <div className="twitter-icon primary-text">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </div>
                    <h1 className="primary-text">Twitter</h1>
                </nav>
                <form className="login-form" onSubmit={handleLogin}> 
                    {error.id === "Login_Fail" ?<h5>{error.msg.msg}</h5>
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
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                     name="password"
                     value = {password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    required/>   
                    <h1>Forget <span className="primary-text" required>password?</span></h1>
                    </div>
                    <button type="submit" className="form-btn">LogIn</button>
                </form>
                <div className="footer">
                    <p>Don't have an account</p>
                    <Link to="/register"><h1 className="primary-text">Register</h1></Link>
                </div>
            </div>
        </div>
    )
}
