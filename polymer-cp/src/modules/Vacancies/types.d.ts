interface IVacancy extends IVacancyDto, IBase {}

interface IVacancyDto {
  title: string;
  requirements: string;
  wage: number;
}
