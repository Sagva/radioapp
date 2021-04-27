import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


const Register = () => {
    const history = useHistory()
    const [registerMessage, setRegisterMessage] = useState('')
    
    const { register, login, setIsLoggedIn } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    

    useEffect(() => {

    }, [registerMessage])

    const handleSubmit = async(e) => {
        e.preventDefault()

        let inputedData = {
            userName,
            email,
            password
        };

        console.log('Data inputed when registered', inputedData);
        let result = await register(inputedData);
        
        if(result.error) {
            console.log('inside error if', result.error);
           
            setRegisterMessage(result.error)
        } else if(result.success) {
            setRegisterMessage(`${result.success} Efter 5 sec you will be redirected to Home page`)
            inputedData = {
                email,
                password
            };
            setTimeout(async ()=> {

                result = await login(inputedData);
                
                if (result.success) {
                    setIsLoggedIn(true)
                    history.push("/");
                }
            }, 5000)
            
        }
    }

  
  return (
    <div >
        <div >
            <h3>Register here</h3>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input type="text" id="userName" placeholder='Your name' onChange={(e) => handleNameChange(e)}/>
                <input type="text" id="email" placeholder='email' onChange={(e) => handleEmailChange(e)}/>
                <input type="text" id="password" placeholder='password'onChange={(e) => handlePasswordChange(e)}/>
                <button type='submit'>Register</button>
            </form>
            <div style={{color: 'yellow'}}>{registerMessage}</div>
        </div>
    </div>
  );
};

export default Register;
