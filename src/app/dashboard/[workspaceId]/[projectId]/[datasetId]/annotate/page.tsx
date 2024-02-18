import AnnotateComponent from "./components/annotateComponent";
import { getImagesetItemsAction } from "@/app/lib/actions/datasetItem.actions";
import { ImageItem } from "../components/imageUpload";

export default async function AnnotatePage({
  params: { workspaceId, projectId, datasetId },
}: any) {
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

  const formatted = data.map((item) => {
    return {
      id: item.id.toString(),
      imageUrl: item.url,
      annotations: JSON.parse(item.annotations),
    };
  });

  return <AnnotateComponent images={formatted} />;
}
