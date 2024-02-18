import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function DropZone({
  handleSelectFiles,
}: {
  handleSelectFiles: (files: any) => void;
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    handleSelectFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="flex flex-col items-center" {...getRootProps()}>
      <CardHeader>
        <CardTitle>Upload images</CardTitle>
      </CardHeader>
      <CardContent>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}{" "}
      </CardContent>
      <CardFooter>
        <Button variant="outline">Upload</Button>
      </CardFooter>
    </Card>
  );
}
