import { useMemo, useCallback } from 'react';
import { DeepPartial } from 'react-hook-form';

import { SERVER_URL, UI_URL } from '~/lib/constants';
import { onlyDigits } from '~/lib/rules/pattern';
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

  const tableConfig: ISuperTableConfig<ITag>[] = useMemo(
    () => [
      {
        id: 'name',
        title: 'Тег',
      },
      {
        id: 'slug',
        title: 'URL slug',
      },
      {
        id: 'order',
        title: 'Порядковый номер',
        type: 'number',
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

  const formConfig: ISuperFormConfig<ITagDto>[] = useMemo(
    () => [
      { name: 'name', required: true, label: 'Тег', defaultValue: '' },
      { name: 'slug', required: true, label: 'URL slug', defaultValue: '' },
      {
        name: 'order',
        label: 'Порядковый номер',
        defaultValue: '',
        type: 'number',
        rules: {
          pattern: onlyDigits(),
        },
      },

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
  })) as DeepPartial<ITagDto>;

  return { tableConfig, formConfig, defaultValues };
};
