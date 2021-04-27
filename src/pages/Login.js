import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


const Login = () => {
    const history = useHistory()
    const { setIsLoggedIn, login } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let inputedData = {
            email,
            password
        };
        let result = await login(inputedData);
        console.log('Inside login func in frontend Login component', inputedData);
        console.log(result);
        if (result.success) {
            setIsLoggedIn(true)
            history.push("/");
        }
    }
  
  return (
    <div >
        <div >
            <h3>Login here with your data</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" id="email" placeholder='email' onChange={(e) => handleEmailChange(e)}/>
                <input type="text" id="password" placeholder='password'onChange={(e) => handlePasswordChange(e)}/>
                <button type='submit' name='login' >Logga in</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
