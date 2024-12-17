import style from "./RoomWithText.module.css"
import React, { useEffect, useState } from "react";
import Typewriter from 'typewriter-effect'
import { RoomType } from "../../types";
import { useParams } from "react-router-dom";
import LinkButton from "../../components/Button/LinkButton";

const RoomWithText: React.FC= () => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0;   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch(`/api/Room/rooms/${id}`); 
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
    }, [id]);
   console.log(error);
   console.log(loading);

    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <div className={style.room__container}>
            <Typewriter 
            options={{
            strings: rooms?.dialogs,
            autoStart: true,
            cursor: "",
            deleteSpeed: 0,
            loop: false,
        }}
        />
        <LinkButton to={idNumber+1 === 6 ? `/fight/${idNumber+1}` :`/rooms/${idNumber+1}`}>Pokračovat</LinkButton>

            </div>
        </div>
    );

}
export default RoomWithText;