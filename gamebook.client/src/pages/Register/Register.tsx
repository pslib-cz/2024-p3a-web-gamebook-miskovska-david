import style from "./Register.module.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/ButtonLB";
import Input from "../../components/input/Input";

type RegisterProps = {
    title: string;
}

const Register: React.FC<RegisterProps> = ({title}) => {
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
                <Link to="/login"><Button btnText="Registrovat se" /></Link>
                <p className={style.text}>Už máte účet? <Link to="/login">Přihlásit se</Link></p>
            </div>
        </div>
    )
}

export default Register;
