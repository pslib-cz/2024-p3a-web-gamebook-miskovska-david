import style from "./Register.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


type RegisterProps = {
  title: string;
};

const Register: React.FC<RegisterProps> = ({ title }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confrimPassword, setConfirmPassword] = useState<string>("");
  const [incorectPassword, setIncorectPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  /*
    Funkce pro odeslání formuláře
    Spustí funkci CheckPassword
    Pokud jsou shodná, pošle data na server
  */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (CheckPassword(password, confrimPassword)) {
        const data = { username, email, password};
      fetch("/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(response => {
        if (response.status === 201 || response.status === 200) {
          navigate("/login");
        } else {
          console.log("Chyba");
      }
      });

      }
  };

  /*
    Funkce pro kontrolu shody hesel
    Spustí se po odeslání formuláře
    Pokud se hesla neshodují, zobrazí se chybová hláška
  */
  const CheckPassword = (password: string, password2: string) => {
    if (password === password2) {
        setIncorectPassword(false);
      return true;
    }
    setIncorectPassword(true);
    return false;
    
  };

  return (
    <div className={style.register__screen}>
      <div className={style.register__container}>
        <h2>{title}</h2>
        <form className={style.register__form} onSubmit={handleSubmit}>
          <Input 
          placeholder="Uživatelské jméno" 
          onDataSend={setUsername} />
          <Input 
            placeholder="Email" 
            onDataSend={setEmail} 
            inputType="email"
            />

          <Input 
            placeholder="Heslo" 
            onDataSend={setPassword} 
            inputType="password"
            />
          <Input
            placeholder="Zopakovat heslo"
            onDataSend={setConfirmPassword}
            inputType="password"
          />
          {incorectPassword && 
            <p className={style.text__warning}><FiAlertCircle />Hesla se neshodují</p>
          }
          <button type="submit" className={style.register__button}>
            Registrovat
          </button>
        </form>

        <p className={style.text}>
          Už máte účet? <Link to="/login">Přihlásit se</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
