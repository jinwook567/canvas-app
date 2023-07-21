import React from 'react';

type Props = {
  onComplete: (base64Image: string) => void;
};

function ImageUpload({ onComplete }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        readImageFileAsURL(files[i], onComplete);
      }
    }
  };

  return (
    <input
      hidden
      accept="image/*"
      multiple
      type="file"
      onChange={handleChange}
    />
  );
}

function readImageFileAsURL(file: File, callback: (result: string) => void) {
  const reader = new FileReader();
  reader.onloadend = () => {
    if (reader.result) {
      if (reader.result instanceof ArrayBuffer) {
        callback(Buffer.from(reader.result).toString('base64'));
      } else {
        callback(reader.result);
      }
    }
  };
  reader.readAsDataURL(file);
}

export default ImageUpload;
