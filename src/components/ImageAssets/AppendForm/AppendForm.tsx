import { Button, Input } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  handleSubmit: (url: string) => void;
};

function AppendForm({ handleSubmit }: Props) {
  const [url, setUrl] = useState('');

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;
    setUrl(value);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(url);
        setUrl('');
      }}
      data-testid="image-submit"
    >
      <Input
        onChange={handleInput}
        data-testid="image-input"
        value={url}
        placeholder="이미지 url을 넣어주세요."
      />
      <Button type="submit">이미지 추가</Button>
    </form>
  );
}

export default AppendForm;
