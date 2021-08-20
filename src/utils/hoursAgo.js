export const hoursAgo = h => {
  return new Date().getTime() - 1000 * 60 * 60 * h;
};
