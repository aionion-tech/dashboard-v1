"use client";

import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { FormValues } from "./Form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NestedFieldArray } from "./NestedFieldArray";
import { Card } from "@/components/ui/card";

interface Props {
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
}
export const FieldArray = ({ control, register }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "labels",
  });

  return (
    <div className="flex flex-col">
      <h2 className="mb-4">Labels</h2>
      {fields.length > 0 && (
        <div>
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4 p-4">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <Label htmlFor={`labels.${index}.name`}>Name</Label>
                  <Input {...register(`labels.${index}.name` as const)} />
                </div>
                <div>
                  <Label htmlFor={`labels.${index}.color`}>Color</Label>
                  <Input {...register(`labels.${index}.color` as const)} />
                </div>
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
              <NestedFieldArray nestIndex={index} {...{ control, register }} />
            </Card>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        type="button"
        onClick={() => {
          append({ name: "", color: "", prompts: [] });
        }}
      >
        Add label
      </Button>
    </div>
  );
};
