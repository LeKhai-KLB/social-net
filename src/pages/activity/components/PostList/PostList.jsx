import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./PostList.module.css";
import { Card, Carousel, Flex, Image, List, Space, Typography } from "antd";
import Avatar from "../../../../components/Avatar/Avatar";
import Label from "../../../../components/Label/Label";
import { formatTimestamp } from "../../../../utils";
import {
  CommentOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import Select from "../../../../components/Select/Select";
import { useFetchCommentList } from "../../../../services/comment-service";

const defaultPostList = [
  {
    post_id: "12345678900",
    profile_name: "Nguyễn Văn A",
    profile_id: "1234562",
    author_avatar: "https://i.pravatar.cc/301",
    content:
      "Chào các bạn! Hôm nay tôi tham gia một hội thảo thú vị về công nghệ AI. Rất nhiều kiến thức bổ ích! Chào các bạn! Hôm nay tôi tham gia một hội thảo thú vị về công nghệ AI. Rất nhiều kiến thức bổ ích! Chào các bạn! Hôm nay tôi tham gia một hội thảo thú vị về công nghệ AI. Rất nhiều kiến thức bổ ích! Chào các bạn! Hôm nay tôi tham gia một hội thảo thú vị về công nghệ AI. Rất nhiều kiến thức bổ ích!",
    image: ["https://i.pravatar.cc/306", "https://i.pravatar.cc/307"],
    timestamp: 1734924600000,
    likes: 120,
    comments: 10,
    shares: 15,
  },
  {
    post_id: "1234567891",
    profile_id: "1234567",
    profile_name: "Nguyễn Văn B",
    author_avatar: "https://i.pravatar.cc/302",
    content:
      "Đã hoàn thành dự án XYZ với nhóm. Cảm ơn mọi người đã cùng nhau làm việc hết sức!",
    image: [],
    timestamp: 1734924600000,
    likes: 300,
    comments: 10,
    shares: 25,
  },
  {
    post_id: "1234567892",
    profile_id: "1234568",
    profile_name: "Nguyễn Văn C",
    author_avatar: "https://i.pravatar.cc/303",
    content:
      "Ngày mai đi du lịch Sapa, mong chờ chuyến đi này quá! Ai đã từng đi rồi cho mình lời khuyên với!",
    image: ["https://i.pravatar.cc/300", "https://i.pravatar.cc/300"],
    timestamp: 1734924600000,
    likes: 150,
    comments: 10,
    shares: 5,
  },
  {
    post_id: "1234567893",
    profile_id: "1234569",
    profile_name: "Nguyễn Văn D",
    author_avatar: "https://i.pravatar.cc/304",
    content:
      "Chúc mừng sinh nhật tôi! Cảm ơn mọi người đã gửi lời chúc tốt đẹp!",
    image: [],
    timestamp: 1734924600000,
    likes: 500,
    comments: 10,
    shares: 45,
  },
];

const defaultCommentList = [
  {
    post_id: "1234567890",
    profile_id: "123456",
    profile_name: "Nguyễn Văn A",
    author_avatar: "https://i.pravatar.cc/323",
    content:
      "Chào các bạn! Hôm nay tôi tham gia một hội thảo thú vị về công nghệ AI. Rất nhiều kiến thức bổ ích!",
    timestamp: 1703334600000,
    likes: 120,
    sentiment: 0,
  },
  {
    post_id: "1234567891",
    profile_id: "123457",
    profile_name: "Nguyễn Văn B",
    author_avatar: "https://i.pravatar.cc/324",
    content:
      "Đã hoàn thành dự án XYZ với nhóm. Cảm ơn mọi người đã cùng nhau làm việc hết sức!",
    timestamp: 1703082300000,
    likes: 300,
    sentiment: 1,
  },
  {
    post_id: "1234567892",
    profile_id: "123458",
    profile_name: "Nguyễn Văn C",
    author_avatar: "https://i.pravatar.cc/325",
    content:
      "Ngày mai đi du lịch Sapa, mong chờ chuyến đi này quá! Ai đã từng đi rồi cho mình lời khuyên với!",
    timestamp: 1703034000000,
    likes: 150,
    sentiment: 2,
  },
];

const sentimentMap = {
  0: "Negative",
  1: "Neutral",
  2: "Positive",
};

const sentimentColor = {
  0: "var(--red) !important",
  1: "var(--label) !important",
  2: "var(--light-blue) !important",
};

const PostCard = ({
  post,
  onClickViewDetail,
  viewDetail = true,
  resolveMeta,
}) => {
  const handleClickViewDetail = () => {
    onClickViewDetail && onClickViewDetail();
  };

  const card = (
    <Card className={styles.post_card}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={post.author_avatar}
            secondSrc={`${post.author_avatar}-second`}
          />
        }
        title={post.profile_name}
        description={
          <Label style={{ fontSize: "12px" }}>
            {formatTimestamp(post.timestamp)}
          </Label>
        }
      />
      {viewDetail && (
        <div className={styles.post__card__view}>
          <Button
            onClick={handleClickViewDetail}
            variant={"text"}
            icon={<EyeOutlined />}
          />
        </div>
      )}
      <Typography.Paragraph
        style={{ marginTop: "12px" }}
        ellipsis={{
          rows: 2,
          expandable: "collapsible",
        }}
      >
        {post.content}
      </Typography.Paragraph>
      {post.image?.length > 0 && (
        <Carousel style={{ marginBottom: "14px" }}>
          {post.image.map((image, index) => (
            <Image
              key={`image-post-${post.post_id} ${index}`}
              src={image}
              alt=""
              width={"100%"}
            />
          ))}
        </Carousel>
      )}
      <Flex gap={16} style={{ fontSize: "14px", color: "var(--label)" }}>
        <span>
          <LikeOutlined style={{ marginRight: "8px" }}></LikeOutlined>
          {post.likes ?? 0}
        </span>
        <span>
          <ShareAltOutlined style={{ marginRight: "8px" }}></ShareAltOutlined>
          {post.shares ?? 0}
        </span>
        <span>
          <CommentOutlined style={{ marginRight: "8px" }} />
          {post.comments ?? 0}
        </span>
      </Flex>
    </Card>
  );

  return resolveMeta ? (
    <List
      className={styles.post_list}
      grid={{ column: 1 }}
      style={{ width: "100%" }}
      dataSource={[post]}
      renderItem={(item) => (
        <List.Item
          key={`resolve-meta-post-${item.post_id}`}
          style={{ marginBottom: "24px", width: "100%" }}
        >
          {card}
        </List.Item>
      )}
    ></List>
  ) : (
    card
  );
};

