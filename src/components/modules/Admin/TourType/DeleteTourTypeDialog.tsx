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
import { Trash2 } from "lucide-react";
import { useDeleteTourTypeMutation } from "@/redux/features/tourType/tourType.api";
import type { ApiError } from "@/types";
import type { ITourTypeResponse } from "@/types/tourType/tourType.type";

interface DeleteTourTypeDialogProps {
  tourType: ITourTypeResponse;
}

const DeleteTourTypeDialog = ({ tourType }: DeleteTourTypeDialogProps) => {
  const [deleteTourType, { isLoading }] = useDeleteTourTypeMutation();

  const handleDelete = async () => {
    try {
      await deleteTourType(tourType._id).unwrap();

      toast.success("Tour type deleted successfully.");
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message ?? "Failed to delete tour type.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="sm" variant="destructive">
            <Trash2 />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Tour Type</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{tourType.name}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose
            render={
              <Button
                variant="destructive"
                disabled={isLoading}
                onClick={handleDelete}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTourTypeDialog;
