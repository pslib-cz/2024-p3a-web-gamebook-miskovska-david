import {useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import classes from "./FightRoom.module.css";
import FightButton from "../../components/fightButtons/FightButton";
import { CharacterType, ItemType, PlayerType, RoomType } from "../../types";
import { useEffect, useState } from "react";

const FightRoom: React.FC = () => {
  const id = useParams().id;
  const idNumber = id ? parseInt(id) : 0;
  const navigate = useNavigate();
  const [fightBtn, setFigntBtn] = useState<JSX.Element | null>(null);
  const [enemyStartHp, setStartEnemyHp] = useState<number>(100);
  const [playerStartHp, setStartPlayerHp] = useState<number>(100);
  const { data: RoomData } = useFetch<RoomType>(`/api/Room/rooms/${idNumber}`);
  const { data: AtkData } = useFetch<ItemType>(`/api/Item/items/100`);
  const { data: DefData } = useFetch<ItemType>(`/api/Item/items/101`);
  const { data: enemy } = useFetch<CharacterType>(
    `/api/Character/characters/1`
  );
  const { data: player } = useFetch<PlayerType>(
    `/api/Player/players/${localStorage.getItem("UserId")}`
  );

  

  const Attack = (
    playerAtk: number,
  ) => {
    RandomSpawn();
    setStartEnemyHp((prevHp) => prevHp - playerAtk)
  };

  const Defend = (
    defence: number,
    enemyAtk: number
  ) => {
     setStartPlayerHp((prevHp) => prevHp - (enemyAtk - defence));
    RandomSpawn();
  };

  const RandomSpawn = () => {

    if(playerStartHp <= 0){
      navigate("room-with-text/8");
      return;
    }

    if(enemyStartHp <= 0){
      navigate("room-with-text/7");
      return;
    }

    const screenWith = window.innerWidth;
    const screenHeigh = window.innerHeight;
    const randomTop = Math.floor(Math.random() * (screenHeigh - 150));
    const randomLeft = Math.floor(Math.random() * (screenWith - 150));
    const random = Math.round(Math.random() * 2);

    if (random === 0) {
      setFigntBtn(
        <FightButton
          top={randomTop}
          left={randomLeft}
          path={`/${DefData?.background}`}
          OnClick={() => Defend(player?.defense ? player.defense : 0, enemy?.attack ? enemy.attack : 10)}
        />
      );
    } else {
      setFigntBtn(
        <FightButton
          top={randomTop}
          left={randomLeft}
          path={`/${AtkData?.background}`}
          OnClick={() => Attack(player?.damage ? player.damage : 10)}
        />
      );
    }
  };



  useEffect(() => {
    RandomSpawn();
    setStartEnemyHp(enemy?.hp ? enemy.hp : 100);
    setStartPlayerHp(player?.hp ? player.hp : 100);
  }, []);

  console.log(enemyStartHp);
  console.log(playerStartHp);

  return (
    <div
      style={{ backgroundImage: `url(/${RoomData?.background})` }}
      className={classes.container}
    >
      <div className={classes.player}>
        <p>Maxim</p>
        <div className={classes.player_health}></div>
      </div>
      <div className={classes.enemy}>
        <p>{enemy?.name}</p>
        <div className={classes.enemy_health}></div>
      </div>
      {fightBtn}
    </div>
  );
};

export default FightRoom;
