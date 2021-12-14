import React, { useEffect } from 'react';
import { Container } from "@mui/material";
import { Router, navigate, Redirect } from "@reach/router"
//components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BarMenu from './components/BarMenu';
import HistorialTracks from './components/HistorialTracks';
//redux
import { fetchAllUsers, setName } from './store/slices/users'
import { loginSpotify } from './store/slices/auth'
import { setCode } from './store/slices/auth'
import { useDispatch } from 'react-redux'
// hook
import useAuth from "./hooks/useAuth"

//validate private route
const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuth = useAuth();
    if(isAuth){
      return <Component {...rest} />
    } else {
      return <Redirect to="/" noThrow/>
    }
}

const PublicRoute = ({ component: Component, ...rest }) => {
    return <Component {...rest} />
}

const App = () => {
  const dispatch = useDispatch()
  const isAuth = useAuth();
  const code = new URLSearchParams(window.location.search).get('code');
  
  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(setName('test'))
  }, [])

  const handleSetCode = async (code) => {
    await dispatch(setCode(code))
  }

  const handleLogin = async () => {
    await dispatch(loginSpotify(code))
    navigate('/dashboard')
  }

  useEffect(() => {
    if (code) {
      handleSetCode(code)
      handleLogin()
    }
  }, [code])

  return (
    <Container>
      {isAuth && <BarMenu />}
      <Router>
        <PublicRoute path="/" component={Login}/>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/historial-tracks" component={HistorialTracks} />
      </Router>
    </Container>
  );
}
 
export default App;