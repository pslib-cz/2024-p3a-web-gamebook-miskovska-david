import { useState, useRef, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import style from "./DragAndDrop.module.css";
import Continue from '../../components/button/LinkButton'; 

// Import obrázků
import dnd1 from "../../assets/draganddrop/tile_0_0.webp";
import dnd2 from "../../assets/draganddrop/tile_0_1.webp";
import dnd3 from "../../assets/draganddrop/tile_0_2.webp";
import dnd4 from "../../assets/draganddrop/tile_0_3.webp";
import dnd5 from "../../assets/draganddrop/tile_1_0.webp";
import dnd6 from "../../assets/draganddrop/tile_1_1.webp";
import dnd7 from "../../assets/draganddrop/tile_1_2.webp";
import dnd8 from "../../assets/draganddrop/tile_1_3.webp";
import dnd9 from "../../assets/draganddrop/tile_2_0.webp";
import dnd10 from "../../assets/draganddrop/tile_2_1.webp";
import dnd11 from "../../assets/draganddrop/tile_2_2.webp";
import dnd12 from "../../assets/draganddrop/tile_2_3.webp";

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

// Funkce pro zamíchání pole
const shuffleArray = (array: { id: number; src: string }[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const GRID_ROWS = 3; 
const GRID_COLUMNS = 4; // Počet sloupců mřížky

const DragAndDrop = () => {
    const screenRef = useRef<HTMLDivElement | null>(null);
    const [images, setImages] = useState(shuffleArray([...initialImages])); // Zamíchání obrázků při inicializaci
    const [droppedImages, setDroppedImages] = useState<{ id: number; src: string; row: number; col: number }[]>([]);
    const [allCorrect, setAllCorrect] = useState(false);

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
                checkImagesPlacement(); // Kontrola umístění obrázků po každém přetažení
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

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

    // Funkce pro vrácení obrázku zpět do scrollbar
    const returnImageToScrollBar = (id: number) => {
        const imageToReturn = droppedImages.find(image => image.id === id);
        if (imageToReturn) {
            setImages((prev) => [...prev, { id: imageToReturn.id, src: imageToReturn.src }]);
            setDroppedImages((prev) => prev.filter((image) => image.id !== id));
        }
    };

    // Funkce pro kontrolu správného umístění obrázků
    const checkImagesPlacement = () => {
        let allCorrect = true;
        droppedImages.forEach(image => {
            const correctRow = Math.floor((image.id - 1) / GRID_COLUMNS);
            const correctCol = (image.id - 1) % GRID_COLUMNS;
            const isCorrect = image.row === correctRow && image.col === correctCol;
            console.log(`Image ${image.id} is ${isCorrect ? 'correctly' : 'incorrectly'} placed.`);
            if (!isCorrect) {
                allCorrect = false;
            }
        });
        setAllCorrect(allCorrect);
    };

    useEffect(() => {
        // Kontrola, zda jsou všechny obrázky správně umístěny
        const allImagesPlacedCorrectly = initialImages.every(image => {
            const correctRow = Math.floor((image.id - 1) / GRID_COLUMNS);
            const correctCol = (image.id - 1) % GRID_COLUMNS;
            const droppedImage = droppedImages.find(img => img.id === image.id);
            return droppedImage && droppedImage.row === correctRow && droppedImage.col === correctCol;
        });

        // Nastavíme stav allCorrect na true, pouze pokud jsou všechny obrázky správně umístěny
        setAllCorrect(allImagesPlacedCorrectly);
    }, [droppedImages]);

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
                checkImagesPlacement(); // Kontrola umístění obrázků po každém přetažení
                console.log(item)
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        console.log(isOver);
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
                onDoubleClick={() => returnImageToScrollBar(id)} // Přidání funkce pro dvojklik
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
                            id={`cell-${rowIndex}-${colIndex}`}
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

            {/* Tlačítko Continue */}
            {allCorrect && <Continue to="/room-with-text/48">Continue</Continue>}
        </div>
    );
};

export default DragAndDrop;