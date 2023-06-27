import { useMemo, useCallback } from 'react';
import { DeepPartial } from 'react-hook-form';

import { SERVER_URL, UI_URL } from '~/lib/constants';
import { useGetAllProjectsQuery } from '~/modules/Project/store';
import ListCell from '~/UI/atoms/ListCell';

export const useYoutubeVideoTableConf = () => {
  const getProjectsListData = useCallback(
    (projects: IProject[]) =>
      projects?.map((project) => ({
        src: project.images?.[0] ? `${SERVER_URL}/${project.images?.[0]}` : undefined,
        title: project.title,
        onClick: () => window.open(`${UI_URL}/project/${project.slug}`, '_blank'),
      })) || [],
    [],
  );

  const { data: projects } = useGetAllProjectsQuery();

  const projectsItems = useMemo(
    () =>
      projects?.map((project) => ({
        src: project.images?.[0],
        label: project.title,
        value: project._id,
      })) || [],
    [projects],
  );

  const tableConfig: ISuperTableConfig<IYoutubeVideoFull>[] = useMemo(
    () => [
      {
        id: 'title',
        title: 'Название',
      },
      {
        id: 'embedId',
        title: 'Id видео',
      },
      {
        id: 'isMain',
        title: 'На главной',
        type: 'boolean',
      },
      {
        id: 'autoplay',
        title: 'Autoplay',
        type: 'boolean',
      },
      {
        id: 'mute',
        title: 'Без звука',
        type: 'boolean',
      },
      {
        id: 'projects',
        title: 'Проекты',
        render: ({ projects }) => (
          <ListCell listData={getProjectsListData(projects)} title='Проекты' />
        ),
      },
    ],
    [getProjectsListData],
  );

  const formConfig: ISuperFormConfig<IYoutubeVideoDto>[] = useMemo(
    () => [
      { name: 'title', required: true, label: 'Название', defaultValue: '' },
      { name: 'embedId', required: true, label: 'Id видео', defaultValue: '' },
      { name: 'isMain', label: 'На главной', defaultValue: false, type: 'boolean' },
      { name: 'autoplay', label: 'Autoplay', defaultValue: true, type: 'boolean' },
      { name: 'mute', label: 'Без звука', defaultValue: true, type: 'boolean' },
      {
        name: 'projects',
        label: 'Проекты',
        defaultValue: [],
        type: 'multiselect',
        selectItems: projectsItems,
      },
    ],
    [projectsItems],
  );

  const defaultValues = formConfig.map(({ name, defaultValue }) => ({
    [name]: defaultValue,
  })) as DeepPartial<IYoutubeVideoDto>;

  return { tableConfig, formConfig, defaultValues };
};
