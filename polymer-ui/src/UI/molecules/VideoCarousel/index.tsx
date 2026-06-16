import { FC, memo, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import { Navigation } from 'swiper';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import VideoBox from '~/UI/atoms/VideoBox';

interface VideoCarouselProps {
  videos?: IVideo[];
}

const VideoCarousel: FC<VideoCarouselProps> = ({ videos }) => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(1);

  const toSlide = useCallback((index: number) => swiper?.slideTo(index), [swiper]);

  if (!videos || videos?.length === 0) return null;

  if (videos.length === 1)
    return (
      <Box sx={styles.root}>
        <VideoBox
          autoplay={videos[0].autoplay}
          embedId={videos[0].embedId}
          mute={videos[0].mute}
          title={videos[0].title}
        />
      </Box>
    );

  return (
    <Box sx={styles.root}>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={1}
        spaceBetween={0}
        loop
        onSlideChange={(sl) => setSwiperIndex(sl.realIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {videos.map(({ embedId, title, mute }, i) => (
          <SwiperSlide key={i}>
            <VideoBox
              key={embedId}
              autoplay={swiperIndex === i}
              embedId={embedId}
              mute={mute}
              title={title}
              onEnded={() => toSlide(i + 1)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    '& .swiper': {
      '&-button': {
        '&-prev': {
          left: '0px',
          color: 'secondary.main',
        },
        '&-next': {
          right: '0px',
          color: 'secondary.main',
        },
      },
    },
  },
};

export default memo(VideoCarousel);
