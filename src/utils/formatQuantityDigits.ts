
export const formatQuantityDigits = (val: number | string) => {

  const value = Number(val)
  if (value >= 1000000) {
    return value % 1000000 === 0 ? `${(value / 1000000)}M` : `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return value % 1000 === 0 ? `${(value / 1000)}K` : `${(value / 1000).toFixed(1)}K`;
  } else {
    return Math.round(value).toString();
  }
};


