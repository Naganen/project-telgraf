export function LastChats({ data }) {
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

export function FriendsList({ data }) {
    const friends = JSON.parse(data).friends.map(friend =>
        <>
            <div className="d-flex justify-content-between align-items-center btn btn-outline-dark text-white border-0">
                <p className="text-white border-0 text-start m-0"><img width="35px" className="img-fluid rounded-3 me-2" src={friend.pp}></img>{friend.username}</p>
                <p className="border-0 m-0 btn btn-outline-secondary bg-transparent"><i className="fa-solid fa-ellipsis-vertical"></i></p>
            </div>
        </>
    );

    return (
        <>
            <div className="d-flex justify-content-between">
                <h6 className="mt-1">Arkadaşlar</h6>
                <div>
                    <span title="Yeni Arkadaş Ekle" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-plus"></i></span>
                </div>
            </div>
            <div className="d-flex flex-column">{friends}</div>
        </>
    );


}

export function ServerList({ data }) {
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

export function Notifications({ data }) {
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

export function Settings({ data }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h6 className="mt-1">Ayarlar</h6>
                <div>
                    <span title="Ayarları Sıfırla" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-arrows-rotate"></i></span>
                </div>
            </div>
        </>
    );
}