const CommentCard = ({ comment }) => {
  return (
    <Flex style={{ marginBottom: "32px", maxWidth: "100%" }}>
      <div style={{ width: "32px" }}>
        <Avatar
          src={comment.author_avatar}
          secondSrc={`${comment.author_avatar}-second`}
          size={30}
        />
      </div>
      <div
        style={{
          marginLeft: "16px",
          background: "var(--overlay-theme)",
          padding: "16px",
          borderRadius: "8px",
          boxSizing: "border-box !important",
        }}
      >
        <div>
          <Flex justify="space-between" align="center" gap="16px">
            <strong>{comment.profile_name}</strong>
            <Label
              style={{
                fontSize: "12px",
                color: sentimentColor[comment?.sentiment ?? 1],
              }}
            >
              {comment?.sentiment !== undefined
                ? sentimentMap[comment.sentiment]
                : "Neutral"}
            </Label>
          </Flex>
          <Label style={{ fontSize: "12px" }}>
            {`${formatTimestamp(comment.timestamp)}`}
          </Label>
        </div>
        <div style={{ marginTop: "8px" }}>{comment.content}</div>
      </div>
    </Flex>
  );
};

export const PostModal = forwardRef(({ post, onClose }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sentiment, setSentiment] = useState();
  const { data: commentList, isLoading } = useFetchCommentList({
    postId: post?.post_id,
    sentiment,
  });

  const handleChangeSentiment = (val) => {
    setSentiment(val);
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
    };
  }, []);

  const handleOnclose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  return (
    <Modal
      className={styles.post_modal}
      width={720}
      open={isOpen}
      title={null}
      footer={null}
      onCancel={handleOnclose}
    >
      <PostCard post={post} viewDetail={false} resolveMeta />
      <div
        style={{
          borderBottom: "1px solid var(--divider)",
          marginBottom: "8px",
        }}
      />
      <Flex justify="right">
        <Select
          allowClear
          style={{ width: "160px" }}
          placeholder="Filter sentiment"
          transparent
          onChange={handleChangeSentiment}
          options={[
            {
              label: "Negative",
              value: 0,
            },
            {
              label: "Neutral",
              value: 1,
            },
            {
              label: "Positive",
              value: 2,
            },
          ]}
        />
      </Flex>
      <List
        loading={isLoading}
        className={styles.comment_list}
        grid={{ column: 1 }}
        dataSource={commentList ?? defaultCommentList}
        renderItem={(comment) => (
          <List.Item
            key={`comment-${comment.post_id}-${comment.comment_id}-${comment.author_id}`}
          >
            <CommentCard comment={comment} />
          </List.Item>
        )}
      />
    </Modal>
  );
});

export default function PostList({ postList, loading }) {
  const [choosenPost, setChoosenPost] = useState();
  const modalRef = useRef();

  const handleClickViewPostDetail = (post) => {
    setChoosenPost(post);
    modalRef.current.openModal();
  };

  const handleOnCloseModal = () => {
    setChoosenPost(undefined);
  };

  return (
    <>
      <List
        loading={loading}
        className={styles.post_list}
        grid={{ gutter: 24, column: 1 }}
        dataSource={postList ?? defaultPostList}
        renderItem={(post) => (
          <List.Item
            className={styles.post_list_item}
            key={`post-${post.post_id}`}
            style={{ marginBottom: "24px" }}
          >
            <PostCard
              post={post}
              onClickViewDetail={() => handleClickViewPostDetail(post)}
            />
          </List.Item>
        )}
      ></List>
      <PostModal
        ref={modalRef}
        post={choosenPost}
        onClose={handleOnCloseModal}
      />
    </>
  );
}
