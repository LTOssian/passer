import Header from "./components/Header/Header";
import CreatePasswordForm from "./components/CreatePasswordForm/CreatePasswordForm";
import PasswordsContainer from "./components/PasswordsContainer/PasswordsContainer";

import "./App.css";

const App = () => {
  return (
    <>
      <Header appName="Passer" />
      <main>
        <CreatePasswordForm />
        <PasswordsContainer />
      </main>
    </>
  );
};

export default App;
