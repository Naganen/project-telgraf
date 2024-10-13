import { useState } from "react";
import Login from "./pages/Login";
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
        <p>Başarıyla giriş yaptın.</p>
        <button className="btn btn-dark" onClick={logout}>Çıkış Yap</button>
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

