import { useMutation, useQuery } from "react-query";
import request from "./request";
import { getAvatarUrlFromId } from "../utils";

export const useFetchProfileList = (options) => {
  return useQuery(
    ["query-profile-list"],
    async () => {
      const rs = await request.get("/profiles/", {
        validateStatus: () => true,
      });
      const profileList = rs.data?.data ?? [];

      profileList.forEach((profile) => {
        if (
          typeof profile.date_of_birth === "string" &&
          /^\d+$/.test(profile.date_of_birth)
        ) {
          profile.date_of_birth = +new Date(Number(profile.date_of_birth));
        }
        profile.second_avatar = profile.avatar;
        profile.avatar = getAvatarUrlFromId(profile.profile_id);
      });

      return profileList.reverse();
    },
    options,
  );
};

export const useCreateProfile = (options) => {
  return useMutation(async (profileInfo) => {
    profileInfo.platform = "facebook";
    if (typeof profileInfo.date_of_birth === "number") {
      profileInfo.date_of_birth = String(profileInfo.date_of_birth);
    }
    await request.post("/profiles/", profileInfo);
  }, options);
};
