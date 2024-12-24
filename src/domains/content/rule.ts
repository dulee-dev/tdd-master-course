export const validateTitle = (title: string): boolean => {
  const len = title.length;
  return len >= 2 && len <= 80;
};
