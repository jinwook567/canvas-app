import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import useAsset from '../../../../hooks/useAsset';
import { KonvaTextConfig } from '../../../../types/editor';

function TextAssetList() {
  const { appendAsset, createNodeConfig } = useAsset();

  const handleAppendText = ({
    fontSize,
    fontFamily,
    text,
  }: Pick<KonvaTextConfig, 'fontSize' | 'fontFamily' | 'text'>) => {
    const nodeConfig = createNodeConfig({
      type: 'text',
      text,
      fontSize,
      fontFamily,
    });
    appendAsset(nodeConfig);
  };

  const textAssets = [
    {
      fontSize: 15,
      fontFamily: 'sans-serif',
      text: '텍스트 상자',
      buttonText: <Typography variant="body1">텍스트 상자 추가</Typography>,
    },
    {
      fontSize: 42,
      fontFamily: 'sans-serif',
      text: '제목 추가',
      buttonText: <Typography variant="h3">제목 추가</Typography>,
    },
    {
      fontSize: 35,
      fontFamily: 'sans-serif',
      text: '부제목 추가',
      buttonText: <Typography variant="h5">부제목 추가</Typography>,
    },
    {
      fontSize: 13,
      fontFamily: 'sans-serif',
      text: '본문 텍스트 추가',
      buttonText: <Typography variant="body2">본문 텍스트 추가</Typography>,
    },
  ];

  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={2}>
      {textAssets.map(({ fontSize, fontFamily, text, buttonText }) => (
        <Button
          key={text}
          onClick={() => handleAppendText({ fontSize, fontFamily, text })}
          variant="outlined"
        >
          {buttonText}
        </Button>
      ))}
    </Grid>
  );
}

export default TextAssetList;
