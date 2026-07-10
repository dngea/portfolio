import * as React from "react";
import { Image } from "astro:assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery({ images }: { images: string[] }) {
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
          const mobileImage = `${mobileImageArray[0]}${mobileImageArray[1]}.${mobileImageArray[2]}`;

          return (
            <CarouselItem key={index} className="">
              <figure className="px-1 pt-2 pb-8">
                <img
                  src={mobileImage}
                  alt="todo"
                  className="rounded-xl sm:hidden"
                />
                <img
                  src={image}
                  alt="todo"
                  className="hidden rounded-xl sm:block"
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
