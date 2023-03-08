import React from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
  onSubmit: (files: FileList | null) => void;
};

function ImageUpload({ onSubmit }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSubmit(e.target.files);
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
