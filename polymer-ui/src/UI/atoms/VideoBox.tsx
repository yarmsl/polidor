import { FC, memo } from 'react';

import KinescopePlayer from '@kinescope/react-kinescope-player';
import { Box } from '@mui/material';

interface IVideoBoxBoxProps {
  embedId: string;
  autoplay: boolean;
  mute: boolean;
  title: string;
  onEnded?: () => void;
}

const VideoBox: FC<IVideoBoxBoxProps> = ({ embedId, autoplay, mute, title, onEnded }) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16/9',
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <KinescopePlayer
        autoPlay={autoplay}
        muted={mute}
        title={title}
        videoId={embedId}
        onEnded={onEnded}
      />
    </Box>
  );
};

export default memo(VideoBox);
