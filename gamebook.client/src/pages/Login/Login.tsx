import style from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/Button/ButtonLB";
type LoginProps = {
    title: string;
}

const Login: React.FC<LoginProps> = ({ title }) => {

    // const [rooms, setRooms] = useState<RoomType | null>(null)
    // const [error, setError] = useState<Error | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try{
    //             const response = await fetch("/api/Room/rooms/1"); //Ta 1 je id místnosti, kterou chceme načíst. To pak se bude měnit v routě, takže místo 1 tam bude proměnná.
    //         if(!response.ok){
    //             throw new Error("Nepodařilo se načíst místnosti")
    //         }
    //         const data = await response.json();
    //         setRooms(data)
    //         }
    //         catch(error){
    //             if(error instanceof Error){
    //                 setError(error)
    //             }else{
    //                 setError(new Error("Něco se pokazilo"))
    //             }
    //         }finally{
    //             setLoading(false)
    //         }
    //     }
    //     fetchData();
    // }, []);

   
    return (
        
        <div className={style.login__screen}>
            
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form}>
                    <Input placeholder="Uživatelské jméno/Email" />
                    <Input placeholder="Heslo"/>
                </form>
                <Button btnText="Přihlásit se" ></Button>
            </div>
            
        </div>
    )
    
}

export default Login;

