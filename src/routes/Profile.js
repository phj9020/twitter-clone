import React from 'react';
import {useHistory} from 'react-router-dom';
import {authService} from "fbase";

const Profile = ()=>{
    const history = useHistory();
    const onLogOut = ()=>{
        authService.signOut();
        history.push("/")
    }

    
    return(
        <button onClick={onLogOut}>Log out</button>
    )
}

export default Profile;