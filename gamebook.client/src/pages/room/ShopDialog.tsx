import style from "./ShopDialog.module.css";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { RoomType } from "../../types";

const ShopDialog: React.FC = () => {
  const [dialogIndex, setDialogIndex] = useState<number>(0);
  const [visibleContinue, setVisibleContinue] = useState<boolean>(false);
  const [dialog, setDialog] = useState<string>("");

  const { data } = useFetch<RoomType>(`/api/Room/rooms/104`);

  useEffect(() => {
    if (data?.dialogs && dialogIndex === 0) {
      nextDialog(data.dialogs, dialogIndex);
    }
  }, [data]);

  const nextDialog = (array: string[] | undefined, index: number) => {
    if (array && index < array.length) {
      setDialog(array[index]);
      setDialogIndex(index + 1);
      if (index + 1 === array.length) {
        setVisibleContinue(true);
      }
    }
  };

  return (
    <div
      className={style.room__screen}
      style={{ backgroundImage: `url(/${data?.background || "default.jpg"})` }}
    >
      <div className={style.room__container}>
        {data?.dialogs && (
          <p style={{ display: dialogIndex <= data.dialogs.length ? "block" : "none" }}>
            {dialog || ""}
          </p>
        )}

        {visibleContinue && (
          <div className={style.buttons}>
            <Link to="/city-cross" className={style.button}>Odejít</Link>
            <Link to="/shop" className={style.button} >Koupit</Link>
          </div>
        )}

        {data?.dialogs && (
          <button
            style={{ display: dialogIndex < data.dialogs.length ? "block" : "none" }}
            className={style.continueButton}
            onClick={() => nextDialog(data.dialogs, dialogIndex)}
          >
            Pokračovat
          </button>
        )}
      </div>
    </div>
  );
};
export default ShopDialog; 