"use client";

import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormValues } from "./Form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  nestIndex: number;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
}
export const NestedFieldArray = ({ nestIndex, control, register }: Props) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `labels.${nestIndex}.prompts` as any,
  });

  return (
    <div>
      <h3 className="mb-4">Prompts</h3>
      <div className="mb-4">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 flex justify-between">
            <Input
              {...register(`labels.${nestIndex}.prompts.${index}` as const)}
              className="mr-4"
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => {
            append("");
          }}
        >
          Add prompt
        </Button>
      </div>
    </div>
  );
};
