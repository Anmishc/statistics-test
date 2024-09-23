export const calculateMean = (data) => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return sum / data.length;
};

export const calculateDeviation = (data, mean) => {
  const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
};

export const calculateMedian = (data) => {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

export const calculateMode = (data) => {
  const freqMap = {};
  data.forEach(value => {
    freqMap[value] = (freqMap[value] || 0) + 1;
  });
  const entries = Object.entries(freqMap);
  const modeEntry = entries
    .map(([value, freq]) => ({ value: Number(value), freq }))
    .reduce((max, entry) => (entry.freq > max.freq ? entry : max), { value: null, freq: 0 });

  return modeEntry.value;
};

