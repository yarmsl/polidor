import { FC, memo } from 'react';

import { Box } from '@mui/material';

import ProjectCard from '~/UI/atoms/ProjectCard';
import { SkeletonProjectCard } from '~/UI/atoms/ProjectCard/SkeletonProjectCard';

interface IProjectsDrawerProps {
  projects?: IProject[];
  isLoading?: boolean;
}

const ProjectsDrawer: FC<IProjectsDrawerProps> = ({ projects, isLoading }) => {
  return (
    <Box sx={styles.cards}>
      {isLoading
        ? [0, 1, 2].map((n) => <SkeletonProjectCard key={n} />)
        : projects?.map((project) => <ProjectCard key={project._id} project={project} />)}
    </Box>
  );
};

const styles: TStyles = {
  cards: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
    gap: '15px',
  },
};

ProjectsDrawer.displayName = 'ProjectsDrawer';
export default memo(ProjectsDrawer);
