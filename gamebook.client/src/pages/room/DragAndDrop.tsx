import React from 'react';
import { useDrop } from 'react-dnd';
import style from "./DragAndDrop.module.css";
import { RoomType } from "../../types";
import useFetch from "../../hooks/useFetch";
import dnd1 from "../../assets/draganddrop/dnd_1.jpg";
import dnd2 from "../../assets/draganddrop/dnd_2.jpg";
import dnd3 from "../../assets/draganddrop/dnd_3.jpg";
import dnd4 from "../../assets/draganddrop/dnd_4.jpg";
import dnd5 from "../../assets/draganddrop/dnd_5.jpg";
import dnd6 from "../../assets/draganddrop/dnd_6.jpg";
import dnd7 from "../../assets/draganddrop/dnd_7.jpg";
import dnd8 from "../../assets/draganddrop/dnd_8.jpg";
import dnd9 from "../../assets/draganddrop/dnd_9.jpg";
import dnd10 from "../../assets/draganddrop/dnd_10.jpg";
import dnd11 from "../../assets/draganddrop/dnd_11.jpg";
import dnd12 from "../../assets/draganddrop/dnd_12.jpg";




const DragaAndDrop = () => {

    const {data: rooms} = useFetch<RoomType>("api/Room/rooms/47");
    return(
           <div  className={style.room__screen}
           style={{ backgroundImage: `url(/${rooms?.background})` }}>  
            <img src={dnd1} alt="dnd1" />
            <img src={dnd2} alt="dnd2" />
            <img src={dnd3} alt="dnd3" />
            <img src={dnd4} alt="dnd4" />
            <img src={dnd5} alt="dnd5" />
            <img src={dnd6} alt="dnd6" />
            <img src={dnd7} alt="dnd7" />
            <img src={dnd8} alt="dnd8" />
            <img src={dnd9} alt="dnd9" />
            <img src={dnd10} alt="dnd10" />
            <img src={dnd11} alt="dnd11" />
            <img src={dnd12} alt="dnd12" />
           </div>
    )
}
export default DragaAndDrop;