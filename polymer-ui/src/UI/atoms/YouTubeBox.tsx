import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

interface IYouTubeBoxProps {
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  title: string;
}

const YouTubeBox: FC<IYouTubeBoxProps> = ({ embedId, autoplay, mute, title }) => {
  const [height, setHeight] = useState(480);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const getHeightFromWidth = useCallback((width: number) => Math.ceil((width * 9) / 16), []);

  useEffect(() => {
    if (boxRef !== null && boxRef.current) {
      setHeight(getHeightFromWidth(boxRef.current.clientWidth));
    }
  }, [getHeightFromWidth]);

  return (
    <Box ref={boxRef} sx={{ width: '100%' }}>
      <iframe
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        frameBorder='0'
        height={height}
        src={`https://www.youtube.com/embed/__ioxJz4NAY?autoplay=${+autoplay}&mute=${+mute}`}
        title={title}
        width='100%'
        allowFullScreen
      />
    </Box>
  );
};

export default memo(YouTubeBox);
