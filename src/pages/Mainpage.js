import { useState } from "react";

function Mainpage({logout}) {

    const [listType, setListType] = useState(0);

    function LastChats() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h6 className="mt-1">Son Görüşmeler</h6>
                    <div>
                        <span title="Bir Görüşme Başlat" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-plus"></i></span>
                    </div>
                </div>
            </>
        );
    }
    
    function FriendsList() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h6 className="mt-1">Arkadaşlar</h6>
                    <div>
                        <span title="Yeni Arkadaş Ekle" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-plus"></i></span>
                    </div>
                </div>
            </>
        );
    }

    function ServerList() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h6 className="mt-1">Sunucular</h6>
                    <div>
                        <span title="Bir Sunucuya Katıl" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-right-to-bracket"></i></span>
                        <span title="Bir Sunucu Oluştur" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-plus"></i></span>
                    </div>
                </div>
            </>
        );
    }

    function Notifications() {
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h6 className="mt-1">Bildirimler</h6>
                    <div>
                        <span title="Bildirimleri Sil" className="btn btn-outline-danger border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-trash"></i></span>
                        <span title="Bildirimleri Sustur" className="btn btn-outline-danger border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-bell-slash"></i></span>
                    </div>
                </div>
            </>
        );
    }
    

    return (
        <>
            <div className="bg-dark rounded-3 d-flex" style={{ height: "97vh", width: "98vw" }}>
                <div className="bg-dark-subtle rounded-3 d-flex" style={{ width: "370px", height: "100%" }}>
                    <div className="bg-secondary-subtle rounded-3 d-flex flex-column p-3 justify-content-start align-items-center" style={{ width: "80px", height: "100%" }}>
                        <h3 title="Telgraf Versiyon 1.0.0"><i className="fa-solid fa-wave-square"></i></h3>
                        <span title="Yeni Favori Ekle" className="btn btn-secondary mt-1"><i className="fa-solid fa-plus"></i></span>
                        <div className="position-absolute bottom-0 m-4 d-flex flex-column">
                            <h3 onClick={() => setListType(0)} title="Son Görüşmeler" className={listType === 0 ? "btn border-0 bg-transparent btn-secondary" : "btn border-0 bg-transparent btn-outline-secondary"} ><i className="fa-solid fa-comments"></i></h3>
                            <h3 onClick={() => setListType(1)} title="Arkadaşlar" className={listType === 1 ? "btn border-0 bg-transparent btn-secondary" : "btn border-0 bg-transparent btn-outline-secondary"} ><i className="fa-solid fa-user-group"></i></h3>
                            <h3 onClick={() => setListType(2)} title="Sunucular" className={listType === 2 ? "btn border-0 bg-transparent btn-secondary" : "btn border-0 bg-transparent btn-outline-secondary"}><i className="fa-solid fa-globe"></i></h3>
                            <h3 onClick={() => setListType(3)} title="Bildirimler" className={listType === 3 ? "btn border-0 bg-transparent btn-secondary" : "btn border-0 bg-transparent btn-outline-secondary"}><i className="fa-solid fa-bell"></i></h3>
                            <h3 title="Ayarlar" className="btn border-0 bg-transparent btn-outline-secondary"><i className="fa-solid fa-gear"></i></h3>
                            <h3 onClick={logout} title="Çıkış Yap" className="btn btn-outline-danger border-0 bg-transparent"><i className="fa-solid fa-right-from-bracket"></i></h3>
                        </div>
                    </div>
                    <div className="rounded-3 d-flex flex-column justify-content-center align-items-start w-100">
                        <div className="flex-fill p-3 w-100">
                            {listType === 0 ? <LastChats /> : listType === 1 ? <FriendsList /> : listType === 2 ? <ServerList /> : <Notifications />}
                        </div>
                        <div className="bg-secondary bg-opacity-75 p-3 w-100 rounded-3 rounded-top-0 rounded-start-0" style={{ height: "100px" }}>
                            <h6>Kullanıcı Adı</h6>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default Mainpage;