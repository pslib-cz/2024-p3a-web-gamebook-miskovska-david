import style from "./RoomWithText.module.css"
import useFetch from "../../hooks/useFetch";
import { RoomType } from "../../types";
import { useParams } from "react-router-dom";
import Continue from "../../components/button/Continue";

const RoomWithText: React.FC= () => {
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0;   
    const {data} = useFetch<RoomType>(`/api/Room/rooms/${idNumber}`);

    
    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${data?.background})` }}>
            <div className={style.room__container}>
               <div className={style.typewriter}>
                 {data?.dialogs}
              </div>
              <Continue route={data?.route} >Pokračovat...</Continue>
            </div>
        </div>
    );

}
export default RoomWithText;