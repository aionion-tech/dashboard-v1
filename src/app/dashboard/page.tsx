"use client";
import { useState } from "react";
import ImageLabeling, { Annotation } from "./components/ImageLabeling";
import { Button } from "@/components/ui/button";

const data = [
  {
    imageUrl:
      "https://storage.googleapis.com/capturpwa.appspot.com/64285446de8e6e4305435684%2Fcptr-2d0c7dd7-f7d2-45ff-a9f7-1d25c064c28b.jpeg",
    annotations: [],
  },
  {
    imageUrl:
      "https://storage.googleapis.com/capturpwa.appspot.com/64285446de8e6e4305435684%2Fcptr-6c51ebbf-a247-4164-9802-33b717aba615.jpeg",
    annotations: [],
  },
  {
    imageUrl:
      "https://storage.googleapis.com/capturpwa.appspot.com/64285446de8e6e4305435684%2Fcptr-60bc90b4-4bf5-4e2a-9af8-2930d994aa80.jpeg",
    annotations: [],
  },
  {
    imageUrl:
      "https://storage.googleapis.com/capturpwa.appspot.com/64285446de8e6e4305435684%2Fcptr-53d808a8-06d2-46a7-b859-331f9c9f0db4.jpeg",
    annotations: [],
  },
  {
    imageUrl:
      "https://storage.googleapis.com/capturpwa.appspot.com/64285446de8e6e4305435684%2Fcptr-e4ba4604-8ff3-4d84-b7fd-1279e3a2e709.jpeg",
    annotations: [],
  },
];

interface ImageItem {
  imageUrl: string;
  annotations: Annotation[];
}
export default function Dashboard() {
  const [labels, setLabels] = useState<string[]>([
    "label-1",
    "label-2",
    "label-3",
  ]);
  const [activeLabel, setActiveLabel] = useState<string>("label-1");

  const [imageItems, setImageItems] = useState<ImageItem[]>(data);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAnnotationsChange = (newAnnotations: Annotation[]) => {
    const newImageItems = [...imageItems];
    newImageItems[selectedImageIndex].annotations = newAnnotations;
    setImageItems(newImageItems);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === imageItems.length - 1) {
      return;
    }

    setSelectedImageIndex(selectedImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === 0) {
      return;
    }

    setSelectedImageIndex(selectedImageIndex - 1);
  };

  const handleSelectLabel = (lbl: string) => {
    setActiveLabel(lbl);
  };

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full">
        <div className="flex-grow">
          <ImageLabeling
            imageUrl={imageItems[selectedImageIndex].imageUrl}
            annotations={imageItems[selectedImageIndex].annotations}
            onAnnotationsChange={handleAnnotationsChange}
            activeLabel={activeLabel}
          />
        </div>
        <div className="w-1/4">
          <div className="flex mb-2">
            <Button onClick={handlePrevImage} className="flex-grow  mr-2">
              Prev
            </Button>
            <Button onClick={handleNextImage} className="flex-grow">
              Next
            </Button>
          </div>
          <div className="flex flex-col items-start">
            {labels.map((label) => (
              <Button
                onClick={handleSelectLabel.bind(null, label)}
                className="mb-2 w-full"
                variant={activeLabel === label ? "default" : "secondary"}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
