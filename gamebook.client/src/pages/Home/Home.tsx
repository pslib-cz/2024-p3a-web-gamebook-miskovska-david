import style from "./Home.module.css";
import React from "react";
import LinkButton from "../../components/Button/LinkButton";
const Home: React.FC = () => {
    


    return (
        <div className={style.homeScreen} >
            <div className={style.container}>
                <LinkButton to="/login">Přihlásit se</LinkButton>
                <LinkButton to="/register">Registrovat se</LinkButton>
            </div>
        </div>
    );
};

export default Home;
