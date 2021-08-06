// return -1 if d1 < d2; 0 if d1 = d2; 1 if d1 > d2

function strDateCompare(strDate1, strDate2) {
  const diff = new Date(strDate1).getTime() - new Date(strDate2).getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return 0;
  }
}

export { strDateCompare };