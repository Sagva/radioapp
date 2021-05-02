import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styles from '../styles/Login.module.css'


const Login = () => {
    const history = useHistory()
    const { setIsLoggedIn, login, setActiveUser } = useContext(UserContext);

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
        
        if (result.success) {
            console.log(`inside login in frontend, result.loggedInUser`, result.loggedInUser);
            setIsLoggedIn(true)
            setActiveUser(result.loggedInUser)
            history.push("/");
        }
    }
  
  return (
    <div className={`${styles.loginWrapper} py-2`}>
        <div className='container'>
            <h1 className='my-4 text-center'>Inloggning</h1>
            <div className={styles.loginBlock}>
                <form onSubmit={(e) => handleSubmit(e)} className='pb-1'>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input placeholder='email' type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => handleEmailChange(e)}/>
                        
                    </div>
                    <div className="mb-4">
                        <label for="password" className="form-label">Password</label>
                        <input placeholder='password' type="password" className="form-control" id="password" onChange={(e) => handlePasswordChange(e)}/>
                    </div>
                    
                    <div className='text-center'><button type="submit" className='btnBrand'>Logga in</button></div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
