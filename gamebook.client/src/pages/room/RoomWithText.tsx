import style from "@/RoomWithText.module.css"
import useFetch from "../../hooks/useFetch";
import Typewriter from 'typewriter-effect'
import { RoomType } from "../../types";
import { useParams } from "react-router-dom";
import Continue from "../../components/button/Continue";

const RoomWithText: React.FC= () => {
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0;   
    const {data} = useFetch<RoomType>(`/api/Room/rooms/${idNumber}`);
    const {data: nextRoom} = useFetch<RoomType>(`/api/Room/rooms/${idNumber+1}`);

    
    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${data?.background})` }}>
            <div className={style.room__container}>
               <div className={style.typewriter}>
                 <Typewriter 
                 options={{
                 strings: data?.dialogs,
                 autoStart: true,
                 cursor: "",
                 deleteSpeed: 0,
                 loop: false,
                 }}/>
              </div>
              <Continue type={nextRoom?.roomType} roomId={idNumber+1} >Pokračovat...</Continue>
            </div>
        </div>
    );

}
export default RoomWithText;