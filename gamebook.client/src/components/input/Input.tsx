import style from "./Input.module.css";
import { useId } from "react";
type InputProps = {
    placeholder: string;
    label?: string;
}

const Input: React.FC<InputProps> = ({placeholder, label}) => {
    const id = useId();
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" placeholder={placeholder} className={style.login__input}/>
        </>
        
    )
}

export default Input;