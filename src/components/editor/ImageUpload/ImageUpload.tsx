import React from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
  onComplete: (files: File) => void;
};

function ImageUpload({ onComplete }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        onComplete(files[i]);
      }
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: '4px' }}
      startIcon={<FileUploadIcon />}
      component="label"
    >
      이미지 업로드
      <input
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleChange}
      />
    </Button>
  );
}

export default ImageUpload;
