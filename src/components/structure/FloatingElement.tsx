"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FloatingElementProps {
  children: ReactNode;
}

export const FloatingElement: FC<FloatingElementProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
      children, 
      document.body
    )
    : null
}