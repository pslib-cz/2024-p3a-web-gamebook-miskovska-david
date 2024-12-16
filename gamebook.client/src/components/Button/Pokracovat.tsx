
import style from "./Pokracovat.module.css";

type PokracovatProps = {
    text:string
    changeDialog: () => void
}

const Pokracovat :React.FC<PokracovatProps> = ({text, changeDialog}) => {
    return(
        <button onClick={changeDialog} className={style.text}>{text}</button>
    )
}

export default Pokracovat;