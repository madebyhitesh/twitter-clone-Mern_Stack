import React, { useEffect } from 'react';
import './scss/App.css';
import {useSelector} from 'react-redux'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loginform from './components/Loginform'
import Registerform from './components/Registerform'
import {useDispatch} from 'react-redux'
import AddPost from './components/AddPost'
import Twitter from './components/Twitter'
import UserProfile from './components/UserProfile'
import NavBar from './components/Navbar'

import {loadUser} from "./actions/authActions"
import { getItems } from './actions/itemActions';
function App() {
  const dispatch = useDispatch();
  const dark = useSelector(state => state.dark)
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
    dispatch(loadUser());
    dispatch(getItems())
  },[])
  return (
    <div className={dark ? 'App dark-mode' : 'App'}>
      <Router>
      <Switch>
      {
        auth.isAuthenticated ? <Route path="/" exact component={Twitter} /> : <Route path="/" exact component={Loginform}/>
      }
      {
        auth.isAuthenticated ? <Route path="/addpost" exact component={AddPost} /> : <Route path="/addpost" exact component={Loginform} />
      }
      {
        auth.isAuthenticated ? <Route path="/profile" exact component={UserProfile}/> : <Route path="/profile" exact component={Loginform}/>
      }
      <Route path="/register" exact component={Registerform}/>
      </Switch>
      {auth.isAuthenticated ? <NavBar/> : ""}
      </Router>
    </div>
  );
}

export default App;
