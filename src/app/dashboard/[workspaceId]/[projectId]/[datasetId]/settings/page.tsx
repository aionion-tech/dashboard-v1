import {
  getDatasetSettingsAction,
  updateDatasetSettingsAction,
} from "@/app/lib/actions/datasetSettings.actions";
import { Form, FormValues } from "./Form";

interface Props {
  params: {
    workspaceId: string;
    projectId: string;
    datasetId: string;
  };
}

export default async function Settings({
  params: { workspaceId, projectId, datasetId },
}: Props) {
  const { data } = await getDatasetSettingsAction({
    workspaceId,
    projectId,
    datasetId,
  });

  const submitSettings = async (formValues: FormValues) => {
    "use server";
    console.log("hi");
    const { data } = await updateDatasetSettingsAction({
      workspaceId,
      projectId,
      datasetId,
      ...formValues,
    });

    return data;
  };

  return (
    <div className="flex justify-center">
      <Form submitSettings={submitSettings} settings={data} />
    </div>
  );
}
