import classes from "./FightButton.module.css";

type FightButtonProps = {
    top: number;
    left: number;
    path: string;
}

const FightButton: React.FC<FightButtonProps> = ({top, left, path}) => {
  return (
    <button style={{top: top, left: left}} className={classes.btn}><img className={classes.btn__img} src={path}/></button>
  );
}

export default FightButton;