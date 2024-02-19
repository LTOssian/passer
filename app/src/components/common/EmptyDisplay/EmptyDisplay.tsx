import React from "react";

interface IEmptyDisplayProps {
  emptyText: string;
}

const EmptyDisplay = ({ emptyText }: IEmptyDisplayProps) => {
  return <div>({emptyText})</div>;
};

export default EmptyDisplay;
