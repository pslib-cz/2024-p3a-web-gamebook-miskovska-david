import {useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import classes from "./FightRoom.module.css";
import FightButton from "../../components/FightButtons/FightButton";
import { CharacterType, PlayerType, RoomType } from "../../types";
import { useEffect, useState } from "react";

const FightRoom: React.FC = () => {
  const id = useParams().id;
  const idNumber = id ? parseInt(id) : 0;
  const navigate = useNavigate();
  const [fightBtn, setFigntBtn] = useState<JSX.Element | null>(null);
  const [enemyStartHp, setStartEnemyHp] = useState<number>(100);
  const [playerStartHp, setStartPlayerHp] = useState<number>(100);
  const { data: RoomData } = useFetch<RoomType>(`/api/Room/rooms/${idNumber}`);
  const { data: enemy } = useFetch<CharacterType>(
    `/api/Character/characters/1`
  );
  const { data: player } = useFetch<PlayerType>(
    `/api/Player/players/${localStorage.getItem("UserId")}`
  );

  

  const Attack = (
    playerAtk: number,
  ) => {
    setStartEnemyHp((prevHp) => prevHp - playerAtk)
    RandomSpawn();
  };

  const Defend = (
    defence: number,
    enemyAtk: number
  ) => {
     setStartPlayerHp((prevHp) => prevHp - (enemyAtk - defence));
    
    RandomSpawn();
  };

  const RandomSpawn = () => {

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
          path={`/uploads/ikona_obrany-removebg-preview.webp`}
          OnClick={() => Defend(player?.defense ? player.defense : 0, enemy?.attack ? enemy.attack : 10)}
        />
      );
    } else {
      setFigntBtn(
        <FightButton
          top={randomTop}
          left={randomLeft}
          path={`/uploads/ikona_boje-removebg-preview.webp`}
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

  useEffect(() => {
    if(playerStartHp <= 0){
      navigate(`/text/${idNumber+1}`);
      return;
    }

    if(enemyStartHp <= 0){
      navigate(`/text/${idNumber+1}`);
      return;
    }
  }
  , [enemyStartHp, playerStartHp, navigate]);

  console.log(enemyStartHp);
  console.log(playerStartHp);
  console.log(RoomData)

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
