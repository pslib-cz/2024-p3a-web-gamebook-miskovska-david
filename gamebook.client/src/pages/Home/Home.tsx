import Button from "../../components/Button/ButtonDB";
import style from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Home: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className={style.homeScreen}>
            <div className={style.container}>
                <Link to="/login"><Button btnText="Přihlásit se" /></Link>
                <Link to="/register"><Button btnText="Registrovat se" /></Link>
                <Button btnText="Hrát" onClick={() => navigate('/rooms/1')} />
                <Button btnText="Síň slávy" />
            </div>
        </div>
    );
};

export default Home;
