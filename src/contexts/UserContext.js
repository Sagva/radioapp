import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    whoAmI()
  }, []);

  const whoAmI = async () => {
    let who = await fetch("/api/v1/users/whoami");
    who = await who.json();
    console.log('inside whoami', who);
    
  };


  const login = async (userData) => {
    let result = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    result = await result.json();
    
    return result;
  };

  const logout = async () => {
    let result = await fetch("/api/v1/users/logout");
    result = await result.json();
    console.log('inside logout function', result);
    return result;
    
  };
  
  const register = async (userData) => {
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    result = await result.json();
    console.log('inside register function', userData);
    console.log('inside register function', result);
    return result;
  };

  
 

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    register
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
