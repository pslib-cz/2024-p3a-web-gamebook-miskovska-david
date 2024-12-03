import style from "./Login.module.css";

type LoginProps = {
    title: string;
    placeholder: string;
    btnText: string;
    placeholder2: string;
}

const Login: React.FC<LoginProps> = ({title, placeholder, btnText, placeholder2}) =>{
    return (
        <div className={style.login__screen}>
            <div className={style.login__container}>
                <h2>{title}</h2>
                <form className={style.login__form}>
                    <input type="text" placeholder={placeholder} className={style.login__input}></input>
                    <input type="text" placeholder={placeholder2} className={style.login__input}></input>
                </form>
                <button className={style.login__btn}>{btnText}</button>
            </div>
        </div>
    )
}
export default Login;