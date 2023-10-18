import moment from "moment";

class Date {
  static createdAt(date: string) {
    const format = moment(date).format("MMM-DD-YYYY");
    return format
  }
}

export default Date;
