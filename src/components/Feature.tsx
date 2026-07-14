import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface FeatureProps {
  features?: FeatureItem[];
  className?: string;
}

const Feature = ({
  features = [
    {
      id: 1,
      title: "Web development",
      image: "/images/frontend/prev.webp",
      description: `Web development became my main passion almost by accident. As a teenager, I was deeply interested in <a href="/photography" class="hover:underline! font-medium transition">photography</a> and wanted to find new ways to share my work beyond physical exhibitions. That curiosity led me to explore websites as a creative medium. What started with a basic understanding of HTML quickly grew into a fascination with building digital experiences, combining creativity, problem-solving, and technology.`,
    },
    {
      id: 2,
      title: "UX/UI Design",
      image: "/images/ux/prev.png",
      description:
        "My interest in UX/UI design emerged naturally through web development. As I built websites, I became increasingly curious about how people interact with digital products and what makes an experience intuitive and enjoyable. Learning about user research, usability testing, and design methodologies helped me understand that successful products are built around people, not just technology.",
    },

    {
      id: 3,
      title: "Creative coding, sound and installations",
      image: "/images/multimedia/intermediartes/prev.jpg",
      description:
        "During my Master's in Multimedia at the University of Porto, I had the opportunity to explore technology beyond the browser. Through interactive installations, generative music, reactive visuals, Arduino projects, and digital storytelling, I discovered new ways of connecting creativity, art, and technology. These experiences continue to influence how I approach experimentation and innovation today.",
    },
    {
      id: 4,
      title: "Why Vienna",
      image: "/images/about/vienna.jpg",
      description: `I've always imagined myself living abroad. The challenge of adapting to new environments, meeting people from different cultures, and learning new languages has always excited me, even if languages don't come naturally to me. Vienna first entered my life through <a href="https://www.uxcon.io/" target="_blank" class="hover:underline! font-medium transition">uxcon Vienna</a>, but what started as a professional opportunity soon became something more. I found a city that constantly encourages growth, curiosity, and new perspectives, making it the perfect place to continue both my personal and professional journey.`,
    },
  ],

  className,
}: FeatureProps) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto space-y-8">
        <h2 className="text-3xl font-bold">Where it started</h2>

        <div className="flex w-full items-stretch justify-between gap-12">
          <div className="w-full md:w-1/2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {features.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${String(tab.id)}`}
                  className="transition-opacity"
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="group cursor-pointer py-5 no-underline! transition"
                  >
                    <h4
                      className={`text-xl ${tab.id === activeTabId ? "text-dark" : "text-muted-foreground group-hover:text-dark transition"}`}
                    >
                      {tab.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <p
                      className="text-muted-foreground text-base"
                      dangerouslySetInnerHTML={{ __html: tab.description }}
                    ></p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="bg-muted relative hidden max-h-[450px] w-1/2 overflow-hidden rounded-2xl shadow-xl md:block">
            <div className="relative h-full w-full">
              {features.map((feature) => (
                <img
                  key={feature.id}
                  src={feature.image}
                  alt={feature.title}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                    activeImage === feature.image ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Based on https://shadcnblocks.com/block/feature197
export default function FeatureExample() {
  return <Feature />;
}
