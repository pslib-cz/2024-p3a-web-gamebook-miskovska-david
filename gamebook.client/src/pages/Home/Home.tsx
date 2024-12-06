import Button from "../../components/Button/ButtonDB";
import style from "./Home.module.css";

const Home = () =>{
    return(
        <div className={style.homeScreen}>
            <div className={style.container}>
                <Button btnText="Hrát"></Button>
                <Button btnText="Síň slávy"></Button>
            </div>
       </div>
    )
}
export default Home;