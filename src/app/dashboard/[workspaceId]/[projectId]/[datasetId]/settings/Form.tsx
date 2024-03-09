"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FieldArray } from "./FieldArray";

export interface Label {
  name: string;
  color: string;
  prompts: string[];
}

export interface FormValues {
  name: string;
  description: string;
  labels: Label[];
}

interface Props {
  submitSettings: (data: FormValues) => Promise<FormValues>;
  settings: FormValues;
}

export const Form = ({ submitSettings, settings }: Props) => {
  console.log(settings);
  const { control, register, setValue, getValues, handleSubmit } =
    useForm<FormValues>();

  const submit = async (data: FormValues) => {
    const updated = await submitSettings(data);
  };

  return (
    <form onClick={handleSubmit(submit)} className="m-4 w-[50%]">
      <Card className="p-4">
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="name">Ontology name</Label>
            <Input {...register("name")} />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Ontology description</Label>
            <Input {...register("description")} />
          </div>

          <FieldArray
            control={control}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
