import moment from 'moment';
import { useSelector } from 'react-redux';

//validate token for authenticate in different routes
export default function useAuth(){
    const { token } = useSelector(state => state.auth);
    const timeLoggedIn = localStorage.getItem('timeLoggedIn');
    const expiresIn = 3600
    var duration
    var seconds
    
    if(timeLoggedIn){
        duration = moment.duration(moment(new Date()).diff(timeLoggedIn));
        seconds = duration.asSeconds();
    }

    return (token && expiresIn) ? seconds > expiresIn ? false : true : false;
}