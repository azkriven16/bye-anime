"use client";

import { Button } from "@/components/ui/button";

export const AtoZPagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Button variant="outline" disabled={currentPage === 1} onClick={onPrev}>
        Prev
      </Button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button variant="outline" disabled={!hasNextPage} onClick={onNext}>
        Next
      </Button>
    </div>
  );
};
