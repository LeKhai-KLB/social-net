import { Modal as AntModal, ConfigProvider } from "antd";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

export default function Modal({ children, onOk, footer, className, ...args }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            headerBg: "var(--highlight-theme)",
            contentBg: "var(--highlight-theme)",
            footerBg: "var(--highlight-theme)",
            titleColor: "var(--white)",
          },
        },
      }}
    >
      <AntModal
        className={`${styles.modal} ${className ?? ""}`}
        destroyOnClose
        footer={
          footer !== undefined
            ? footer
            : [
                <Button
                  variant={"navigator"}
                  key="submit"
                  onClick={onOk}
                  size={"large"}
                  style={{ minWidth: "68px" }}
                >
                  Ok
                </Button>,
              ]
        }
        cancelButtonProps={null}
        maskClosable={true}
        {...args}
      >
        {children}
      </AntModal>
    </ConfigProvider>
  );
}
