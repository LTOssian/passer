import "./Header.css";

export interface IHeaderProps {
  appName: string;
}

export const Header = ({ appName }: IHeaderProps) => {
  return (
    <header>
      <h1>{appName}</h1>
    </header>
  );
};
