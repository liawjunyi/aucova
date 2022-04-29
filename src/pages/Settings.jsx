import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import Header from "../components/Header";
import MenuButton from "../components/MenuButton";
import Menu from "../components/Menu";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { login, selectUser, updateUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import Modal from "../components/Settings/Modal";
import { AuthContext } from "../context/AuthContext";

function Settings() {
  const [visible, setVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [dbData, setDbData] = useState({});
  const [userData, setUserData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  //   const { setUser, user } = useContext(AuthContext);

  const handleMouseDown = () => {
    setVisible(!visible);
  };

  const profileRef = useRef(null);

  const addProfilePic = (e) => {
    const file = e.target.files[0];
    const imagesRef = ref(storage, `profilePic/${file.name}`);
    if (userData.profilePic) {
      setUserData((prev) => {
        return { ...prev, profilePic: null };
      });
      const deleteImageRef = ref(
        storage,
        `profilePic/${userData.profilePic.name}`
      );
      deleteObject(deleteImageRef);
      uploadBytes(imagesRef, file)
        .then(() => getDownloadURL(imagesRef))
        .then((url) => {
          setUserData((prev) => {
            return {
              ...prev,
              profilePic: {
                name: file.name,
                url: url,
              },
            };
          });
        });
    } else {
      uploadBytes(imagesRef, file)
        .then(() => getDownloadURL(imagesRef))
        .then((url) => {
          setUserData((prev) => {
            return {
              ...prev,
              profilePic: {
                name: file.name,
                url: url,
              },
            };
          });
        });
    }
  };

  const removeProfilePic = () => {
    setUserData((prev) => {
      return { ...prev, profilePic: null };
    });
    const deleteImageRef = ref(
      storage,
      `profilePic/${userData.profilePic.name}`
    );
    deleteObject(deleteImageRef);
  };
  const user = getAuth().currentUser;

  console.log(user);
  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateDoc(doc(db, "users", user.uid), {
      username: userData.username,
      fullname: userData.fullname,
      subscription: userData.subscription,
      profilePic: { ...userData.profilePic },
    }).then(() => alert("successfully saved"));

    if (currentPassword && newPassword && confirmPassword) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          if (newPassword === confirmPassword) {
            updatePassword(auth.currentUser, newPassword);
          } else {
            throw new Error("passwords do not match");
          }
        })
        .catch((err) => alert(err.message));
    }
  };

  //   const dispatch = useDispatch();
  //   const handleChange = (e) => {
  //     const name = e.target.name;
  //     dispatch(
  //       updateUser({
  //         ...user,
  //         [name]: e.target.value,
  //       })
  //     );
  //   };
  const fetchUserData = async () => {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("uid", "==", user.uid));
    console.log(user.uid);
    const res = await getDocs(q);

    res.forEach((doc) => {
      console.log(doc);
      console.log(doc.data());
      setDbData(doc.data());
      setUserData(doc.data());
    });
  };
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <>
      <Header
        title="AUCOVA"
        leftButton={<MenuButton handleMouseDown={handleMouseDown} />}
      />
      {console.log("initial")}
      <Menu menuVisibility={visible} handleMouseDown={handleMouseDown} />
      <Modal
        showUpload={showUpload}
        setShowUpload={setShowUpload}
        profileRef={profileRef}
        removeProfilePic={removeProfilePic}
      />
      {userData && (
        <form onSubmit={handleSubmit}>
          <div className="setup-container">
            <div className="intro-header setup">
              <h2>Settings</h2>
              <div className="settings-container">
                <div className="settings-inner-container">
                  <b>Profile</b>
                </div>

                <div className="intro-header setup">
                  <div className="setup-profile">
                    {userData.profilePic && (
                      <img
                        src={userData.profilePic.url}
                        alt=""
                        className="profile-pic"
                      />
                    )}
                    {!userData.profilePic && (
                      <img src="/fixed/DefaultProfile.svg" alt="" />
                    )}
                  </div>
                  <p
                    style={{ textDecoration: "underline" }}
                    onClick={() => setShowUpload(true)}
                  >
                    Upload profile picture
                  </p>
                </div>

                <input
                  type="file"
                  ref={profileRef}
                  hidden
                  onChange={addProfilePic}
                />

                <div className="settings">
                  <p>Username</p>
                  <input
                    autoComplete="off"
                    type="text"
                    value={userData.username}
                    name="username"
                    onChange={(e) =>
                      setUserData((prev) => {
                        return { ...prev, username: e.target.value };
                      })
                    }
                  />
                  <h6>
                    Usernames can only use letters, numbers, underscores and
                    periods.
                  </h6>
                  <p>Full Name (hidden from public)</p>
                  <input
                    autoComplete="off"
                    type="text"
                    name="fullname"
                    value={userData.fullname}
                    onChange={(e) =>
                      setUserData((prev) => {
                        return { ...prev, fullname: e.target.value };
                      })
                    }
                  />
                  <p>Email Address</p>
                  <input
                    autoComplete="off"
                    type="text"
                    value={userData.email}
                    name="email"
                    onChange={(e) => {
                      setUserData((prev) => {
                        return { ...prev, username: e.target.value };
                      });
                    }}
                  />
                  <div style={{ margin: "64px 0" }} />
                  <p>Current Password</p>
                  <input
                    autoComplete="off"
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <p>New Password</p>
                  <input
                    autoComplete="off"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p>Confirm Password</p>
                  <input
                    autoComplete="off"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ margin: "27px 0" }} />
              <div className="settings-container">
                <div className="settings-inner-container">
                  <b>Events</b>
                  <h5>
                    Would you like to be contacted via the email above when we
                    hold events?
                  </h5>
                  <p>
                    From educational talks to expert opinions on collector
                    trends and special sales showcase on collectibles.
                  </p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userData.subscription}
                        onChange={() =>
                          setUserData((prev) => {
                            return {
                              ...prev,
                              subscription: !userData.subscription,
                            };
                          })
                        }
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "#b3995b",
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: "#b3995b",
                          },
                        }}
                      />
                    }
                    label={userData.subscription ? "Yes" : "No"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ margin: "0 14px 21px" }}>
            <button className="button btn-negative">
              <h5>Discard Changes</h5>
            </button>

            <button className="button btn-positive">
              <h5>
                <b>Save Changes</b>
              </h5>
            </button>
          </div>
        </form>
      )}
      {console.log("finished rendering")}
    </>
  );
}

export default Settings;
