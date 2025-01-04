import style from "./Room06.module.css";
import React, { useEffect, useState } from "react";
import { RoomType } from "../../types";

const Room01: React.FC = () => {
    const [rooms, setRooms] = useState<RoomType | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTextComplete, setIsTextComplete] = useState<boolean>(false);
    const [displayedText, setDisplayedText] = useState<string>("");
    const [showButtons, setShowButtons] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/Room/rooms/20");
                if (!response.ok) {
                    throw new Error("Nepodařilo se načíst místnosti");
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error("Něco se pokazilo"));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (rooms?.dialogs?.[0]) {
            const fullText = rooms.dialogs[0];
            let index = 0;

            setDisplayedText("");

            const interval = setInterval(() => {
                if (index <= fullText.length) {
                    setDisplayedText(fullText.slice(0, index));
                    index += 1;
                } else {
                    clearInterval(interval);
                    setIsTextComplete(true);
                }
            }, 70);

            return () => clearInterval(interval);
        }
    }, [rooms]);

    console.log(error);
    console.log(loading);


    const handleContinueClick = () => {
        setIsTextComplete(false);
        setShowButtons(true);
    };

    return (
        <div className={style.room__screen} style={{ backgroundImage: `url(/${rooms?.background})` }}>
            <div className={style.room__container}>
                {!showButtons && (
                    <p className={style.room__text}>{displayedText}</p>
                )}

                {isTextComplete && (
                    <button className={style.continueButton} onClick={handleContinueClick}>
                        Pokračovat
                    </button>
                )}
            </div>
            
            {showButtons && (
                    <div className={style.buttons}>
                        <button className={style.button}>Odejít</button>
                        <button className={style.button}>Koupit</button>
                    </div>
                )}
        </div>
    );
};

export default Room01;
