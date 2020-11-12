export const renderBool = (song, bool) => {
  return song[`${bool}`] ? 'Yes' : 'No';
};

export const renderText = (list, v) => {
  return v || v === 0 ? list.find((k) => k[v])[v] : null;
};

export const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const sec2time = (timeInSeconds) => {
  var pad = function(num, size) {
      return ('000' + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return pad(minutes, 2) + ':' + pad(seconds, 2);
};

export const audioFeaturesToText = (feature) => {
  switch (true) {
    case feature === null:
      return 'N/A';

    case feature <= 0.35:
      return 'low';

    case feature > 0.35 && feature <= 0.7:
      return 'medium';

    case feature > 0.7:
      return 'high';

    default:
      return 'N/A';
  }
};