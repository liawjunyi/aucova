import React, { useState, useRef } from "react";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";
import Menu from "../components/Menu";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function SetUp() {
  const [visible, setVisible] = useState(false);

  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const handleMouseDown = () => {
    setVisible(!visible);
  };

  const user = getAuth().currentUser;

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const addProfilePic = async (e) => {
    const file = e.target.files[0];
    const imagesRef = ref(storage, `profilePic/${file.name}`);
    await uploadBytes(imagesRef, file)
      .then(() => getDownloadURL(imagesRef))
      .then((url) => {
        setProfilePic({
          name: file.name,
          url: url,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.uid);
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: user.email,
      profilePic: profilePic
        ? {
            ...profilePic,
          }
        : null,
      fullname: "",
      uid: user.uid,
      subscription: false,
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Header
        title="AUCOVA"
        leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
      />
      <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
      <form onSubmit={handleSubmit}>
        <div className="setup-container">
          <div className="intro-header setup">
            <h2>Profile Creation</h2>
            <div className="setup-profile">
              {profilePic && (
                <img src={profilePic.url} alt="" className="profile-pic" />
              )}
              {!profilePic && <img src="/fixed/DefaultProfile.svg" alt="" />}
            </div>
            <p
              style={{ textDecoration: "underline" }}
              onClick={() => profileRef.current.click()}
            >
              Upload profile picture
            </p>
            <input
              type="file"
              ref={profileRef}
              hidden
              onChange={addProfilePic}
            />
          </div>
          <div className="auth">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h6>
              Usernames can only use letters, numbers, underscores and periods.
            </h6>
          </div>
        </div>
        <div className="setup-footer">
          <button className="intro-button btn-positive save">
            <h5>
              <b>Save Changes</b>
            </h5>
          </button>
        </div>
      </form>
    </>
  );
}

export default SetUp;
