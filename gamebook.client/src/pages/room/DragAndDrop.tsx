import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import style from "./DragAndDrop.module.css";

// Import obrázků
import dnd1 from "../../assets/draganddrop/segment_12_0_0.png";
import dnd2 from "../../assets/draganddrop/segment_12_0_1.png";
import dnd3 from "../../assets/draganddrop/segment_12_0_2.png";
import dnd4 from "../../assets/draganddrop/segment_12_0_3.png";
import dnd5 from "../../assets/draganddrop/segment_12_1_0.png";
import dnd6 from "../../assets/draganddrop/segment_12_1_1.png";
import dnd7 from "../../assets/draganddrop/segment_12_1_2.png";
import dnd8 from "../../assets/draganddrop/segment_12_1_3.png";
import dnd9 from "../../assets/draganddrop/segment_12_2_0.png";
import dnd10 from "../../assets/draganddrop/segment_12_2_1.png";
import dnd11 from "../../assets/draganddrop/segment_12_2_2.png";
import dnd12 from "../../assets/draganddrop/segment_12_2_3.png";

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

const GRID_ROWS = 3; // Počet řádků mřížky
const GRID_COLUMNS = 4; // Počet sloupců mřížky

const DragAndDrop = () => {
    const screenRef = useRef<HTMLDivElement | null>(null);
    const [images, setImages] = useState(initialImages);
    const [droppedImages, setDroppedImages] = useState<{ id: number; src: string; row: number; col: number }[]>([]);

    // useDrop pro mřížku
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: { id: number }, monitor) => {
            const offset = monitor.getClientOffset();
            if (offset && screenRef.current) {
                const { left, top } = screenRef.current.getBoundingClientRect();
                const x = offset.x - left;
                const y = offset.y - top;

                // Vypočítáme řádek a sloupec na základě pozice myši
                const col = Math.floor(x / (screenRef.current.offsetWidth / GRID_COLUMNS));
                const row = Math.floor(y / (screenRef.current.offsetHeight / GRID_ROWS));

                // Najdeme obrázek na cílové pozici
                const targetImage = droppedImages.find(image => image.row === row && image.col === col);

                // Přesuneme obrázek na cílovou pozici nebo vyměníme pozice
                if (targetImage) {
                    setDroppedImages(prev => prev.map(image => {
                        if (image.id === item.id) {
                            return { ...image, row: targetImage.row, col: targetImage.col };
                        } else if (image.id === targetImage.id) {
                            return { ...image, row, col };
                        }
                        return image;
                    }));
                } else {
                    moveImageToScreen(item.id, row, col);
                }
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    console.log(isOver);

    // Sloučení refů pro drop oblast
    const mergedRef = (node: HTMLDivElement) => {
        screenRef.current = node;
        drop(node);
    };

    // Funkce pro přesun obrázku do mřížky
    const moveImageToScreen = (id: number, row: number, col: number) => {
        const imageToMove = images.find(image => image.id === id) || droppedImages.find(image => image.id === id);
        if (imageToMove) {
            setDroppedImages((prev) => [...prev.filter((image) => image.id !== id), { id, src: imageToMove.src, row, col }]);
            setImages((prev) => prev.filter((image) => image.id !== id));
        }
    };

    // Komponenta DraggableImage (nyní uvnitř DragAndDrop)
    const DraggableImage = ({ id, src, moveImageToScreen }: { id: number; src: string; moveImageToScreen: (id: number, row: number, col: number) => void }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'image',
            item: { id },
            end: (item, monitor) => {
                const offset = monitor.getClientOffset();
                if (offset && moveImageToScreen) {
                    const sourceOffset = monitor.getSourceClientOffset();
                    if (sourceOffset) {
                        const gridRect = screenRef.current?.getBoundingClientRect();
                        if (gridRect) {
                            const row = Math.floor((offset.y - gridRect.top) / (gridRect.height / GRID_ROWS));
                            const col = Math.floor((offset.x - gridRect.left) / (gridRect.width / GRID_COLUMNS));
                            moveImageToScreen(id, row, col);
                        }
                    }
                }
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <img
                ref={drag}
                src={src}
                alt={`dnd${id}`}
                className={`${style.gridItem} ${isDragging ? style.dragging : ''}`}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'grab',
                    width: '100%',
                    height: '100%',
                }}
            />
        );
    };

    return (
        <div className={style.container}>
            <div ref={mergedRef} className={style.dropArea}>
                {/* Mřížka */}
                {Array.from({ length: GRID_ROWS * GRID_COLUMNS }).map((_, index) => {
                    const rowIndex = Math.floor(index / GRID_COLUMNS);
                    const colIndex = index % GRID_COLUMNS;
                    const image = droppedImages.find(img => img.row === rowIndex && img.col === colIndex);
                    return (
                        <div
                            key={index}
                            className={style.gridCell}
                        >
                            {image && (
                                <DraggableImage
                                    id={image.id}
                                    src={image.src}
                                    moveImageToScreen={moveImageToScreen}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Obrázky k přetažení */}
            <div className={style.imageList}>
                {images.map((image) => (
                    <DraggableImage key={image.id} id={image.id} src={image.src} moveImageToScreen={moveImageToScreen} />
                ))}
            </div>
        </div>
    );
};

export default DragAndDrop;