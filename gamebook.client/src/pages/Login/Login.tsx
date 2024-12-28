import style from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/Button/ButtonLB";
import { useState } from "react";
type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password };
        fetch("/api/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    }
   
    return (
        
        <div className={style.login__screen}>
            
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form} onSubmit={handleSubmit}>
                    <Input inputType="email" placeholder="Uživatelské jméno/Email" onDataSend={setEmail}/>
                    <Input inputType="password" placeholder="Heslo" onDataSend={setPassword} />
                    <Button btnText="Přihlásit se" />
                </form>
                
            </div>
            
        </div>
    )
    
}

export default Login;

