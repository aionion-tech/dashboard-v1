"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Annotation } from "@/components/ImageLabeling";

import { uploadImageAction } from "@/app/lib/actions/datasetItem.actions";
import { v4 as uuid } from "uuid";
import { DropZone } from "@/components/DropZone";

export interface ImageItem {
  id: string;
  name: string;
  size: number;
  imagePreview: string;
  file: File | null;
  annotations: Annotation[];
  status: "pending" | "success" | "error";
}

export default function ImageUpload({
  imageItems,
  params: { workspaceId, projectId, datasetId },
}: {
  imageItems: Record<string, ImageItem>;
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}) {
  const [imageItemsState, setImageItems] =
    useState<Record<string, ImageItem>>(imageItems);

  const [showUpload, setShowUpload] = useState(
    Object.keys(imageItems).length === 0
  );

  const handleSubmit = async () => {
    await Promise.all(
      Object.values(imageItemsState)
        .filter((imageItem) => imageItem.status === "pending")
        .map(async (imageItem) => {
          const formData = new FormData();
          formData.append("photo", imageItem.file as Blob);

          const { data } = await uploadImageAction({
            formData,
            workspaceId,
            projectId,
            datasetId,
          });

          setImageItems((prev) => ({
            ...prev,
            [imageItem.id]: {
              ...imageItem,
              id: data.id.toString(),
              imagePreview: data.url,
              status: "success",
            },
          }));
        })
    );

    setShowUpload(false);
  };

  const handleSelectFiles = (files: File[]) => {
    const newImageItems = files.reduce((acc, file) => {
      const id = uuid();
      acc[id] = {
        id: id,
        name: file.name,
        size: file.size,
        imagePreview: URL.createObjectURL(file),
        file: file,
        annotations: [],
        status: "pending",
      };
      return acc;
    }, {} as Record<string, ImageItem>);

    setImageItems((prev) => ({ ...prev, ...newImageItems }));
  };

  return (
    <main className="p-8 flex-grow">
      <section className="flex flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end mb-8">
          <Button
            variant="outline"
            onClick={() => {
              setShowUpload(!showUpload);
            }}
          >
            Add images
          </Button>
          <Button variant="outline" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div className="flex justify-between relative">
          <div className="flex-1">
            {Object.values(imageItemsState).map((imageItem, index) => {
              return (
                <div key={imageItem.imagePreview} className="flex mb-4">
                  <img
                    src={imageItem.imagePreview}
                    alt=""
                    className={`h-[100px] w-[100px] object-cover mr-4 ${
                      imageItem.status === "success"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  />
                  <div>
                    <p>{imageItem.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-1 sticky top-20 self-start">
            <DropZone handleSelectFiles={handleSelectFiles} />
          </div>
        </div>
      </section>
    </main>
  );
}
