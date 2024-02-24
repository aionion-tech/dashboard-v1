"use client";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

import { uploadImageAction } from "@/app/lib/actions/datasetItem.actions";
import { v4 as uuid } from "uuid";
import { DropZone } from "@/components/DropZone";
import { ImageItem } from "@/types/ImageItem.interface";
import { ImagesList } from "@/components/ImagesList";
import Link from "next/link";

interface Props {
  imageItems: Record<string, ImageItem>;
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}

export default function ImageUpload({
  imageItems,
  params: { workspaceId, projectId, datasetId },
}: Props) {
  const [imageItemsState, setImageItems] =
    useState<Record<string, ImageItem>>(imageItems);

  const [pendingExist, setPendingExist] = useState(false);

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
    setPendingExist(false);
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
    setPendingExist(true);
  };

  return (
    <main className="p-8 flex-grow">
      <section className="flex flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end mb-8">
          <Link
            className={buttonVariants({
              variant: "secondary",
            })}
            href={`/dashboard/${workspaceId}/${projectId}/${datasetId}/annotate`}
          >
            Start Annotation
          </Link>
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={!pendingExist}
          >
            Submit
          </Button>
        </div>
        <div className="flex justify-between relative">
          <div className="flex-1">
            <ImagesList imageItemsState={imageItemsState} />
          </div>
          <div className="flex-1 sticky top-20 self-start">
            <DropZone handleSelectFiles={handleSelectFiles} />
          </div>
        </div>
      </section>
    </main>
  );
}
