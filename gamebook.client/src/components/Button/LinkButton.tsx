import { PropsWithChildren } from "react";
import style from "./LinkButton.module.css"
import { Link } from "react-router-dom"

type LinkButtonProps = {
    to: string;
}

const LinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({ to, children }) => {

    /*const SetRoute = (to: string, roomId: string): string => {
        let route=""
        if(to === "rooms"){
            route = "/rooms/" + roomId
        }else if(to === "fight"){
            route = "/fight/" + roomId
        }else if(to === "text"){
            route = "/room-with-text/" + roomId
        }

        return route
    }*/

    return (
        <Link to={to} className={style.btn}>{children}</Link>
    )
}

export default LinkButton;