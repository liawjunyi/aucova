import { useState } from "react";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState();
  const takePhoto = async (e) => {
    setPhotos();
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    setPhotos(photo);
  };

  return {
    takePhoto,
    photos,
  };
}
