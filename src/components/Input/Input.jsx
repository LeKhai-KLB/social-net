import { Input as AntInput } from "antd";
import { forwardRef } from "react";
import styles from "./Input.module.css";

const variantStyleMapping = {
  sink: styles.input__sink,
};

const Input = forwardRef(({ variant, ...args }, ref) => {
  return (
    <AntInput
      className={`${styles.input ?? ""} ${variantStyleMapping[variant] ?? ""}`}
      variant={variant}
      autoComplete="off"
      {...args}
      ref={ref}
    />
  );
});

export default Input;
