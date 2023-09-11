export const getErrorText = (address: string, isValid: boolean) => {
  if (isValid) {
    return '';
  }

  return !address ? 'Поле обязательно' : 'Адрес не найден';
};
