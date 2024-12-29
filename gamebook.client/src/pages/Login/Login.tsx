import style from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/Button/ButtonLB";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [incorectLogin, setIncorectLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    /*
    Funkce pro odeslání formuláře
    Pokud POST vrátí 200 přesměruje na /menu
    Pokud POST vrátí 404 vyhodí chybovou hlášku
  */
    const handleSubmit  = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password };
        const response = await fetch("/api/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if(response.ok){
            navigate("/menu");
        }else{
            setIncorectLogin(true);
        }
    

    }
   
    return (
        
        <div className={style.login__screen}>
            
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form} onSubmit={handleSubmit}>
                    <Input inputType="email" placeholder="Uživatelské jméno/Email" onDataSend={setEmail}/>
                    <Input inputType="password" placeholder="Heslo" onDataSend={setPassword} />
                    {incorectLogin && <p>Nesprávné uživatelské jméno nebo heslo</p>}
                    <Button btnText="Přihlásit se" />
                </form>
                
            </div>
            
        </div>
    )
    
}

export default Login;

