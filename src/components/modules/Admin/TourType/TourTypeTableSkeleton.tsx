import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TourTypeTableSkeletonProps {
  rows?: number;
}

export function TourTypeTableSkeleton({
  rows = 5,
}: TourTypeTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-1/3" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-8 ml-auto rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
