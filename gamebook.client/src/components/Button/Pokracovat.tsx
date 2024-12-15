
import style from "./Pokracovat.module.css";

type PokracovatProps = {
    text:string
}

const Pokracovat :React.FC<PokracovatProps> = ({text}) => {
    return(
        <p className={style.text}>{text}</p>
    )
}

export default Pokracovat;