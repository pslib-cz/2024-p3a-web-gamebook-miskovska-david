import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { RoomType } from "../../types";
import useFetch from "../../hooks/useFetch";
import style from "./DragAndDrop.module.css";
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

const DragAndDrop = () => {
    const { data: rooms } = useFetch<RoomType>("api/Room/rooms/47");

    const images = [
       dnd1,
       dnd2,
       dnd3,
       dnd4,
       dnd5,
       dnd6,
       dnd7,
       dnd8,
       dnd9,
       dnd10,
       dnd11,
       dnd12
    ];

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: { id: number }) => moveImage(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    console.log(isOver);

    const moveImage = (id: number) => {
        // Implement the logic to handle the drop event
        console.log(`Image ${id} dropped`);
    };

    return (
       
            <div className={style.room__screen} style={{ backgroundImage: `url(/${rooms?.background})` }}>
                <div ref={drop} className={style.grid__container}>
                    {images.map((src, index) => (
                        <DraggableImage key={index} id={index} src={src} />
                    ))}
                </div>
            </div>
      
    );
};

const DraggableImage = ({ id, src }: { id: number, src: string }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={drag}
            src={src}
            alt={`dnd${id + 1}`}
            className={style.grid__item}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        />
    );
};

export default DragAndDrop;