import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(styles.button, {
        className,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
