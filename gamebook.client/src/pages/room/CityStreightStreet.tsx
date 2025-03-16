import style from "@/CityStreightStreet.module.css";
import { RoomType } from "../../types";
import arrowStraight from "../../assets/arrows/arrow-straight.png";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";



const CityStreightStreet: React.FC= () => {
    

    const {data: rooms} = useFetch<RoomType>("api/Room/rooms/16");

    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <a href="/rooms/12"><img src={arrowStraight} className={style.arrow__straight1} alt="straight" /></a>
            <Link to="/city-cross"><img src={arrowStraight} className={style.arrow__straight2} alt="straight" /></Link>
            
        </div>
    );

}
export default CityStreightStreet;