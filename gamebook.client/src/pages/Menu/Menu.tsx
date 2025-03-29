import LinkButton from "../../components/button/LinkButton";
import style from "./Menu.module.css";


const Menu: React.FC = () => {
    return (
        <div className={style.homeScreen}>
            <div className={style.container}>
                <LinkButton to="/room-with-text/1">Hrát</LinkButton>
            </div>
        </div>
    );
    }


export default Menu;