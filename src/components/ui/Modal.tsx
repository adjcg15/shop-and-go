"use client";
import { FC, ReactNode, useMemo } from "react";
import { FloatingElement } from "../structure/FloatingElement";
import { IoClose } from "react-icons/io5";
import { IconButton } from "../buttons/IconButton";
import { ModalSizes } from "@/types/enums/modals";

interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children?: ReactNode;
  size?: ModalSizes
};

export const Modal: FC<ModalProps> = ({ handleCloseModal, isOpen, children, size = ModalSizes.MEDIUM }) => {
  const visibilityStyle = isOpen ? "visible bg-blue-950" : "invisible";
  const positionStyle = isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0";
  const modalSize = useMemo(() => {
    const sizes = {
      [ModalSizes.SMALL]: "max-w-[350px]",
      [ModalSizes.MEDIUM]: "max-w-[500px]",
      [ModalSizes.LARGE]: "max-w-[650px]"
    }

    return sizes[size];
  }, [size]);

  return (
    <FloatingElement>
      <div className={`size-full overflow-hidden fixed top-0 left-0 bg-opacity-30 transition-colors z-30 px-3 ${visibilityStyle}`} role="dialog" tabIndex={isOpen ? 0 : -1}>
        <article className={`m-3 mt-[calc(50vh+0.1rem)] -translate-y-1/2 mx-auto max-h-[calc(100vh-3rem)] flex flex-col bg-white rounded-lg relative transition-all ${positionStyle} ${modalSize}`}>
          <header className="flex items-center justify-end pt-[5px] pr-[5px]">
            <IconButton
              className="bg-white hover:bg-gray-50 p-2"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <IoClose className="text-gray-800" />
            </IconButton>
          </header>

          <main className="overflow-y-auto px-6 md:px-10 hide-scrollbar">
            {children}
          </main>

          <footer className="h-6 md:h-10"></footer>
        </article>
      </div>
    </FloatingElement>
  );
}