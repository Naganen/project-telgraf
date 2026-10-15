import { useState, useEffect, useRef } from "react";
import ProfileModal from "./ProfileModal";

export function LastChats({ data }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h6 className="ms-2 mt-2">Son Görüşmeler</h6>
                <div className="me-2 mt-2">
                    <span title="Bir Görüşme Başlat" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-plus"></i></span>
                </div>
            </div>
        </>
    );
}

export function FriendsList({ data, usertoken }) {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchMessage, setSearchMessage] = useState("");
    const [openMenu, setOpenMenu] = useState(null);
    const [friendRemoved, setFriendRemoved] = useState(false);
    const [profileUserId, setProfileUserId] = useState(null);
    const menuRef = useRef(null);

    const API_BASE = "http://localhost/projeler/project-telgraf/telgraf-server";

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        }
        if (openMenu !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenu]);

    // Search users by username
    function handleSearch() {
        if (searchQuery.trim() === "") return;
        setSearchLoading(true);
        setSearchMessage("");

        fetch(API_BASE + "/searchUser.php", {
            method: 'POST',
            body: JSON.stringify({ query: searchQuery, usertoken: usertoken })
        })
            .then(res => res.json())
            .then(data => {
                setSearchResults(data);
                setSearchLoading(false);
                if (data.length === 0) setSearchMessage("Kullanıcı bulunamadı.");
            })
            .catch(() => {
                setSearchLoading(false);
                setSearchMessage("Bir hata oluştu.");
            });
    }

    // Add friend
    function handleAddFriend(friendId) {
        fetch(API_BASE + "/addFriend.php", {
            method: 'POST',
            body: JSON.stringify({ usertoken: usertoken, friendId: friendId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSearchMessage(data.message);
                    // Update the search results to reflect the new friendship
                    setSearchResults(prev => prev.map(u => u.id === friendId ? { ...u, isFriend: true } : u));
                } else {
                    setSearchMessage(data.message);
                }
            });
    }

    // Remove friend
    function handleRemoveFriend(friendId) {
        fetch(API_BASE + "/removeFriend.php", {
            method: 'POST',
            body: JSON.stringify({ usertoken: usertoken, friendId: friendId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFriendRemoved(!friendRemoved); // trigger re-render
                }
                setOpenMenu(null);
            });
    }

    // Close menu when clicking outside
    function handleMenuToggle(friendId) {
        setOpenMenu(openMenu === friendId ? null : friendId);
    }

    let friends = [];
    try {
        const parsed = JSON.parse(data);
        friends = parsed.filter(f => f && f.id);
    } catch (e) {
        friends = [];
    }

    const friendElements = friends.map(friend =>
        <div key={friend.id} className="d-flex justify-content-between align-items-center btn btn-outline-dark text-white border-0 m-0 p-2 position-relative">
            <p className="text-white border-0 text-start m-0"><img alt="PP" width="35px" className="img-fluid rounded-3 me-2" src={friend.pp}></img>{friend.username}</p>
            <div className="position-relative" ref={openMenu === friend.id ? menuRef : null}>
                <p className="border-0 m-0 btn btn-outline-secondary bg-transparent" onClick={() => handleMenuToggle(friend.id)}><i className="fa-solid fa-ellipsis-vertical"></i></p>
                {openMenu === friend.id && (
                    <div className="position-absolute end-0 bg-dark border border-secondary rounded-2 shadow p-1" style={{ zIndex: 1000, minWidth: "160px", top: "100%" }}>
                        <button className="btn btn-outline-light border-0 w-100 text-start btn-sm" onClick={() => { setOpenMenu(null); setProfileUserId(friend.id); }}>
                            <i className="fa-solid fa-user me-2"></i>Profili Gör
                        </button>
                        <button className="btn btn-outline-danger border-0 w-100 text-start btn-sm" onClick={() => handleRemoveFriend(friend.id)}>
                            <i className="fa-solid fa-user-minus me-2"></i>Arkadaşlıktan Çıkar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    // Search modal
    const searchModal = showSearch ? (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.7)" }} onClick={(e) => { if (e.target === e.currentTarget) { setShowSearch(false); setSearchResults([]); setSearchQuery(""); setSearchMessage(""); } }}>
            <div className="bg-dark rounded-3 p-4 shadow" style={{ width: "380px", maxHeight: "500px" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="m-0">Arkadaş Ekle</h6>
                    <button className="btn btn-outline-secondary border-0 btn-sm" onClick={() => { setShowSearch(false); setSearchResults([]); setSearchQuery(""); setSearchMessage(""); }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="d-flex mb-3">
                    <input
                        className="form-control form-control-sm bg-secondary-subtle border-0 text-white me-2"
                        placeholder="Kullanıcı adı ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    />
                    <button className="btn btn-outline-success btn-sm" onClick={handleSearch} disabled={searchLoading}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                {searchMessage && <p className="text-info text-center" style={{ fontSize: "13px" }}>{searchMessage}</p>}
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {searchResults.map(user => (
                        <div key={user.id} className="d-flex justify-content-between align-items-center p-2 mb-1 rounded-2" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                            <p className="text-white m-0"><img alt="PP" width="30px" className="img-fluid rounded-3 me-2" src={user.pp}></img>{user.username}</p>
                            {user.isFriend ? (
                                <span className="badge bg-secondary"><i className="fa-solid fa-check me-1"></i>Arkadaş</span>
                            ) : (
                                <button className="btn btn-outline-success btn-sm border-0" onClick={() => handleAddFriend(user.id)}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            {searchModal}
            {profileUserId && <ProfileModal userId={profileUserId} onClose={() => setProfileUserId(null)} />}
            <div className="d-flex justify-content-between">
                <h6 className="ms-2 mt-2">Arkadaşlar</h6>
                <div className="me-2 mt-2">
                    <span title="Yeni Arkadaş Ekle" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }} onClick={() => setShowSearch(true)}><i className="fa-solid fa-plus"></i></span>
                </div>
            </div>
            <div className="d-flex flex-column">{friendElements}</div>
        </>
    );


}

export function ServerList({ data }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h6 className="ms-2 mt-2">Sunucular</h6>
                <div className="me-2 mt-2">
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
                <h6 className="ms-2 mt-2">Bildirimler</h6>
                <div className="me-2 mt-2">
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
                <h6 className="ms-2 mt-2">Ayarlar</h6>
                <div className="me-2 mt-2">
                    <span title="Ayarları Sıfırla" className="btn btn-outline-success border-0 btn-sm ms-1 bg-transparent" style={{ fontSize: "10px" }}><i className="fa-solid fa-arrows-rotate"></i></span>
                </div>
            </div>
        </>
    );
}

