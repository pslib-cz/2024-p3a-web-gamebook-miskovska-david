
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
type ContinueProps = {
    roomId: string;
    type: string;
}

const Continue :React.FC<PropsWithChildren<ContinueProps>> = ({children, roomId, type}) => {


    const SetRoute = (type: string): string => {
        let route=""
        if(type === "rooms"){
            route = "/rooms/" + roomId
        }else if(type === "fight"){
            route = "/fight/" + roomId
        }else if(type === "text"){
            route = "/room-with-text/" + roomId
        }

        return route
    }

    return(
        <Link to={SetRoute(type) + roomId} >{children}</Link>
    )
}

export default Continue;