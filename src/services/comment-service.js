import { useQuery } from "react-query";
import request from "./request";
import { getAvatarUrlFromId } from "../utils";

export const useFetchCommentList = ({ postId, sentiment }, options) => {
  return useQuery(
    ["query-comment-list", postId, sentiment],
    async () => {
      const endpoint = `comments/post/${postId}/comments`;
      const rs = await request.get(endpoint, {
        params: { sentiment },
        validateStatus: () => true,
      });
      const commentList = rs.data ?? [];

      commentList.forEach((comment) => {
        comment.likes = comment.like_count;
        comment.timestamp = comment.created_time;
        comment.profile_id = comment.author_id;
        comment.profile_name = comment.author_name;
        comment.author_avatar = getAvatarUrlFromId(comment.profile_id);

        delete comment.like_count;
        delete comment.created_time;
        delete comment.author_id;
        delete comment.author_name;
      });

      return commentList.reverse();
    },
    options,
  );
};
