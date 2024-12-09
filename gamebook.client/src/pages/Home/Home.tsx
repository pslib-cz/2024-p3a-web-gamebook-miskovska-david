
import Button from "../../components/Button/ButtonDB";
import style from "./Home.module.css";

const Home: React.FC = () => {
    return(
        <div className={style.homeScreen}>
            <div className={style.container}>
                <Button btnText="Hrát" />
                <Button btnText="Síň slávy" />
            </div>
       </div>
    )
}

export default Home;
