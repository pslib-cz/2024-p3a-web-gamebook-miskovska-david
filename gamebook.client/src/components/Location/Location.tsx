import style from "./Location.module.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import LocationBtn from "../../assets/location/location.svg";
import { RoomType } from "../../types";
const Location: React.FC = () => {
  const id = useParams().id;
  const { data } = useFetch<RoomType>(`/api/Room/rooms/${id}`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${style.location__menu} ${isOpen ? style.open : ""}`}>
      <img
        onClick={toggleMenu}
        src={LocationBtn}
        alt={data?.locationName}
        className={`${style.btn} ${isOpen ? style.btn__open : ""}`}
      />
      {isOpen && (
        <div className={style.menuContent}>
          <h3>{data?.locationName}</h3>
          <div className={style.location__content}>
              <img src={data?.location} alt={data?.locationName} />
              <p>{data?.locationDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Location;