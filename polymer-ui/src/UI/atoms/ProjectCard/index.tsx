import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { SERVER_URL } from '~/lib/constants';

import { styles } from './styles';

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <Box component={RouterLink} sx={styles.root} to={`/project/${project.slug}`}>
      <Box sx={styles.imgWrapper}>
        <img alt={project.title} src={`${SERVER_URL}/${project.images[0]}`} />
      </Box>
      <Typography sx={styles.title} variant='h6'>
        {project.title}
      </Typography>
      <Typography sx={styles.link}>Смотреть подробнее</Typography>
    </Box>
  );
};

ProjectCard.displayName = 'ProjectCard';
export default memo(ProjectCard);
