import style from "./RoomWithDialog.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import { RoomType } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import Typewriter from 'typewriter-effect'

type RoomWithDialogProps = {
    roomId?: string | undefined;
    numberOfDialogs: number;
}

const RoomWithDialog: React.FC<RoomWithDialogProps>= ({roomId, numberOfDialogs}) => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [visibleDialogIndex, setVisibleDialogIndex] = useState<number>(3);
    const [startDialogIndex, setStartDialogIndex] = useState<number>(0);
    const [dialog, setDialog] = useState<string>("")
    roomId = useParams().id
    let navigate = useNavigate();
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch(`/api/Room/rooms/${roomId}`); //Ta 1 je id místnosti, kterou chceme načíst. To pak se bude měnit v routě, takže místo 1 tam bude proměnná.
            if(!response.ok){
                throw new Error("Nepodařilo se načíst místnosti")
            }
            const data = await response.json();
            setRooms(data)
            }
            catch(error){
                if(error instanceof Error){
                    setError(error)
                }else{
                    setError(new Error("Něco se pokazilo"))
                }
            }finally{
                setLoading(false)
            }
        }
        fetchData();
        setVisibleDialogIndex(numberOfDialogs);
        
    }, [roomId, numberOfDialogs]);

    useEffect(() => {
        const GetDialogs = () => {
            if(rooms !== null){
                
                let dialogSentence = ""
                for(let i = startDialogIndex; i < visibleDialogIndex; i++){
                    dialogSentence += rooms.dialogs[i] + "\n"
                    if(i === rooms.dialogs.length - 1){
                        navigate("/rooms/3")
                    }
                    setDialog(dialogSentence)
                }
        }
    }
    GetDialogs()
}, [rooms, startDialogIndex, visibleDialogIndex, navigate])

    
   console.log(error);
   console.log(loading);
   console.log(startDialogIndex)
    console.log(visibleDialogIndex)
   

    const changeDialogHandler = () => {
        setVisibleDialogIndex(visibleDialogIndex + 1)
        setStartDialogIndex(visibleDialogIndex)
    }

  return(
    <div
    className={style.room__screen}
    style={{ backgroundImage: `url(/${rooms?.background}` }}>
    <div className={style.room__container}>
        <Typewriter
            options={{
            strings: dialog,
            autoStart: true,
            loop: false,
            }}
        />
      {visibleDialogIndex >= 2 && <Pokracovat text="Pokračovat" changeDialog={changeDialogHandler}/>}
    </div>
  </div>
  );

}
export default RoomWithDialog;