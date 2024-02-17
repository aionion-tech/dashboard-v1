"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Annotation } from "@/components/ImageLabeling";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropZone } from "@/components/DropZone";
import { uploadImageAction } from "@/app/lib/actions/datasetItem.actions";

interface ImageItem {
  name: string;
  size: number;
  imagePreview: string;
  file: File;
  annotations: Annotation[];
}
export default function Project({
  params: { workspaceId, projectId, datasetId },
}: {
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}) {
  const [imageItems, setImageItems] = useState<Record<string, ImageItem>>({});

  const handleSubmit = async () => {
    await Promise.all(
      Object.values(imageItems).map(async (imageItem) => {
        const formData = new FormData();
        formData.append("photo", imageItem.file);

        await uploadImageAction({
          formData,
          workspaceId,
          projectId,
          datasetId,
        });

        setImageItems((prev) => ({
          ...prev,
          [imageItem.name]: {
            ...imageItem,
          },
        }));
      })
    );
  };

  const handleSelectFiles = (files: File[]) => {
    const newImageItems = files.reduce((acc, file) => {
      acc[file.name] = {
        name: file.name,
        size: file.size,
        imagePreview: URL.createObjectURL(file),
        file: file,
        annotations: [],
      };
      return acc;
    }, {} as Record<string, ImageItem>);

    setImageItems(newImageItems);
  };

  if (!Object.keys(imageItems).length) {
    return (
      <main className="p-8 flex-grow">
        <section className="flex justify-center">
          <Card className="flex w-[50%]  flex-col justify-between items-center">
            <CardHeader>
              <CardTitle>Start uploading images</CardTitle>
            </CardHeader>
            <CardContent className="h-[100px]">
              <DropZone handleSelectFiles={handleSelectFiles} />
            </CardContent>
            <CardFooter>
              <Button variant="outline">Upload</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="p-8 flex-grow">
      <section className="flex flex-col">
        <div className="flex gap-6 md:gap-10 w-full justify-end">
          <Button variant="outline" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <div className="flex flex-col">
          {Object.values(imageItems).map((imageItem, index) => {
            return (
              <div key={imageItem.imagePreview} className="flex mb-4">
                <img
                  src={imageItem.imagePreview}
                  alt=""
                  className="h-[100px] w-[100px] object-cover mr-4"
                />
                <div>
                  <p>{imageItem.name}</p>
                  <p>{(imageItem.size / 1024).toFixed(2)}KB</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
