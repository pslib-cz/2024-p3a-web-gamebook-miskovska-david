import style from "./Login.module.css";

const Home = () =>{
    return (
        <div className={style.login__screen}>
            <div className={style.login__container}>
                <h2>Přihlásit se</h2>
                <form className={style.login__form}>
                    <input type="text" placeholder="Uživatelské jméno / Email" className={style.login__input}></input>
                    <input type="text" placeholder="Heslo" className={style.login__input}></input>
                </form>
                <button className={style.login__btn}>Přihlásit se</button>
            </div>
        </div>
    )
}
export default Home;