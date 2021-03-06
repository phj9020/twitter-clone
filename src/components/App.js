import React, { useEffect, useState } from "react";
import MainRouter from "components/Router";
import { authService } from "fbase";
import PropTypes from 'prop-types';
import GlobalStyle from 'components/GlobalStyle';

function App() {
  // 기본적으로 로그인 안된 상태
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //console.log(isLoggedIn); // null 인 이뉴는 firebase가 초기화되고 모든걸 로드할떄까지 기다려줄 시간이 없기때문

  //  onAuthStateChanged는 state의 변화를 듣고 있다 
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(true); 
        // setUserObj(user)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile : (args)=> user.updateProfile(args) 
        })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  },[])

  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile : (args)=> user.updateProfile(args) 
    });
  }

  return (
    <>
      <GlobalStyle />
      {init ? <MainRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : "Initializing..." }
    </>
  );
}

export default App;


App.propTypes = {
  init : PropTypes.bool,
  isLoggedIn : PropTypes.bool,
  userObj: PropTypes.object
} 