import { getImagesetItemsAction } from "@/app/lib/actions/datasetItem.actions";
import { ImageItem } from "@/types/ImageItem.interface";
import ImageUpload from "../components/imageUpload";

export default async function Upload({
  params: { workspaceId, projectId, datasetId },
}: {
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}) {
  const {
    data,
  }: {
    data: {
      id: number;
      name: string;
      workspace: number;
      project: number;
      dataset: number;
      type: string;
      url: string;
      value: string;
      annotations: "[]";
      createdAt: string;
      updatedAt: string;
    }[];
  } = await getImagesetItemsAction({
    workspaceId,
    projectId,
    datasetId,
  });

  const formatted: Record<string, ImageItem> = data.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id.toString(),
      name: item.name,
      size: 0,
      imagePreview: item.url,
      file: null,
      annotations: JSON.parse(item.annotations),
      status: "success",
    };
    return acc;
  }, {} as Record<string, ImageItem>);

  return (
    <ImageUpload
      params={{ workspaceId, projectId, datasetId }}
      imageItems={formatted}
    />
  );
}
