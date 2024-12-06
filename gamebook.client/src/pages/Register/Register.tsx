import style from "./Register.module.css";
import React from "react";
import Button from "../../components/Button/ButtonLB";
import Input from "../../components/input/Input";

type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({title}) =>{
    return (
        <div className={style.register__screen}>
            <div className={style.register__container}>
                <h2>{title}</h2>
                <form className={style.register__form}>
                    <Input placeholder="Uživatelské jméno"></Input>
                    <Input placeholder="Email"></Input>
                    <Input placeholder="Heslo"></Input>
                    <Input placeholder="Zopakovat heslo"></Input>
                </form>
                  <Button btnText="Registrovat se"></Button>
                  <p className={style.text}>Už máte účet? Přihlásit se</p>
            </div>
        </div>
    )
}
export default Login;


