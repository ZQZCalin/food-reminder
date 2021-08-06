// add n days to a certain date

import dateParser from "./dateParser";

const day2ms = 8.64*10**7;
const min2ms = 6*10**4;
const timeZoneOffset = new Date().getTimezoneOffset(); 

// @param date: Date() object
// return: Date() object
function dateAdd(date, days) {

}

// @param strDate: string "yyyy-mm-dd"
// return: string "yyyy-mm-dd"
function strDateAdd(strDate, days) {
  return dateParser(
    new Date(
      new Date(strDate).getTime() // initial date
      + days * day2ms             // day gap
      + timeZoneOffset * min2ms   // time zone correction
    )
  );
}

export { dateAdd, strDateAdd }