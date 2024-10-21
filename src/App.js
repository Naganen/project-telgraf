import { useState } from "react";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [login, setLogin] = useState(false);

  function logout() {
    setLogin(false);
    document.cookie = "userToken="
  }

  if (login) {
    return (
      <>
        <Mainpage logout={logout} />
        
      </>
    );
  } else {
    return (
      <>
        <Login sendLogin={setLogin} />
      </>
    );
  }
}

