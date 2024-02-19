interface IEmptyDisplayProps {
  emptyText: string;
}

const EmptyDisplay = ({ emptyText }: IEmptyDisplayProps) => {
  return <span>({emptyText})</span>;
};

export default EmptyDisplay;
