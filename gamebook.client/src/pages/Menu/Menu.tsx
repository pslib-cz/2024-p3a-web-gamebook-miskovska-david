import LinkButton from "../../components/Button/LinkButton";
import style from "./Menu.module.css";


const Menu: React.FC = () => {
    return (
        <div className={style.homeScreen}>
            <div className={style.container}>
                <LinkButton to="/text/1">Hrát</LinkButton>
            </div>
        </div>
    );
    }


export default Menu;