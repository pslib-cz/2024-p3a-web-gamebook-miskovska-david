import style from "./Input.module.css";
import { useId } from "react";

type InputProps = {
    placeholder: string;
    label?: string;
    onDataSend: (data: string) => void;
    inputType?: string;
}

const Input: React.FC<InputProps> = ({placeholder, label, onDataSend, inputType}) => {
    const id = useId();
    return (
        <>
            <label htmlFor={id} style={{display: label ? "block" : "none"}} >{label}</label>
            <input id={id} type={inputType} placeholder={placeholder} className={style.login__input} onChange={(e) => onDataSend(e.currentTarget.value)}/>
        </>
        
    )
}

export default Input;