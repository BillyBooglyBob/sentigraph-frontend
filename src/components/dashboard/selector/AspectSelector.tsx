"use client";

import Selector from "@/components/dashboard/selector/Selector";

interface AspectSelectorProps {
  aspects: string[];
  handleAspectsChange: (
    selectedOrUpdater: string[] | ((prev: string[]) => string[])
  ) => void;
}

const AspectSelector = ({
  aspects,
  handleAspectsChange,
}: AspectSelectorProps) => {
  return (
    <Selector
      label="aspect"
      selectors={aspects}
      limit={1}
      handleSelectorChange={handleAspectsChange}
    />
  );
};

export default AspectSelector;
