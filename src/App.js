import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  if (document.cookie.split("=")[1] !== "" && !login) {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify({ usertoken: document.cookie.split("=")[1] })
    };

    fetch("http://localhost/telgraf-server/getUserDetails.php", fetchOptions)
      .then(res => res.json())
      .then(data => (data !== "USER NOT FOUND" ? (setLogin(true), setUser(data)) : setLogin(false)))
  }

  useEffect(() => {
    if (login) {
      function refreshUser() {
        const fetchOptions = {
          method: 'POST',
          body: JSON.stringify({ usertoken: document.cookie.split("=")[1] })
        };

        fetch("http://localhost/telgraf-server/getUserDetails.php", fetchOptions)
          .then(res => res.json())
          .then(data => setUser(data))
      }

      refreshUser()
      const interval = setInterval(() => refreshUser(), 5000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [login])

  function logout() {
    setLogin(false);
    document.cookie = "userToken="
  }

  if (login) {
    return (
      <>
        <Mainpage logout={logout} user={user} />
      </>
    );
  } else {
    return (
      <>
        <Login setUser={setUser} sendLogin={setLogin} />
      </>
    );
  }
}

