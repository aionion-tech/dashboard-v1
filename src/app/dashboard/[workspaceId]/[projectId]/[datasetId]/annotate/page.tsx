"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageLabeling, { Annotation } from "@/components/ImageLabeling";
import { useRouter } from "next/navigation";

interface ImageItem {
  imageUrl: string;
  annotations: Annotation[];
}
export default function Dataset({
  params: { workspaceId, projectId, datasetId },
}: any) {
  const router = useRouter();

  const [labels, setLabels] = useState<string[]>([
    "label-1",
    "label-2",
    "label-3",
  ]);
  const [activeLabel, setActiveLabel] = useState<string>("label-1");

  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [maskOverlayUrls, setMaskOverlayUrls] = useState<any[]>([]);
  const [maskImages, setMaskImages] = useState<any[]>([]);
  const [samResult, setSamResult] = useState<boolean[][] | null>(null);

  const getSamResult = async ({
    imageUrl,
    bbox,
  }: // centerPoint,
  {
    imageUrl: string;
    bbox: number[];
    // centerPoint: number[];
  }) => {
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, bbox }),
    });

    const data = await response.json();

    setSamResult(data.result);
    // console.log(data);
  };

  const handleAnnotationsChange = (newAnnotations: Annotation[]) => {
    const newImageItems = [...imageItems];
    newImageItems[selectedImageIndex].annotations = newAnnotations;
    setImageItems(newImageItems);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === imageItems.length - 1) {
      return;
    }

    setMaskOverlayUrls([]);
    setMaskImages([]);
    setSamResult(null);
    setSelectedImageIndex(selectedImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === 0) {
      return;
    }

    setMaskOverlayUrls([]);
    setMaskImages([]);
    setSamResult(null);
    setSelectedImageIndex(selectedImageIndex - 1);
  };

  const handleSelectLabel = (lbl: string) => {
    setActiveLabel(lbl);
  };

  if (imageItems.length === 0) {
    return router.push(`/dashboard/${workspaceId}/${projectId}/${datasetId}`);
  }

  return (
    <main className="p-8 flex-grow">
      <section className="flex w-full">
        <div className="flex-grow">
          <ImageLabeling
            imageUrl={imageItems[selectedImageIndex].imageUrl}
            annotations={imageItems[selectedImageIndex].annotations}
            onAnnotationsChange={handleAnnotationsChange}
            activeLabel={activeLabel}
            maskOverlayUrls={maskOverlayUrls}
            setMaskOverlayUrls={setMaskOverlayUrls}
            maskImages={maskImages}
            setMaskImages={setMaskImages}
            samResult={samResult}
            getSamResult={getSamResult}
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
                key={label}
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
