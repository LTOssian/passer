import "./Header.css";

export interface HeaderProps {
  appName: string;
}

export const Header = ({ appName }: HeaderProps) => {
  return (
    <header>
      <h1>{appName}</h1>
    </header>
  );
};
