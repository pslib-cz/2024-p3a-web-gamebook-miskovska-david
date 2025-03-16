import style from "@/ButtonDB.module.css";

type ButtonProps = {
    btnText: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({btnText}) =>{
    return (
        <button className={style.btn}>{btnText}</button>
    )
}
export default Button;