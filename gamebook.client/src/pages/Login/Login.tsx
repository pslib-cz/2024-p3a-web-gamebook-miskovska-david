import style from "./Login.module.css";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/ButtonLB";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";

type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {

    const [rooms, setRooms] = useState<string>("")

    useEffect(() => {
        fetch('/api/Room/rooms')
            .then(response => response.json())
            .then(data => setRooms(data["result"][0]["background"]))
            .catch(error => console.error('Error fetching data:', error));
        
    }, []);

    
    
    

    return (
        <div className={style.login__screen} style={{ backgroundImage: `url(/${rooms})` } }  >
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form}>
                    <Input placeholder="Uživatelské jméno/Email"></Input>
                    <Input placeholder="Heslo"></Input>
                </form>
                <Link to="/"><Button btnText="Přihlásit se" /></Link>
            </div>
            
        </div>
    )
}

export default Login;
