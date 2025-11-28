export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getRandomRotation = (): number => {
  // Returns a random number between -3 and 3
  return Math.random() * 6 - 3;
};