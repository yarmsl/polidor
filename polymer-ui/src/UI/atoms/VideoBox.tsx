import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import KinescopePlayer from '@kinescope/react-kinescope-player';
import { Box } from '@mui/material';

interface IVideoBoxBoxProps {
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  title: string;
}

const VideoBox: FC<IVideoBoxBoxProps> = ({ embedId, autoplay, mute, title }) => {
  const [isVideo, setIsVideo] = useState(true);
  const [height, setHeight] = useState(480);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const getHeightFromWidth = useCallback((width: number) => Math.ceil((width * 9) / 16), []);
  const handleInitError = useCallback(() => {
    setIsVideo(false);
  }, []);

  useEffect(() => {
    if (boxRef !== null && boxRef.current) {
      setHeight(getHeightFromWidth(boxRef.current.clientWidth));
    }
  }, []);

  return isVideo ? (
    <Box ref={boxRef} sx={{ width: '100%' }}>
      <KinescopePlayer
        autoPlay={autoplay}
        height={height}
        muted={mute}
        title={title}
        videoId={embedId}
        onInitError={handleInitError}
      />
    </Box>
  ) : null;
};

export default memo(VideoBox);
