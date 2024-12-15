import style from "./Login.module.css";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/ButtonLB";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";
import { RoomType } from "../../types";
type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {

    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch("/api/Room/rooms/1"); //Ta 1 je id místnosti, kterou chceme načíst. To pak se bude měnit v routě, takže místo 1 tam bude proměnná.
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
        
        <div className={style.login__screen} style={{backgroundImage: `url(/${rooms?.background}`}} >
            
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form}>
                    <Input placeholder="Uživatelské jméno/Email"></Input>
                    <Input placeholder="Heslo"></Input>
                </form>
                <Link to="/"><Button btnText="Přihlásit se" /></Link>
            </div>
            
        </div>
    )
    
}

export default Login;
