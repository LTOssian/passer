import "./Header.css";

export interface IHeaderProps {
  appName: string;
}

const Header = ({ appName }: IHeaderProps) => {
  return (
    <header>
      <h1>{appName}</h1>
    </header>
  );
};

export default Header;
