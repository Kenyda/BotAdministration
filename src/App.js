import './App.css';
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";

function App() {
  const [authData, setAuthData] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setAuthData(localStorage.getItem('auth'));
    }
    setIsLoading(false);
  }, [])

  return (
      <AuthContext.Provider value={{
        authData,
        setAuthData,
        isLoading,
      }}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
