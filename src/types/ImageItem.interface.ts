import { Annotation } from "./Annotation.interface";

export interface ImageItem {
  id: string;
  name: string;
  size: number;
  imagePreview: string;
  file: File | null;
  annotations: Annotation[];
  status: "pending" | "success" | "error";
}
