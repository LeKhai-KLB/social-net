import { useQuery } from "react-query";
import request from "./request";
import { getAvatarUrlFromId } from "../utils";

export const useFetchPostList = (profileId, options) => {
  return useQuery(
    ["query-post-list", profileId ?? ""],
    async () => {
      let endpoint = "/posts/";
      if (profileId) {
        endpoint = `/posts/profile/${profileId}/posts`;
      }
      const rs = await request.get(endpoint, {
        validateStatus: () => true,
      });
      const postList = rs.data ?? [];

      postList.forEach((post) => {
        post.likes = post.like_count;
        post.comments = post.comment_count;
        post.shares = post.share_count;
        post.timestamp = post.created_time;
        post.image = post.images;
        post.profile_id = post.author_id;
        post.profile_name = post.author_name;
        post.author_avatar = getAvatarUrlFromId(post.profile_id);

        delete post.like_count;
        delete post.comment_count;
        delete post.share_count;
        delete post.created_time;
        delete post.images;
        delete post.author_id;
        delete post.author_name;
      });

      return postList.reverse();
    },
    options,
  );
};
