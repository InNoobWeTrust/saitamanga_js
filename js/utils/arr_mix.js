export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

export const interleave = (...arrs) => {
  const maxLen = Math.max.apply(null, arrs.map(a => a.length));
  return [...Array(maxLen)]
    .map((_, i) =>
      arrs
        .map(a => a[i])
        .reduce((a, b) => (undefined == b ? a : a.concat(b)), [])
    )
    .reduce((a, b) => a.concat(b));
};
