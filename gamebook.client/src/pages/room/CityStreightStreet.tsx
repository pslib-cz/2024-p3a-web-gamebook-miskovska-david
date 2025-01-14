import style from "./CityStreightStreet.module.css";
import React, { useEffect, useState } from "react";
import { RoomType } from "../../types";
import arrowStraight from "../../assets/arrows/arrow-straight.png";
import { Link } from "react-router-dom";



const CityStreightStreet: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch("/api/Room/rooms/16"); 
            if(!response.ok){
                throw new Error("Nepodařilo se načíst místnosti")
            }
            const data = await response.json();
            setRooms(data)
            }
            catch(error){
                if(error instanceof Error){
                    setError(error)
                }else{
                    setError(new Error("Něco se pokazilo"))
                }
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    }, []);
   console.log(error);
   console.log(loading);

    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <img src={arrowStraight} className={style.arrow__straight1} alt="straight" />
            <Link to="/city-cross"><img src={arrowStraight} className={style.arrow__straight2} alt="straight" /></Link>
            
        </div>
    );

}
export default CityStreightStreet;