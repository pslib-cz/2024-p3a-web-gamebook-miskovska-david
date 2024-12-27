import style from "./RoomWithDialog.module.css";
import React, { useEffect, useState } from "react";
import Pokracovat from "../../components/Button/Pokracovat";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Typewriter from 'typewriter-effect'

type RoomWithDialogProps = {
    roomId?: string | undefined;
}

const RoomWithDialog: React.FC<RoomWithDialogProps>= ({roomId,}) => {
    const [visibleDialogIndex, setVisibleDialogIndex] = useState<number>(1);
    const [startDialogIndex, setStartDialogIndex] = useState<number>(0);
    const [dialog, setDialog] = useState<string>("")
    roomId = useParams().id
    const navigate = useNavigate();
    const idNumber =  roomId ? parseInt(roomId): 0;   
    const {data} = useFetch(`/api/Room/rooms/${idNumber}`);


    

    useEffect(() => {
        const GetDialogs = () => {
            if(data !== null){
                
                let dialogSentence = ""
                for(let i = startDialogIndex; i < visibleDialogIndex; i++){
                    dialogSentence += data.dialogs[i] + "\n"
                    if(i >= data.dialogs.length - 1){
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
}, [data, startDialogIndex, visibleDialogIndex, navigate, idNumber])

    
   console.log(startDialogIndex)
    console.log(visibleDialogIndex)
   

    const changeDialogHandler = () => {
        setVisibleDialogIndex(visibleDialogIndex + 1)
        setStartDialogIndex(visibleDialogIndex)
    }

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
       <Pokracovat text="Pokračovat" changeDialog={changeDialogHandler}/>
    </div>
  </div>
  );

}
export default RoomWithDialog;