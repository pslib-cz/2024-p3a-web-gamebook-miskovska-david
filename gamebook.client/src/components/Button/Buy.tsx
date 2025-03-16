import style from "@/Buy.module.css";

type ButtonProps = {
    btnText: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({btnText, onClick}) =>{
    return (
        <button className={style.btn} onClick={onClick}>{btnText}</button>
    )
}
export default Button;