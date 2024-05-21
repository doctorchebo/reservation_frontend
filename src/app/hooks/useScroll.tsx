"use client";
import { useEffect, useState } from "react";

const useScroll = () => {
  const [lastPosition, setLastPosition] = useState(0);
  useEffect(() => {
    setLastPosition(window.scrollY);
  }, []);

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      let currentPosition = window.scrollY;
      console.log("lastPosition", lastPosition);
      console.log("currentPosition", currentPosition);
      if (currentPosition > lastPosition) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastPosition]);

  return { visible };
};

export default useScroll;
