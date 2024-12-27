import { PropsWithChildren } from "react";
import style from "./LinkButton.module.css"
import { Link } from "react-router-dom"

type LinkButtonProps = {
    to: string;
}

const LinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({ to, children }) => {

    

    return (
        <Link to={to} className={style.btn}>{children}</Link>
    )
}

export default LinkButton;