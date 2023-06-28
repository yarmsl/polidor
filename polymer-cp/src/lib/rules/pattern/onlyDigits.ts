export const onlyDigits = (message = 'Только цифры') => ({
  value: /^[0-9]*$/,
  message,
});
