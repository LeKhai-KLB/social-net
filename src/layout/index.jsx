import { useState } from "react";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import styles from "./index.module.css";
import { Content, Header } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router";
import Input from "../components/Input/Input";

const menuItems = [
  {
    key: "profile",
    initClassName: styles.layout__ic_profile,
    label: "Profile",
  },
  {
    key: "activity",
    initClassName: styles.layout__ic_activity,
    label: "Activity",
  },
];

const navLinkMapping = {
  profile: "profile",
  activity: "activity",
};

export default function MainLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();

  const handleClickMenuTab = ({ key }) => {
    nav(navLinkMapping[key]);
  };

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/activity":
        return ["activity"];
      case "/profile":
        return ["profile"];
      default:
        return ["profile"];
    }
  };

  return (
    <Layout className={styles.layout} style={{ height: "100vh" }}>
      <Sider
        className={styles.layout__sider}
        width="250px"
        collapsedWidth="90px"
        collapsible
        breakpoint="md"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className={`${styles.layout__logo_container} ${!collapsed ? styles.layout__logo_container__no_collapse : ""}`}
        >
          <div className={styles.layout__logo_img}>
            <div className={styles.layout__logo_sub_img} />
          </div>
          {!collapsed && (
            <span className={styles.layout__logo_label}>Social net</span>
          )}
        </div>
        <Menu
          theme="dark"
          className={styles.layout__menu}
          selectedKeys={getActiveTab()}
          mode="inline"
          items={menuItems.map((menuItem) => {
            menuItem.icon = (
              <div
                className={`${menuItem.initClassName} ${collapsed ? styles.layout__ic_menu__collapsed : ""}`}
              />
            );
            return {
              key: menuItem.key,
              label: menuItem.label,
              icon: menuItem.icon,
            };
          })}
          onClick={handleClickMenuTab}
        />
      </Sider>
      <Layout>
        <Header className={styles.layout__header}>
          <Input
            prefix={<div className={styles.layout__header_input_icon} />}
            color="var(--white)"
            placeholder="Search..."
            variant="borderless"
          />
        </Header>
        <Content className={styles.layout__content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
