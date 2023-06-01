export const addSpacesToString = (inputString: string) => {
  const pattern = /(\d)(?=(\d{3})+(?!\d))/g;
  return inputString.replace(pattern, '$1 ');
};
