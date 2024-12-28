import { Avatar as AntAvatar } from "antd";
import { useEffect, useRef, useState } from "react";
import defaultAvatarImg from "../../assets/images/3815f5f0-edce-4963-8f7b-17e0093de5d2.png";
import styles from "./Avatar.module.css";

const defaultPath = defaultAvatarImg;

const sizeStyleMapping = {
  extraLarge: styles.avatar__extra_large,
  massive: styles.avatar__massive,
};

export default function Avatar({ src, className, size, secondSrc, ...args }) {
  const [srcList, setSrcList] = useState([src, secondSrc, defaultPath]);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const avatarRef = useRef();

  const handleOnError = () => {
    if (currentSrcIndex <= srcList.length - 1) {
      setCurrentSrcIndex(currentSrcIndex + 1);
    }
  };

  useEffect(() => {
    if (!src && !secondSrc) {
      setCurrentSrcIndex(2);
      return;
    }
    const arr = [srcList?.[0], srcList?.[1], defaultPath];
    if (src) {
      arr[0] = src;
    }
    if (secondSrc) {
      arr[1] = secondSrc;
    }
    if (JSON.stringify(arr) !== JSON.stringify(srcList)) {
      setCurrentSrcIndex(0);
      setSrcList(arr);
    }
  }, [src, secondSrc]);

  return (
    <AntAvatar
      {...args}
      ref={avatarRef}
      size={size}
      className={`${styles.avatar} ${className ?? ""} ${sizeStyleMapping[size] ?? ""}`}
      src={srcList[currentSrcIndex]}
      onError={handleOnError}
    />
  );
}
