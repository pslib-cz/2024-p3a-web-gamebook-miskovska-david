import style from "./Input.module.css";

type InputProps = {
    placeholder: string;
}

const Input: React.FC<InputProps> = ({placeholder}) => {
    return (
        <input type="text" placeholder={placeholder} className={style.login__input}></input> 
    )
}

export default Input;