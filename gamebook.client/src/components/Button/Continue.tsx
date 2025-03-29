
import { PropsWithChildren } from "react";
type ContinueProps = {
    route?: string;
}

const Continue :React.FC<PropsWithChildren<ContinueProps>> = ({children,route}) => {


    /*
        podle typu se určí kam se má uživatel přesměrovat
        načte další data z api
    */



    return(
        <a href={route} >{children}</a>
    )
}

export default Continue;