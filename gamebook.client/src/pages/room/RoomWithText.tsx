import style from "./RoomWithText.module.css"
import useFetch from "../../hooks/useFetch";
import Typewriter from 'typewriter-effect'

import { useParams } from "react-router-dom";
import LinkButton from "../../components/Button/LinkButton";

const RoomWithText: React.FC= () => {
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0;   
    const {data} = useFetch(`/api/Room/rooms/${idNumber}`);

    
    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${data?.background})` }}>
            <div className={style.room__container}>
            <Typewriter 
            options={{
            strings: data?.dialogs,
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