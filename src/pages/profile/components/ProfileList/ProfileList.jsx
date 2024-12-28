import { Card, Drawer, Flex, List, Popover } from "antd";
import styles from "./ProfileList.module.css";
import Avatar from "../../../../components/Avatar/Avatar";
import Label from "../../../../components/Label/Label";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import Button from "../../../../components/Button/Button";
import { createSearchParams, useNavigate } from "react-router";

const defauProfileList = [
  {
    profile_id: "1234562",
    profile_name: "Nguyễn Văn A",
    date_of_birth: 1734224600000,
    gender: "Nam",
    address: "Hà Nội, Việt Nam",
    email: "nguyenvana@example.com",
    phone_number: "0901234567",
    profile_url: "https://facebook.com/nguyenvana",
    education: "Đại học XYZ",
    work: "Quản lý dự án tại Công ty ABC",
    avatar: "https://i.pravatar.cc/301",
  },
  {
    profile_id: "1234567",
    profile_name: "Nguyễn Văn B",
    date_of_birth: 1734224600000,
    gender: "Nam",
    address: "Hà Nội, Việt Nam",
    email: "nguyenvana@example.com",
    phone_number: "0901234567",
    profile_url: "https://facebook.com/nguyenvana",
    education: "Đại học XYZ",
    work: "Quản lý dự án tại Công ty ABC",
    avatar: "https://i.pravatar.cc/302",
  },
  {
    profile_id: "1234568",
    profile_name: "Nguyễn Văn C",
    date_of_birth: 1734224600000,
    gender: "Nam",
    address: "Hà Nội, Việt Nam",
    email: "nguyenvana@example.com",
    phone_number: "0901234567",
    profile_url: "https://facebook.com/nguyenvana",
    education: "Đại học XYZ",
    work: "Quản lý dự án tại Công ty ABC",
    avatar: "https://i.pravatar.cc/303",
  },
  {
    profile_id: "1234569",
    profile_name: "Nguyễn Văn D",
    date_of_birth: 1734224600000,
    gender: "Nam",
    address: "Hà Nội, Việt Nam",
    email: "nguyenvana@example.com",
    phone_number: "0901234567",
    profile_url: "https://facebook.com/nguyenvana",
    education: "Đại học XYZ",
    work: "Quản lý dự án tại Công ty ABC",
    avatar: "https://i.pravatar.cc/304",
  },
];
const ProfileCard = ({ profile, onClick, style }) => {
  return (
    <Card style={style} onClick={onClick} className={styles.profile_card}>
      <Flex justify="center" align="center">
        <Avatar
          size="massive"
          src={profile.avatar}
          secondSrc={profile.second_avatar}
        />
      </Flex>
      <Popover content={profile.profile_name} color="var(--deep-theme)">
        <Meta
          className={styles.profile_meta}
          title={<span>{profile.profile_name}</span>}
          description={<span>{profile.work ?? profile.education}</span>}
        />
      </Popover>
    </Card>
  );
};

const ProfileDrawer = ({ profile, open, onClose, onAction }) => {
  const renderDescription = (info) => {
    const decs = [];
    if (info.work) {
      decs.push(info.work);
    }
    if (info.education) {
      decs.push(info.education);
    }

    return decs.join(" | ");
  };

  const renderInfo = (info, pick) => {
    return (
      <>
        {pick
          ?.filter(([key]) => info?.[key])
          .map(([key, title, render]) => {
            return (
              <div
                style={{ marginBottom: "24px", fontSize: "16px" }}
                key={`profile-detail-key-${key}`}
              >
                <Label style={{ marginBottom: "2px", fontSize: "14px" }}>
                  {title.toUpperCase()}
                </Label>
                <span>{render ? render(info?.[key]) : info?.[key]}</span>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <Drawer
      className={styles.profile_drawer}
      title={null}
      open={open}
      onClose={onClose}
      footer={
        <Flex style={{ paddingTop: "16px" }}>
          <Button
            variant="navigator"
            onClick={onAction}
            size="small"
            style={{ width: "100%" }}
          >
            View activities
          </Button>
        </Flex>
      }
    >
      <ProfileCard
        style={{
          borderBottom: "1px solid var(--divider",
          borderRadius: 0,
          marginBottom: "28px",
        }}
        profile={{
          ...profile,
          work: renderDescription(profile),
        }}
      />
      {renderInfo(profile, [
        ["profile_id", "Identity"],
        ["email", "Email"],
        ["phone_number", "Phone"],
        ["profile_url", "Link"],
        [
          "date_of_birth",
          "Date of birth",
          (timestamp) => {
            if (!timestamp) {
              return "N/A";
            }
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          },
        ],
        ["gender", "Gender"],
        ["address", "Address"],
      ])}
    </Drawer>
  );
};

export default function ProfileList({ profileList, loading }) {
  const [choosenProfile, setChoosenProfile] = useState();
  const nav = useNavigate();

  const handleClickProfileCard = (profile) => {
    setChoosenProfile(profile);
  };

  const handleCloseDrawer = () => {
    setChoosenProfile(undefined);
  };

  const handleOnAction = () => {
    nav({
      pathname: "/activity",
      search: `${createSearchParams({
        profile: choosenProfile.profile_id,
      })}`,
    });
  };

  return (
    <>
      <List
        loading={loading}
        className={styles.profile_list}
        grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, column: 4 }}
        dataSource={profileList ?? defauProfileList}
        renderItem={(profile) => (
          <List.Item
            key={`profile-${profile.profile_id}`}
            style={{ marginBottom: "24px" }}
          >
            <ProfileCard
              style={
                choosenProfile?.profile_id === profile.profile_id
                  ? { border: "1px solid var(--light-blue)" }
                  : {}
              }
              onClick={() => handleClickProfileCard(profile)}
              profile={profile}
            />
          </List.Item>
        )}
      />
      <ProfileDrawer
        open={choosenProfile !== undefined}
        profile={choosenProfile ?? {}}
        onClose={handleCloseDrawer}
        onAction={handleOnAction}
      />
    </>
  );
}
