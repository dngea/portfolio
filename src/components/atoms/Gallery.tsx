import * as React from "react";
import { Image } from "astro:assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery({
  images,
  hasMobile,
}: {
  images: string[];
  hasMobile: boolean;
}) {
  const config = {
    3: "basis-1/2 lg:basis-1/3",
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="">
        {images.map((image, index) => {
          const mobileImageArray = image.split(".");
          mobileImageArray.splice(1, 0, "-800");
          const mobileImage = hasMobile
            ? `${mobileImageArray[0]}${mobileImageArray[1]}.${mobileImageArray[2]}`
            : image;

          return (
            <CarouselItem
              key={index}
              className="bg-light flex basis-[90%] items-center justify-center sm:basis-full"
            >
              <figure className="flex aspect-4/3 h-full w-full items-center justify-between overflow-hidden rounded-xl sm:aspect-video">
                <img
                  src={mobileImage}
                  alt="todo"
                  className="rounded-xl object-cover sm:hidden"
                />
                <img
                  src={image}
                  alt="todo"
                  className="hidden h-full w-full rounded-xl object-cover sm:block"
                />
              </figure>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
