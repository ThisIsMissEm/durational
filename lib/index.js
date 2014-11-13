var FORMAT_REGEXP = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

function matchToInteger(match){
  return match === undefined ? 0 : parseInt(match, 10);
}

exports.fromSeconds = function(seconds){
  if(typeof seconds !== "number"){
    throw new TypeError("Argument `seconds` must be a number");
  }

  var fullSeconds = seconds % 60;
  var fullMinutesInSeconds = (seconds - fullSeconds) % 3600;

  return {
    hours: (seconds - fullSeconds - fullMinutesInSeconds) / 3600,
    minutes: fullMinutesInSeconds / 60,
    seconds: fullSeconds
  }
}

exports.fromString = function(string){
  if(typeof string !== 'string'){
    throw new TypeError('Argument `string` must be a string');
  }

  var matches = string.match(FORMAT_REGEXP)
  if(matches === null || (matches[1] === undefined && matches[2] === undefined && matches[3] === undefined)){
    throw new Error('Could not parse "' + string + '" as a duration.')
  }

  return {
    hours:   matchToInteger(matches[1]),
    minutes: matchToInteger(matches[2]),
    seconds: matchToInteger(matches[3])
  }
}

exports.toString = function(duration) {
  if(typeof duration === 'number'){
    duration = exports.fromSeconds(duration);
  }

  var result = "PT";

  if(duration.hours > 0){
    result += duration.hours + "H";
  }
  if(duration.minutes > 0){
    result += duration.minutes + "M";
  }
  if(duration.seconds > 0){
    result += duration.seconds + "S";
  }

  if(result === 'PT'){
    result += '0S';
  }

  return result;
};

exports.toSeconds = function(stringOrDuration) {
  var duration = stringOrDuration;

  if(typeof stringOrDuration === 'string') {
    duration = exports.fromString(stringOrDuration);
  }

  return duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
};
