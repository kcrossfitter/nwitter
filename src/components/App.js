import { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService } from '../fBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  // 왜 이걸 하는가? 이걸 하지 않으면 처음 실행이 될 때 isLoggedIn은 flase
  // 로 세팅이 되는데, 이후 authState가 변해도 check를 하지 않기 때문
  // 처음에 app이 bootup 될 때 listener를 setup
  // auth state가 변할 때 마다 실행이 됨
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
