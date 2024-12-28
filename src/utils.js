import { toast } from "react-toastify";

export function formatTimestamp(timestamp) {
  try {
    const date = new Date(timestamp);

    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(",", "");
  } catch {
    return "N/A";
  }
}

export function getAvatarUrlFromId(id) {
  return `http://graph.facebook.com/${id}/picture?type=large`;
}

export function displayErrorMessage(errorMsg) {
  return toast.error(errorMsg);
}

export function displaySuccessMessage(successMsg) {
  return toast.success(successMsg);
}
