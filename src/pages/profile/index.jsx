import { ConfigProvider, Flex, Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import Button from "../../components/Button/Button";
import CreateProfileModal from "./components/CreateProfileModal/CreateProfileModal";
import { useRef, useState } from "react";
import ProfileList from "./components/ProfileList/ProfileList";
import {
  useCreateProfile,
  useFetchProfileList,
} from "../../services/profile-service";
import { displayErrorMessage, displaySuccessMessage } from "../../utils";

export default function ProfilePage() {
  const { data: profileList, isLoading, refetch } = useFetchProfileList();
  const { mutateAsync: createProfile, loading: isLoadingCreating } =
    useCreateProfile({
      onSuccess: (rs) => {
        handleOnCreateProfileSuccess();
      },
      onError: (rs) => {
        displayErrorMessage("Create profile failed");
      },
    });
  const createModalRef = useRef();

  const handleConfirmCreateProfile = (profileInfo) => {
    createProfile(profileInfo);
  };

  const handleOnCreateProfileSuccess = () => {
    refetch();
    createModalRef.current.clear();
    displaySuccessMessage("Create profile success");
  };

  const handleClickAddProfile = () => {
    createModalRef.current.openModal();
  };

  return (
    <ConfigProvider theme={{ token: { colorText: "var(--white)" } }}>
      <Layout className={styles.profile_page}>
        <Flex style={{ height: "100%", flexDirection: "column" }}>
          <Flex
            justify="space-between"
            align="center"
            style={{
              marginBottom: "32px",
              paddingBottom: "8px",
              borderBottom: "1px solid var(--divider)",
            }}
          >
            <Typography.Title className={styles.profile_page__title} level={3}>
              Profile
            </Typography.Title>
            <Button
              icon={<div className={styles.profile_page__ic_plus} />}
              onClick={handleClickAddProfile}
            >
              Add profile
            </Button>
          </Flex>
          <CreateProfileModal
            ref={createModalRef}
            onConfirm={handleConfirmCreateProfile}
            loading={isLoadingCreating}
          />
          <ProfileList profileList={profileList} loading={isLoading} />
        </Flex>
      </Layout>
    </ConfigProvider>
  );
}
