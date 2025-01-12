import style from "./CityCrossStreet.module.css";
import React, { useEffect, useState } from "react";
import { RoomType } from "../../types";
import arrowStraight from "../../assets/arrows/arrow-straight.png";
import arrowLeft from "../../assets/arrows/arrow-left.png";
import arrowRight from "../../assets/arrows/arrow-right.png";
import { Link } from "react-router-dom";


const CityCrossStreet: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch("/api/Room/rooms/11"); 
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
            <Link to="/city-streight" ><img src={arrowStraight} className={style.arrow__straight} alt="straight" /></Link>
            <Link to="/interier2"><img src={arrowLeft} className={style.arrow__left} alt="left"></img></Link>
            <Link to="/interier1"><img src={arrowRight} className={style.arrow__right1} alt="right"></img></Link>
            <Link to="/shopdialog"><img src={arrowRight} className={style.arrow__right2} alt="right"></img></Link>
            <div className={style.room__container}>
                <div className={style.slot}></div>
                <div className={style.slot}></div>
                <div className={style.slot}></div>
                <div className={style.slot}></div>
            </div>
        </div>
    );

}
export default CityCrossStreet;