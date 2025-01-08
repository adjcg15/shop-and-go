import Image from "next/image";
import { FC } from "react";

type ErrorBannerProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  message: string;
};

export const ErrorBanner: FC<ErrorBannerProps> = ({ image, title, message }) => {
  return (
    <section className="w-full max-w-sm text-center mx-auto mt-20">
      <div className="relative h-40">
        <Image
          fill
          src={image.src}
          alt={image.alt}
          className="object-contain"
        />
      </div>
      <p className="mt-5 text-2xl font-bold">{title}</p>
      <p className="col-span-3 mt-2">
        {message}
      </p>
    </section>
  );
}
