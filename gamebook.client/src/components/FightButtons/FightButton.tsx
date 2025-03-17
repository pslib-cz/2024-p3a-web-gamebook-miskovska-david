import classes from "./FightButton.module.css";

type FightButtonProps = {
    top: number;
    left: number;
    path: string;
    OnClick?: () => void;
}

const FightButton: React.FC<FightButtonProps> = ({top, left, path, OnClick}) => {
  return (
    <button style={{top: top, left: left}} className={classes.btn}><img className={classes.btn__img} src={path} onClick={OnClick}/></button>
  );
}

export default FightButton;