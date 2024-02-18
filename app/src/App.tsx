import { CreatePasswordForm } from "./components/CreatePasswordForm/CreatePasswordForm";
import { Header } from "./components/Header/Header";

import "./App.css";

function App() {
  return <>
      <Header appName="Passer">
      <main>
        <CreatePasswordForm />
      </main>
    </>

}

export default App;
