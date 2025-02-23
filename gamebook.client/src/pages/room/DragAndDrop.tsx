import React, { useState, useRef } from 'react';
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

const initialImages = [
    { id: 1, src: dnd1 },
    { id: 2, src: dnd2 },
    { id: 3, src: dnd3 },
    { id: 4, src: dnd4 },
    { id: 5, src: dnd5 },
    { id: 6, src: dnd6 },
    { id: 7, src: dnd7 },
    { id: 8, src: dnd8 },
    { id: 9, src: dnd9 },
    { id: 10, src: dnd10 },
    { id: 11, src: dnd11 },
    { id: 12, src: dnd12 }
];

const DragAndDrop = () => {
    const { data: rooms } = useFetch<RoomType>("api/Room/rooms/47");
    const screenRef = useRef<HTMLDivElement>(null);

    const [images, setImages] = useState(initialImages);
    const [droppedImages, setDroppedImages] = useState<{ id: number; src: string; x: number; y: number }[]>([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: { id: number }, monitor) => {
            const offset = monitor.getClientOffset();
            if (offset && screenRef.current) {
                const { left, top } = screenRef.current.getBoundingClientRect();
                const x = offset.x - left;
                const y = offset.y - top;
                moveImageToScreen(item.id, x, y);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    console.log(isOver)

    const moveImageToScreen = (id: number, x: number, y: number) => {
        const imageToMove = images.find(image => image.id === id) || droppedImages.find(image => image.id === id);
        if (imageToMove) {
            setDroppedImages((prev) => [...prev.filter((image) => image.id !== id), { id, src: imageToMove.src, x, y }]);
            setImages((prev) => prev.filter((image) => image.id !== id));
        }
    };

    const moveImageBackToContainer = (id: number) => {
        const imageToMove = droppedImages.find((image) => image.id === id);
        if (imageToMove) {
            setImages((prev) => [...prev, { id: Date.now(), src: imageToMove.src }]);
            setDroppedImages((prev) => prev.filter((image) => image.id !== id));
        }
    };

    return (
        <div ref={screenRef} className={style.room__screen} style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <div ref={drop} className={style.room__screen}>
                {droppedImages.map((image) => (
                    <DraggableImage
                        key={image.id}
                        id={image.id}
                        src={image.src}
                        x={image.x}
                        y={image.y}
                        moveImageBackToContainer={moveImageBackToContainer}
                        moveImageToScreen={moveImageToScreen}
                    />
                ))}
                <div className={style.grid__container}>
                    {images.map((image) => (
                        <DraggableImage key={image.id} id={image.id} src={image.src} moveImageToScreen={moveImageToScreen} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DraggableImage = ({ id, src, x, y, moveImageBackToContainer, moveImageToScreen }: { id: number, src: string, x?: number, y?: number, moveImageBackToContainer?: (id: number) => void, moveImageToScreen?: (id: number, x: number, y: number) => void }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: { id },
        end: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (offset && moveImageToScreen) {
                const sourceOffset = monitor.getSourceClientOffset();
                if (sourceOffset) {
                    const x = offset.x - sourceOffset.x;
                    const y = offset.y - sourceOffset.y;
                    moveImageToScreen(id, x, y);
                }
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDoubleClick = () => {
        if (moveImageBackToContainer) {
            moveImageBackToContainer(id);
        }
    };

    return (
        <img
            ref={drag}
            src={src}
            alt={`dnd${id}`}
            className={`${style.grid__item} ${isDragging ? style.dragging : ''}`}
            style={{
                opacity: isDragging ? 0.5 : 1,
                left: x !== undefined ? `${x}px` : 'auto',
                top: y !== undefined ? `${y}px` : 'auto',
                position: x !== undefined && y !== undefined ? 'absolute' : 'static',
                cursor: 'grab',
                zIndex: x !== undefined && y !== undefined ? 1 : 'auto',
            }}
            onDoubleClick={handleDoubleClick}
        />
    );
};

export default DragAndDrop;