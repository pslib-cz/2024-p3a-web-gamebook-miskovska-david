
import { PropsWithChildren } from "react";
type ContinueProps = {
    roomId: number;
    type: string | undefined;
}

const Continue :React.FC<PropsWithChildren<ContinueProps>> = ({children, roomId, type="dialog"}) => {


    /*
        podle typu se určí kam se má uživatel přesměrovat
        načte další data z api
    */

    const SetRoute = (type: string): string => {

        let route = ""
        if(roomId === 12){
            route = "/city-cross/"
        }
        if(roomId === 11){
            route = "/city-cross"
        }
        else if(type === "dialog"){
            route = "/rooms/" + roomId
        }else if(type === "fight"){
            route = "/fight/" + roomId
        }else if(type === "text"){
            route = "/room-with-text/" + roomId
        }

        return route
    }

    return(
        <a href={SetRoute(type)} >{children}</a>
    )
}

export default Continue;