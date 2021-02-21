import React from 'react';
import {Link,withRouter } from 'react-router-dom';
import styled from "styled-components";

const NavigationBar = styled.div`
    width: 100%;
    height: 50px;
    background-color: black;
`

const NavUl = styled.ul`
    width: 100%;
    height: 100%;
    display:flex;
`

const NavLi = styled.li`
    width: 50%;
    height: 100%;
    border-bottom: 1px solid ${props => props.current ? "white" : "transparent"};
`

const Slink = styled(Link)`
    display:block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`



const Navigation = ({userObj, location})=>{
    const {pathname} = location;
    return(
        <NavigationBar>
            <NavUl>
                <NavLi current={pathname === "/"}><Slink to="/">Home</Slink></NavLi>
                <NavLi current={pathname === "/profile"}><Slink to="/profile">{userObj && userObj.displayName}'s Profile</Slink></NavLi>
            </NavUl>
        </NavigationBar>
    )
}


export default withRouter(Navigation);