import style from "./ShopDialog.module.css";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import { RoomType } from "../../types";
const Room06: React.FC = () => {
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [visibleContinue, setVisibleContinue] = useState<boolean>(false);
  const [dialog, setDialog] = useState<string>("");

  const { data } = useFetch<RoomType>(`/api/Room/rooms/20`);

  const nextDialog = (array: string[] | undefined, index: number) => {
    if (array) {
      setDialog(array[index]);
      setDialogIndex(index + 1);
      if (index === array.length) {
        setVisibleContinue(true);
      }
    }
  };

  if (dialogIndex === 0) 
    nextDialog(data?.dialogs, dialogIndex);

console.log(data?.dialogs.length)

  return (
    <div
      className={style.room__screen}
      style={{ backgroundImage: `url(/${data?.background})` }}
    >
      <div className={style.room__container}>
        <p style={{ display: dialogIndex <= data?.dialogs.length ? "block" : "none" }}>
          <Typewriter
            options={{
              strings: dialog,
              autoStart: true,
              deleteSpeed: 0,
              loop: false,
            }}
          />
        </p>

        {visibleContinue && (
          <div className={style.buttons}>
            <Link to="/city-cross"><button className={style.button}>Odejít</button></Link>
            <Link to="/shop"><button className={style.button}>Koupit</button></Link>
          </div>
        )}

        <button
          style={{ display: dialogIndex <= data?.dialogs.length ? "block" : "none" }}
          className={style.continueButton}
          onClick={() => nextDialog(data?.dialogs, dialogIndex)}
        >
          Pokračovat
        </button>
      </div>
    </div>
  );
};

export default Room06;
