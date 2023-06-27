export const str2rusDate = (str: string): string | null => {
  const date = new Date(str);
  if (date instanceof Date)
    return date.toLocaleString('ru', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  return null;
};
