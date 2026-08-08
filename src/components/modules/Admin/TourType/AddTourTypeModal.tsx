import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import type { ApiError } from "@/types";

import { tourTypeSchema, type TourTypeFormInputs } from "./tourType.schema";

const AddTourTypeModal = () => {
  const [open, setOpen] = useState(false);
  const [createTourType, { isLoading }] = useCreateTourTypeMutation();

  const { control, handleSubmit, reset } = useForm<TourTypeFormInputs>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: TourTypeFormInputs) => {
    try {
      await createTourType(data).unwrap();

      toast.success("Tour type created successfully.");

      reset();
      setOpen(false);
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message ?? "Failed to create tour type.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger render={<Button>Add Tour Type</Button>} />

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle>Add Tour Type</DialogTitle>

            <DialogDescription>
              Enter a name for the new tour type and click save.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel htmlFor="name-1">Name</FieldLabel>

                  <Input
                    {...field}
                    id="name-1"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="gap-2 pt-2">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourTypeModal;
