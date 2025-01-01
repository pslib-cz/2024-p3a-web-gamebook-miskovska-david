import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import classes from "./FightRoom.module.css";
import FightButton from "../../components/FightButtons/FightButton";

const FightRoom: React.FC= () => {
    
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0; 

    const {data: RoomData} = useFetch(`/api/Room/rooms/${idNumber}`);
    const {data: AtkData} = useFetch(`/api/Item/items/100`);
    const {data: DefData} = useFetch(`/api/Room/rooms/${idNumber}`);



    const RandomSpawn = () => {
        const screenWith = window.innerWidth;
        const screenHeigh = window.innerHeight;
        const randomTop = Math.floor(Math.random() * (screenHeigh - 50));
        const randomLeft = Math.floor(Math.random() * (screenWith-50));
        return <FightButton top={randomTop} left={randomLeft} path={`/${AtkData?.background}`}  />;
    }
  

  return(
    <div style={{ backgroundImage: `url(/${RoomData?.background})` }} className={classes.container}>
        {RandomSpawn()}
    </div>
  );

}
export default FightRoom;