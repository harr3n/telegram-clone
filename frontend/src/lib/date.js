export const getTimeString = (dateString) => {
  const date = new Date(dateString);
  let hrs = date.getHours();
  let min = date.getMinutes();

  hrs = hrs < 10 ? `0${hrs}` : hrs;
  min = min < 10 ? `0${min}` : min;

  return `${hrs}:${min}`;
};
