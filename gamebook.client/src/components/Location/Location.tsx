import style from "@/Location.module.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import LocationBtn from "../../assets/location/location.svg";
import { LocationType, RoomType } from "../../types";
const Location: React.FC = () => {
  const id = useParams().id;
  const { data } = useFetch<RoomType>(`/api/Room/rooms/${id}`);
  const {data: locationData} = useFetch<LocationType>(`/api/Location/locations/${data?.locationId}`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${style.location__menu} ${isOpen ? style.open : ""}`}>
      <img
        onClick={toggleMenu}
        src={LocationBtn}
        alt={locationData?.locationName}
        className={`${style.btn} ${isOpen ? style.btn__open : ""}`}
      />
      {isOpen && (
        <div className={style.menuContent}>
          <h3>{locationData?.locationName}</h3>
          <div className={style.location__content}>
              <img src={locationData?.locationImg} alt={locationData?.locationName} />
              <p>{locationData?.locationDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Location;