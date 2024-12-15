import style from "./Room01.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import { RoomType } from "../../types";

const Room01: React.FC = () => {
    const [rooms, setRooms] = useState<RoomType | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTextComplete, setIsTextComplete] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/Room/rooms/1"); // ID místnosti je 1
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

    console.log(error);
    console.log(loading);

    useEffect(() => {
        if (rooms?.dialogs && !isTextComplete) {
            const currentText = rooms.dialogs[0];
            const animationDuration = currentText.length * 70;

            const timer = setTimeout(() => {
                setIsTextComplete(true);
            }, animationDuration);

            return () => clearTimeout(timer);
        }
    }, [isTextComplete, rooms]);

    return (
        <div
            className={style.room__screen}
            style={{ backgroundImage: `url(/${rooms?.background})` }}
        >
            <div className={style.room__container}>
                {rooms && (
                    <p className={style.room__text}>
                        {rooms.dialogs[0]}
                    </p>
                )}
                {isTextComplete && <Pokracovat text="Pokračovat" />}
            </div>
        </div>
    );
};

export default Room01;
