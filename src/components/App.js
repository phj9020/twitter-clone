import React, { useEffect, useState } from "react";
import MainRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // 기본적으로 로그인 안된 상태
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //console.log(isLoggedIn); // null 인 이뉴는 firebase가 초기화되고 모든걸 로드할떄까지 기다려줄 시간이 없기때문
  
  // state의 변화를 듣고 있다 
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  },[])


  return (
    <>
      {init ? <MainRouter isLoggedIn={isLoggedIn}/> : "Initializing..." }
      <footer>&copy; CloneTwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
