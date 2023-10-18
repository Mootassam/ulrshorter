import moment from "moment";

class Date {
  static createdAt() {
    const format = moment().format("MMM-DD-YYYY");
    return format
  }
}

export default Date;
