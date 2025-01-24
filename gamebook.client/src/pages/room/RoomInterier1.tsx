import style from "./RoomInterier1.module.css";
import useFetch from "../../hooks/useFetch";
import { RoomType } from "../../types";
import arrowStraight from "../../assets/arrows/arrow-straight.png";
import { Link } from "react-router-dom";

const RoomInterier1: React.FC= () => {
    
    const {data: rooms} = useFetch<RoomType>("api/Room/rooms/14");

    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}>
             <Link to="/city-cross"><img src={arrowStraight} className={style.arrow__straight} alt="straight" /> </Link>
        </div>
    );

}
export default RoomInterier1;