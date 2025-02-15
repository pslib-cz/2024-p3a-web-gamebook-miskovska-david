import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import classes from "./FightRoom.module.css";
import FightButton from "../../components/FightButtons/FightButton";
import { CharacterType, ItemType, PlayerType, RoomType } from "../../types";

const FightRoom: React.FC= () => {
    
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0; 

    const {data: RoomData} = useFetch<RoomType>(`/api/Room/rooms/${idNumber}`);
    const {data: AtkData} = useFetch<ItemType>(`/api/Item/items/100`);
    const {data: DefData} = useFetch<ItemType>(`/api/Item/items/101`);
    const {data: enemy} = useFetch<CharacterType>(`/api/Character/characters/1`);
    const {data: player} = useFetch<PlayerType>(`/api/Character/characters/2`);


    const RandomSpawn = () => {
        const screenWith = window.innerWidth;
        const screenHeigh = window.innerHeight;
        const randomTop = Math.floor(Math.random() * (screenHeigh - 50));
        const randomLeft = Math.floor(Math.random() * (screenWith-50));

        const random = Math.round(Math.random() * 2);
        if(random === 0)
           return <FightButton top={randomTop} left={randomLeft} path={`/${DefData?.background}`}  />;
        else
          return <FightButton top={randomTop} left={randomLeft} path={`/${AtkData?.background}`}  />;
    }

    const FightHandler = (hp: number, enemyHp: number) => {
      
    }

  

  return(
    <div style={{ backgroundImage: `url(/${RoomData?.background})` }} className={classes.container}>
      <p className={classes.player}>Maxim</p>
      <p className={classes.enemy}>{enemy?.name}</p>
        {RandomSpawn()}
    </div>
  );

}
export default FightRoom;