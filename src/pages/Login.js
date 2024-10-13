import { useState } from "react";

function Login({ sendLoginID, sendLogin }) {

    const [loginID, setLoginID] = useState("");
    const [error, setError] = useState("");
    const [panelType, setPanelType] = useState(false);

    function setPanel() {
        setPanelType(!panelType);
        setError("");
    }

    function login() {
        let username = document.getElementById("loginusername").value;
        let password = document.getElementById("loginpassword").value;

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password })
        };

        fetch("http://localhost/server/auth.php", fetchOptions)
            .then(res => res.json())
            .then(data => (data.split(" ")[0] == "OK") ? (sendLogin(true), document.cookie = "userToken=" + data.split(" ")[1]) : setError(data))
    }

    function register() {
        let username = document.getElementById("regusername").value;
        let password = document.getElementById("regpassword").value;

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password })
        };

        if (document.getElementById("regpassword").value == document.getElementById("regpasswordr").value) {
            fetch("http://localhost/server/reg.php", fetchOptions)
                .then(res => res.json())
                .then(data => setError(data))
        } else {
            setError("Şifreler uyuşmuyor!");
        }


    }

    const loginPanel = (
        <>
            <p>Giriş Yap</p>
            {(error == "" ? "" : <p className="text-info">{error}</p>)}
            <input className="m-1 form-control" placeholder="Kullanıcı Adı" id="loginusername" type="text" />
            <input className="m-1 form-control" placeholder="Şifre" id="loginpassword" type="password" />
            <a className="m-1 w-100  btn btn-dark link-info" onClick={setPanel}>Hesabın yok mu? Buraya tıkla.</a>
            <button className="m-1 btn btn-outline-secondary w-100" id="loginBtn" onClick={login}>Giriş Yap</button>
        </>
    );

    const registerPanel = (
        <>
            <p>Kayıt Ol</p>
            {(error == "" ? "" : <p className="text-info">{error}</p>)}
            <input className="m-1 form-control" placeholder="Kullanıcı Adı" id="regusername" type="text" />
            <input className="m-1 form-control" placeholder="Şifre" id="regpassword" type="password" />
            <input className="m-1 form-control" placeholder="Şifre Tekrar" id="regpasswordr" type="password" />
            <a className="m-1 w-100 btn btn-dark link-info" onClick={setPanel}>Hesabın Var Mı? Buraya tıkla.</a>
            <button className="m-1 btn btn-outline-secondary w-100" id="loginBtn" onClick={register}>Kayıt Ol</button>
        </>
    );

    return (
        <>
            <div className="d-flex justify-content-center w-100">
                <div className="d-none d-md-flex flex-column justify-content-center align-items-center col-5 p-5 text-dark text-center bg-light rounded-start-1" style={{ height: "400px", width: "350px" }}>
                    <h1><i className="fa-solid fa-wave-square"></i></h1>
                    <h1><span style={{ color: "#E95793" }}>Telgraf</span>'a Hoşgeldin!</h1>
                    <p>Telgraf bir özgür iletişim platformudur. Tanıdıklarınız ile özgürce iletişim kurabilir ve ya yeni insanlarla tanışabilirsiniz.</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center col-5 p-5 bg-dark rounded-end-1" style={{ height: "400px", width: "350px" }}>
                    <h3 className="d-block d-md-none mb-4"><span style={{ color: "#E95793" }}>Telgraf</span>'a Hoşgeldin!</h3>
                    {panelType ? registerPanel : loginPanel}
                </div>
            </div>
        </>
    );
}

export default Login;