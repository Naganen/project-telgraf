import { useState, useEffect } from "react";

const API_BASE = "http://localhost/projeler/project-telgraf/telgraf-server";

export default function ProfileModal({ userId, onClose, editable = false, usertoken = null }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Editable form fields
    const [formDisplayName, setFormDisplayName] = useState("");
    const [formBio, setFormBio] = useState("");
    const [formGlobalTag, setFormGlobalTag] = useState("");
    const [formKonum, setFormKonum] = useState("");
    const [formDogumTarihi, setFormDogumTarihi] = useState("");
    const [formWebsitesi, setFormWebsitesi] = useState("");

    useEffect(() => {
        fetch(API_BASE + "/getProfile.php", {
            method: 'POST',
            body: JSON.stringify({ userId: userId })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setProfile(data);
                    // Initialize form fields
                    setFormDisplayName(data.display_name || "");
                    setFormBio(data.bio || "");
                    setFormGlobalTag(data.global_tag || "");
                    let about = {};
                    try { about = JSON.parse(data.about || "{}"); } catch (e) { }
                    setFormKonum(about.konum || "");
                    setFormDogumTarihi(about.dogumTarihi || "");
                    setFormWebsitesi(about.websitesi || "");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [userId]);

    function handleSave() {
        setSaving(true);
        setSaveMessage("");

        const aboutJson = JSON.stringify({
            konum: formKonum,
            dogumTarihi: formDogumTarihi,
            websitesi: formWebsitesi
        });

        fetch(API_BASE + "/updateProfile.php", {
            method: 'POST',
            body: JSON.stringify({
                usertoken: usertoken,
                display_name: formDisplayName,
                bio: formBio,
                global_tag: formGlobalTag,
                about: aboutJson
            })
        })
            .then(res => res.json())
            .then(data => {
                setSaving(false);
                if (data.success) {
                    setSaveMessage("Profil güncellendi!");
                    // Update local profile state
                    setProfile(prev => ({
                        ...prev,
                        display_name: formDisplayName,
                        bio: formBio,
                        global_tag: formGlobalTag,
                        about: aboutJson
                    }));
                    setTimeout(() => {
                        setEditMode(false);
                        setSaveMessage("");
                    }, 1000);
                } else {
                    setSaveMessage(data.message || "Bir hata oluştu.");
                }
            })
            .catch(() => {
                setSaving(false);
                setSaveMessage("Bağlantı hatası.");
            });
    }

    if (loading) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: 3000, backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: 3000, backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
                <div className="bg-dark rounded-3 p-4 text-center">
                    <p className="text-danger m-0">Profil yüklenemedi.</p>
                </div>
            </div>
        );
    }

    let aboutData = {};
    try {
        aboutData = JSON.parse(profile.about || "{}");
    } catch (e) {
        aboutData = {};
    }

    // --- EDIT MODE ---
    if (editMode) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: 3000, backgroundColor: "rgba(0,0,0,0.7)" }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
                <div className="bg-dark rounded-3 shadow overflow-auto" style={{ width: "420px", maxHeight: "85vh" }}>

                    {/* Başlık */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                        <h6 className="m-0 text-white"><i className="fa-solid fa-pen-to-square me-2"></i>Profili Düzenle</h6>
                        <button className="btn btn-outline-secondary border-0 btn-sm" onClick={() => setEditMode(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="p-3">
                        {/* Görünen Ad */}
                        <div className="mb-3">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>Görünen Ad</label>
                            <input
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formDisplayName}
                                onChange={(e) => setFormDisplayName(e.target.value)}
                                maxLength={50}
                                placeholder="Görünen adınız"
                            />
                        </div>

                        {/* Bio */}
                        <div className="mb-3">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>Profil Açıklaması</label>
                            <textarea
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formBio}
                                onChange={(e) => setFormBio(e.target.value)}
                                rows={3}
                                maxLength={200}
                                placeholder="Kendinizi tanıtın..."
                            />
                            <small className="text-secondary">{formBio.length}/200</small>
                        </div>

                        {/* Global Tag */}
                        <div className="mb-3">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>Global Tag</label>
                            <input
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formGlobalTag}
                                onChange={(e) => setFormGlobalTag(e.target.value)}
                                maxLength={100}
                                placeholder="#etiket"
                            />
                        </div>

                        {/* Hakkında - Konum */}
                        <h6 className="text-white mt-3 mb-2" style={{ fontSize: "13px" }}>
                            <i className="fa-solid fa-circle-info me-1"></i> Hakkında
                        </h6>

                        <div className="mb-2">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
                                <i className="fa-solid fa-location-dot me-1"></i>Konum
                            </label>
                            <input
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formKonum}
                                onChange={(e) => setFormKonum(e.target.value)}
                                placeholder="Şehir, Ülke"
                            />
                        </div>

                        {/* Hakkında - Doğum Tarihi */}
                        <div className="mb-2">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
                                <i className="fa-solid fa-cake-candles me-1"></i>Doğum Tarihi
                            </label>
                            <input
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formDogumTarihi}
                                onChange={(e) => setFormDogumTarihi(e.target.value)}
                                placeholder="01 Ocak 2000"
                            />
                        </div>

                        {/* Hakkında - Websitesi */}
                        <div className="mb-3">
                            <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
                                <i className="fa-solid fa-link me-1"></i>Websitesi
                            </label>
                            <input
                                className="form-control form-control-sm bg-secondary-subtle border-0 text-white"
                                value={formWebsitesi}
                                onChange={(e) => setFormWebsitesi(e.target.value)}
                                placeholder="https://ornek.com"
                            />
                        </div>

                        {/* Kaydet Mesajı */}
                        {saveMessage && (
                            <p className={`text-center mb-2 ${saveMessage.includes("güncellendi") ? "text-success" : "text-danger"}`} style={{ fontSize: "13px" }}>
                                {saveMessage}
                            </p>
                        )}

                        {/* Butonlar */}
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-secondary btn-sm flex-fill" onClick={() => setEditMode(false)}>
                                İptal
                            </button>
                            <button className="btn btn-sm flex-fill text-white" style={{ backgroundColor: "#E95793" }} onClick={handleSave} disabled={saving}>
                                {saving ? <><span className="spinner-border spinner-border-sm me-1"></span>Kaydediliyor...</> : <><i className="fa-solid fa-check me-1"></i>Kaydet</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW MODE ---
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ zIndex: 3000, backgroundColor: "rgba(0,0,0,0.7)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-dark rounded-3 shadow overflow-hidden" style={{ width: "420px", maxHeight: "85vh" }}>

                {/* Kapak Resmi */}
                <div className="position-relative" style={{ height: "120px", backgroundColor: "#E95793" }}>
                    <img
                        alt="Kapak"
                        src={profile.cover_image}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {/* Üst sağ butonlar */}
                    <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                        {editable && (
                            <button
                                className="btn btn-dark btn-sm rounded-circle"
                                style={{ width: "30px", height: "30px", padding: 0 }}
                                title="Profili Düzenle"
                                onClick={() => setEditMode(true)}>
                                <i className="fa-solid fa-pen" style={{ fontSize: "12px" }}></i>
                            </button>
                        )}
                        <button
                            className="btn btn-dark btn-sm rounded-circle"
                            style={{ width: "30px", height: "30px", padding: 0 }}
                            onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                {/* Profil Resmi */}
                <div className="position-relative" style={{ marginTop: "-40px", paddingLeft: "20px" }}>
                    <img
                        alt="PP"
                        src={profile.pp}
                        className="rounded-circle border border-dark border-4"
                        style={{ width: "80px", height: "80px", objectFit: "cover", backgroundColor: "#2b2b2b" }}
                    />
                </div>

                {/* Profil Bilgileri */}
                <div className="p-3 pt-2">
                    {/* Görünen Ad & Kullanıcı Adı */}
                    <div className="mb-2">
                        <h5 className="m-0 fw-bold text-white">{profile.display_name || profile.username}</h5>
                        <p className="m-0 text-secondary" style={{ fontSize: "14px" }}>@{profile.username}</p>
                    </div>

                    {/* Global Tag */}
                    {profile.global_tag && (
                        <div className="mb-2">
                            <span className="badge rounded-pill" style={{ backgroundColor: "#E95793", fontSize: "12px" }}>
                                {profile.global_tag}
                            </span>
                        </div>
                    )}

                    {/* Profil Açıklaması (Bio) */}
                    <div className="bg-secondary bg-opacity-25 rounded-2 p-2 mb-3">
                        <p className="m-0 text-white" style={{ fontSize: "14px" }}>
                            {profile.bio || "Henüz bir açıklama eklenmemiş."}
                        </p>
                    </div>

                    {/* Hakkında Bölümü */}
                    <div className="bg-secondary bg-opacity-25 rounded-2 p-2">
                        <h6 className="text-white mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
                            <i className="fa-solid fa-circle-info me-1"></i> Hakkında
                        </h6>

                        {aboutData.konum && (
                            <div className="d-flex align-items-center mb-1">
                                <i className="fa-solid fa-location-dot text-secondary me-2" style={{ width: "16px", fontSize: "12px" }}></i>
                                <span className="text-white" style={{ fontSize: "13px" }}>{aboutData.konum}</span>
                            </div>
                        )}

                        {aboutData.dogumTarihi && (
                            <div className="d-flex align-items-center mb-1">
                                <i className="fa-solid fa-cake-candles text-secondary me-2" style={{ width: "16px", fontSize: "12px" }}></i>
                                <span className="text-white" style={{ fontSize: "13px" }}>{aboutData.dogumTarihi}</span>
                            </div>
                        )}

                        {aboutData.websitesi && (
                            <div className="d-flex align-items-center mb-1">
                                <i className="fa-solid fa-link text-secondary me-2" style={{ width: "16px", fontSize: "12px" }}></i>
                                <span className="text-info" style={{ fontSize: "13px" }}>{aboutData.websitesi}</span>
                            </div>
                        )}

                        {!aboutData.konum && !aboutData.dogumTarihi && !aboutData.websitesi && (
                            <p className="text-secondary m-0" style={{ fontSize: "13px" }}>Henüz bilgi eklenmemiş.</p>
                        )}
                    </div>

                    {/* Üyelik Bilgisi */}
                    <div className="mt-2 text-center">
                        <p className="text-secondary m-0" style={{ fontSize: "11px" }}>
                            <i className="fa-solid fa-wave-square me-1"></i>
                            Kullanıcı ID: {profile.id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
