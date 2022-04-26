import React, { useEffect, useRef } from "react";
import "./UploadModal.css";
import { usePhotoGallery } from "../../../hooks/usePhotoGallery";

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { storage } from "../../../firebase";
function UploadModal({
  showUpload,
  setShowUpload,
  uploadClicked,
  setInput,
  input,
}) {
  function dataURLtoFile(dataUrl, fileName) {
    var arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }
  const fileUploadRef = useRef(null);
  const uploadFile = async (e) => {
    const reader = new FileReader();

    const file = e.target.files[0];
    console.log(file);
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent) => {
      if (uploadClicked === "upload") {
        const imagesRef = ref(storage, `receipts/${file.name}`);
        uploadBytesResumable(
          imagesRef,
          dataURLtoFile(readerEvent.currentTarget.result, file.name)
        )
          .then(() => getDownloadURL(imagesRef))
          .then((url) =>
            setInput((prev) => {
              return {
                ...prev,
                receipts: [
                  ...prev.receipts,
                  {
                    filePath: file.name,
                    webPath: url,
                  },
                ],
              };
            })
          );

        // uploadTask.on("state_changed", (snapshot) => {
        //   const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log(prog);
        // });
      } else {
        const imagesRef = ref(storage, `certificate/${file.name}`);
        uploadBytesResumable(
          imagesRef,
          dataURLtoFile(readerEvent.currentTarget.result, file.name)
        )
          .then(() => getDownloadURL(imagesRef))
          .then((url) =>
            setInput((prev) => {
              return {
                ...prev,
                certificate: {
                  ...prev.certificate,
                  img: [
                    ...prev.certificate.img,
                    {
                      filePath: file.name,
                      webPath: url,
                    },
                  ],
                },
              };
            })
          );

        // uploadTask.on("state_changed", (snapshot) => {
        //   const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log(prog);
        // });
      }
    };
    setShowUpload(false);
  };

  const { takePhoto, photos } = usePhotoGallery();
  useEffect(() => {
    if (photos) {
      if (uploadClicked === "upload") {
        console.log(photos.dataUrl);

        const fileName = new Date().getTime() + ".png";
        console.log(dataURLtoFile(photos.dataUrl, fileName));
        const imagesRef = ref(storage, `receipts/${fileName}`);

        uploadString(imagesRef, photos.dataUrl, "data_url").then((snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(prog);
        });

        setInput((prev) => {
          return {
            ...prev,
            receipts: [
              ...prev.receipts,
              {
                filepath: fileName,
              },
            ],
          };
        });
      } else {
        setInput((prev) => {
          const fileName = new Date().getTime() + ".png";
          const imagesRef = ref(storage, `certificate/${fileName}`);
          const uploadTask = uploadBytesResumable(imagesRef, photos.webPath);
          uploadTask.on("state_changed", (snapshot) => {
            const prog =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(prog);
          });
          return {
            ...prev,
            certificate: {
              ...prev.certificate,
              img: [...prev.certificate.img, { filepath: fileName }],
            },
          };
        });
      }
    }
  }, [photos]);

  return (
    <>
      <div>
        <div className={`upload-modal ${showUpload ? "show" : "hide"}`} />
        <div className={`upload-modal-content ${showUpload ? "show" : "hide"}`}>
          <div className="upload-modal-body">
            <div
              className="upload-button"
              onClick={() => {
                takePhoto();

                setShowUpload(false);
              }}
            >
              Take a photo
            </div>
            <div
              className="upload-button"
              onClick={() => fileUploadRef.current.click()}
            >
              Upload from phone
            </div>
            <input
              type="file"
              onChange={uploadFile}
              hidden
              ref={fileUploadRef}
            />
            <div
              className="cancel-button"
              onClick={(e) => {
                e.preventDefault();
                setShowUpload(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadModal;
