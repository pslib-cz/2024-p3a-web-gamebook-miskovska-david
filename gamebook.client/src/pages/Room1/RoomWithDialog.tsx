import style from "./RoomWithDialog.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import { RoomType } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import Typewriter from 'typewriter-effect'

type RoomWithDialogProps = {
    roomId?: string | undefined;
}

const RoomWithDialog: React.FC<RoomWithDialogProps>= ({roomId,}) => {
    const [rooms, setRooms] = useState<RoomType | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [visibleDialogIndex, setVisibleDialogIndex] = useState<number>(1);
    const [startDialogIndex, setStartDialogIndex] = useState<number>(0);
    const [dialog, setDialog] = useState<string>("")
    roomId = useParams().id
    const navigate = useNavigate();
    const idNumber =  roomId ? parseInt(roomId): 0;   


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await fetch(`/api/Room/rooms/${roomId}`); 
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
        
        
    }, [roomId]);

    useEffect(() => {
        const GetDialogs = () => {
            if(rooms !== null){
                
                let dialogSentence = ""
                for(let i = startDialogIndex; i < visibleDialogIndex; i++){
                    dialogSentence += rooms.dialogs[i] + "\n"
                    if(i >= rooms.dialogs.length - 1){
                        if(idNumber+1 === 3 || idNumber+1 === 5 ){
                            navigate(`/room-with-text/${idNumber + 1}`)
                            
                            break;
                        }else if(idNumber+1 === 6){
                            navigate(`/fight/${idNumber + 1}`)
                            
                            break;
                        }
                        else{
                            navigate(`/rooms/${idNumber + 1}`)
                            
                            break;
                        }
                        
                    }
                    setDialog(dialogSentence)
                }
        }
    }
    GetDialogs()
}, [rooms, startDialogIndex, visibleDialogIndex, navigate, idNumber])

    
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
            deleteSpeed: 0,
            loop: false,
            }}
        />
       <Pokracovat text="Pokračovat" changeDialog={changeDialogHandler}/>
    </div>
  </div>
  );

}
export default RoomWithDialog;