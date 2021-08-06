// subtract 2 dates and return day difference

const day2ms = 8.64*10**7;

function dateSubtract(date1, date2) {

}

function strDateSubtract(strDate1, strDate2) {
  return Math.floor(Math.abs((
    new Date(strDate1).getTime()
    - new Date(strDate2).getTime()
  ) / day2ms));
}

export { dateSubtract, strDateSubtract };