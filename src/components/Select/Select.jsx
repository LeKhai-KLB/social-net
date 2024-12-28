import { Select as AntSelect } from "antd";
import { forwardRef } from "react";
import styles from "./Select.module.css";

const Select = forwardRef(({ className, transparent, ...args }, ref) => {
  return (
    <AntSelect
      className={`${styles.select} ${transparent ? styles.select_transparent : ""} ${className ?? ""}`}
      ref={ref}
      dropdownRender={(menu) => {
        return (
          <div
            className={`${styles.options} ${transparent ? styles.options_transparent : ""}`}
          >
            {menu}
          </div>
        );
      }}
      {...args}
    />
  );
});

export default Select;
