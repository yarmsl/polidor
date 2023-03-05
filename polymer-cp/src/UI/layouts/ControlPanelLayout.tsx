import { ReactElement, memo, useCallback, useMemo, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TagIcon from '@mui/icons-material/Tag';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';

import { ReactComponent as Logo } from '~/assets/Logo.svg';
import { logout } from '~/modules/Auth/store';
import { useAppDispatch, useAppSelector } from '~/store';

const pages = [
  {
    title: 'Панель Управления',
    path: '/',
    icon: <AdminPanelSettingsRoundedIcon />,
    access: 'user',
  },
  {
    title: 'Управление Пользователями',
    path: '/user_managment',
    icon: <GroupRoundedIcon />,
    access: 'admin',
  },
  {
    title: 'Теги (Проекты)',
    path: '/tags',
    icon: <TagIcon />,
    access: 'user',
  },
  {
    title: 'Заказчики (Проекты)',
    path: '/customers',
    icon: <AssignmentIndRoundedIcon />,
    access: 'user',
  },
  {
    title: 'Проекты',
    path: '/projects',
    icon: <EngineeringRoundedIcon />,
    access: 'user',
  },
  {
    title: 'Статьи (Инжиниринг)',
    path: '/ind_des_engin_articles',
    icon: <DesignServicesIcon />,
    access: 'user',
  },
  {
    title: 'Статьи (Производство)',
    path: '/production',
    icon: <PrecisionManufacturingIcon />,
    access: 'user',
  },
  {
    title: 'История (О компании)',
    path: '/stories',
    icon: <HistoryEduIcon />,
    access: 'user',
  },
  {
    title: 'Статьи (О компании)',
    path: '/story_articles',
    icon: <InfoIcon />,
    access: 'user',
  },
  {
    title: 'Вакансии',
    path: '/vacancies',
    icon: <PersonSearchIcon />,
    access: 'user',
  },
  {
    title: 'Баннеры',
    path: '/banners',
    icon: <ViewCarouselIcon />,
    access: 'user',
  },
  {
    title: 'Файл презентации',
    path: '/presentation',
    icon: <FilePresentIcon />,
    access: 'admin',
  },
  {
    title: 'Почта',
    path: '/mail',
    icon: <AlternateEmailIcon />,
    access: 'admin',
  },
];

const ControlPanelLayout = ({ children }: Child): ReactElement => {
  const { role } = useAppSelector((st) => st.auth);
  const dispatch = useAppDispatch();
  const [burger, setBurger] = useState(false);
  const router = useHistory();
  const match = useRouteMatch();
  const title = useMemo(
    () => pages?.find((page) => page.path === match.path)?.title || 'Панель Управления',
    [match],
  );

  const handleListItemClick = useCallback(
    (path: string) => () => {
      setBurger(false);
      setTimeout(() => router.push(path), 100);
    },
    [router],
  );

  return (
    <Container maxWidth={false} sx={styles.root} disableGutters>
      <AppBar>
        <Toolbar>
          <IconButton size='large' onClick={() => setBurger(true)}>
            <MenuRoundedIcon />
          </IconButton>
          <Typography color='gray' sx={{ ml: '32px' }} variant='h5'>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={burger}
        onClose={() => setBurger(false)}
        onOpen={() => setBurger(true)}
      >
        <List>
          <ListItem sx={styles.back}>
            <IconButton onClick={() => router.push('/')}>
              <Logo />
            </IconButton>
            <IconButton size='large' onClick={() => setBurger(false)}>
              <ArrowBackRoundedIcon />
            </IconButton>
          </ListItem>
          {pages?.map((page, i) => {
            return (
              <ListItemButton
                key={`page-${i}`}
                disabled={page.access === 'admin' && role === 'user'}
                selected={match.path === page.path}
                onClick={handleListItemClick(page.path)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText>{page.title}</ListItemText>
              </ListItemButton>
            );
          })}
          <ListItemButton onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Выйти</ListItemText>
          </ListItemButton>
        </List>
      </SwipeableDrawer>
      <>{children}</>
    </Container>
  );
};

const styles: TStyles = {
  root: {
    width: '100%',
    height: 'auto',
    pt: '64px',
  },
  back: {
    height: '56px',
    display: 'flex',
    justifyContent: 'space-between',
  } as const,
};

export default memo(ControlPanelLayout);
