function parseToCommonTime(time: string) {
  if(time.length !== 8) {
    return time;
  }

  return time.substring(0, 5);
}

export {
  parseToCommonTime
};