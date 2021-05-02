import { createContext, useState, useEffect, useContext } from "react";


export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //activeUser sets either at first rendering or at Login page, or at Register page
  //format of activeUser is {id: 3, email: "www@com.com", userName: "www"}
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    whoAmI()
  }, []);

  const whoAmI = async () => {
    let who = await fetch("/api/v1/users/whoami");
    who = await who.json()
      .then(who => {
        if (!who) {
          return
        }
        setIsLoggedIn(true);
        setActiveUser(who)
      })
      .catch(err => console.log(err))
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

  const editUserName = async (userData) => { //required format {id: 1, userName: 'Elena'}
    let result = await fetch("/api/v1/users/updateuser", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    result = await result.json()
    .then(result => {
      whoAmI()
      console.log('inside editUserName function', result);
    })

    console.log('editUserName', userData);
    return result;
  };

  


  const values = {
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    register,
    setActiveUser,
    activeUser,
    whoAmI,
    editUserName
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
