import Button from "../../components/Button/ButtonDB";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/Room/rooms");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    console.log(response);
                }
                const data = await response.json();
                setImages(data); // Předpokládáme, že API vrací pole odkazů na obrázky
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className={style.homeScreen}>
            <div className={style.container}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Fetched from database ${index}`} className={style.image} />
                ))}
                <Link to="/login"><Button btnText="Přihlásit se" /></Link>
                <Link to="/register"><Button btnText="Registrovat se" /></Link>
                <Button btnText="Hrát" />
                <Button btnText="Síň slávy" />
            </div>
        </div>
    );
};

export default Home;