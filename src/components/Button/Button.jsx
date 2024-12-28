import { Button as AntButton } from "antd";
import styles from "./Button.module.css";

const variantClassMapping = {
  functional: styles.button__functional,
  navigator: styles.button__navigator,
};

const sizeClassMapping = {
  large: styles.button__size_large,
  medium: styles.button__size_medium,
};

export default function Button({ variant, size, children, ...args }) {
  return (
    <AntButton
      className={`${styles.button} ${variantClassMapping[variant ?? "functional"]} ${sizeClassMapping[size ?? "large"]}`}
      {...args}
    >
      {children}
    </AntButton>
  );
}
