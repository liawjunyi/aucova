import { useState, useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

export function usePhotoGallery() {
  const { input, setInput, receipts, setReceipts } = useContext(FormContext);
  const takePhoto = async (e) => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    console.log(e.target);
    const fileName = new Date().getTime() + ".jpeg";
    setReceipts((prev) => [
      ...prev,
      {
        filepath: fileName,
        webviewPath: photo.webPath,
      },
    ]);
  };

  return {
    takePhoto,
  };
}
