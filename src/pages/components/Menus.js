export function LastChats({data}) {
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

export function FriendsList({data}) {
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

export function ServerList({data}) {
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

export function Notifications({data}) {
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