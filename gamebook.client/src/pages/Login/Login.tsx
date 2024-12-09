import style from "./Login.module.css";
import React from "react";
import Button from "../../components/Button/ButtonLB";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";

type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({title}) => {
    return (
        <div className={style.login__screen}>
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form}>
                    <Input placeholder="Uživatelské jméno/Email"></Input>
                    <Input placeholder="Heslo"></Input>
                </form>
                <Link to="/home"><Button btnText="Přihlásit se" /></Link>
            </div>
        </div>
    )
}

export default Login;
