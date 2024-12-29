import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const FightRoom: React.FC= () => {
    
    
    const id = useParams().id
    const idNumber = id ? parseInt(id): 0; 

    const {data} = useFetch(`/api/Room/rooms/${idNumber}`);

  

  return(
    <div style={{ backgroundImage: `url(/${data?.background})` }}>
    <p>Fight room</p>
    <Link to={`/rooms/${idNumber+1}`}>Pokračovat</Link>
  </div>
  );

}
export default FightRoom;