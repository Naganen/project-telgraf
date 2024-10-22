import { useState } from "react";
import { LastChats, FriendsList, ServerList, Notifications, Settings } from "./components/Menus";

function Mainpage({ logout, user }) {

    const [listType, setListType] = useState(0);
    const [micStat, setMicStat] = useState(true);
    const [headphoneStat, setHeadphoneStat] = useState(true);

    const [isConnected, setIsConnected] = useState(false);
    // Room name should be less than 15 character. Or it will not fit fields.
    const [connectedRoom, setConnectedRoom] = useState("Default");
    const [curPing, setCurPing] = useState(0);

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
                            <h3 onClick={() => setListType(4)} title="Ayarlar" className={listType === 4 ? "btn border-0 bg-transparent btn-secondary" : "btn border-0 bg-transparent btn-outline-secondary"}><i className="fa-solid fa-gear"></i></h3>
                            <h3 onClick={logout} title="Çıkış Yap" className="btn btn-outline-danger border-0 bg-transparent"><i className="fa-solid fa-right-from-bracket"></i></h3>
                        </div>
                    </div>
                    <div className="rounded-3 d-flex flex-column justify-content-center align-items-start w-100">
                        <div className="flex-fill p-3 w-100">
                            {listType === 0 ? <LastChats /> : listType === 1 ? <FriendsList data={user.friends} /> : listType === 2 ? <ServerList /> : listType === 3 ? <Notifications /> : <Settings />}
                        </div>
                        <div className="bg-dark bg-opacity-50 p-3 w-100 rounded-3 rounded-top-0 rounded-start-0 d-flex justify-content-between align-items-center" style={{ height: "75px" }}>
                            <div className="d-flex flex-column justify-content-center align-items-start btn btn-outline-dark border-0 text-start" style={{width: "180px", height: "55px"}}>
                                <h6 title={"User ID: " + user.id} className="fw-normal m-0 text-white">{user.username}</h6>
                                {isConnected ? <p  className={"fw-lighter m-0 " + (curPing < 100 ? "text-success" : "text-warning")} style={{fontSize: "12px"}}><i className="fa-solid fa-wave-square me-1"></i>{connectedRoom + " " + curPing + "ms"}</p> : <></>}
                            </div>
                            <div>
                                <span className="btn border-0 bg-transparent btn-outline-secondary" onClick={() => setHeadphoneStat(!headphoneStat)}><i className={headphoneStat ? "fa-solid fa-volume-high" : "fa-solid text-danger fa-volume-xmark"} style={{width: "15px"}}></i></span>
                                <span className="btn border-0 bg-transparent btn-outline-secondary" onClick={() => setMicStat(!micStat)}><i className={micStat ? "fa-solid fa-microphone" : "fa-solid text-danger fa-microphone-slash"} style={{width: "20px"}}></i></span>
                            </div>
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