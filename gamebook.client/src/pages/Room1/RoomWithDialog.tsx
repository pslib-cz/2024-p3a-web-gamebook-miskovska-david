import style from "./RoomWithDialog.module.css";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Typewriter from 'typewriter-effect'
import { Link } from "react-router-dom";
import React, { useState } from "react";

type RoomWithDialogProps = {
    roomId?: string | undefined;
}

const RoomWithDialog: React.FC<RoomWithDialogProps>= ({roomId,}) => {

    const [visibleContinue, setVisibleContinue] = useState<boolean>(false);
    const [dialog, setDialog] = useState<string>("");   
    const [dialogIndex, setDialogIndex] = useState<number>(0);
    roomId = useParams().id
    const idNumber =  roomId ? parseInt(roomId): 0;   
    const {data} = useFetch(`/api/Room/rooms/${idNumber}`);
    
    

    
    const nextDialog = (array: string[] | undefined, index: number) => {
        if(array){
            setDialog(array[index]);
            setDialogIndex(index+1);
            if(index === array.length){
                setVisibleContinue(true);

            }
        }
    }  

    if(dialogIndex === 0)
        nextDialog(data?.dialogs, dialogIndex)
    
   
  return(
    <div
    className={style.room__screen}
    style={{ backgroundImage: `url(/${data?.background}` }}>
    <div className={style.room__container}>
        <Typewriter
            options={{
            strings: dialog,
            autoStart: true,
            deleteSpeed: 0,
            loop: false,
            }}
        />
        {visibleContinue ? <Link className={style.link} to="" >Pokračovat...</Link> :<button className={style.btn} onClick={() => nextDialog(data?.dialogs, dialogIndex)}>Pokračovat</button>}
    </div>
  </div>
  );

}
export default RoomWithDialog;