import { ConfigProvider, Flex, Layout, Typography, Space } from "antd";
import styles from "./index.module.css";
import useParamState from "../../hooks/useParamState";
import Select from "../../components/Select/Select";
import PostList from "./components/PostList/PostList";
import { useFetchPostList } from "../../services/post-service";
import { useFetchProfileList } from "../../services/profile-service";

const defauOptions = [
  {
    value: "1234562",
    label: "Nguyễn Văn A",
  },
  {
    value: "1234567",
    label: "Nguyễn Văn B",
  },
  {
    value: "1234568",
    label: "Nguyễn Văn C",
  },
  {
    value: "1234569",
    label: "Nguyễn Văn D",
  },
];

export default function ActivityPage() {
  const [profileId, setProfileId] = useParamState({ key: "profile" });
  const { data: postList, isLoading } = useFetchPostList(profileId);
  const { data: profileList, isLoading: isLoadingProfileList } =
    useFetchProfileList();

  const handleChangeSelect = (id) => {
    setProfileId(id);
  };

  return (
    <ConfigProvider theme={{ token: { colorText: "var(--white)" } }}>
      <Layout className={styles.activity_page}>
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
            <Typography.Title className={styles.activity_page__title} level={3}>
              Activity
            </Typography.Title>
            <Select
              allowClear
              style={{ width: "160px" }}
              defaultValue={profileId}
              placeholder="Filter profile"
              onChange={handleChangeSelect}
              options={
                (profileList ?? []).map((profile) => {
                  return {
                    value: profile.profile_id,
                    label: profile.profile_name,
                  };
                }) ?? defauOptions
              }
            />
          </Flex>
          <div style={{ height: "100%", overflow: "auto" }}>
            <PostList postList={postList} loading={isLoading} />
          </div>
        </Flex>
      </Layout>
    </ConfigProvider>
  );
}
