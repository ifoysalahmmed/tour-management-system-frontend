import { useEffect } from "react";
import { toast } from "sonner";
import { useGetAllTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TourTypeTableSkeleton } from "@/components/modules/Admin/TourType/TourTypeTableSkeleton";
import AddTourTypeModal from "@/components/modules/Admin/TourType/AddTourTypeModal";
import DeleteTourTypeDialog from "@/components/modules/Admin/TourType/DeleteTourTypeDialog";

const AddTourType = () => {
  const { data, isLoading, isError } = useGetAllTourTypesQuery(undefined);
  const tourTypes = data?.data || [];
  const meta = data?.meta;

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load tour types.");
    }
  }, [isError]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 border border-muted rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Tour Types</h1>
        <AddTourTypeModal />
      </div>

      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">SL</TableHead>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TourTypeTableSkeleton />
            ) : (
              tourTypes.map((tourType, index) => (
                <TableRow key={tourType._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  <TableCell className="font-medium">{tourType.name}</TableCell>

                  <TableCell className="text-right">
                    <DeleteTourTypeDialog tourType={tourType} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta && (
        <p className="text-sm text-muted-foreground mt-2">
          Page {meta.page} of {meta.totalPages} &middot; {meta.total} total
        </p>
      )}
    </div>
  );
};

export default AddTourType;
