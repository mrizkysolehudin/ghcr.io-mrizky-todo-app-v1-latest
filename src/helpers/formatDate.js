import moment from "moment/moment";
import 'moment/locale/id';

moment.locale('id');
export const formatDate = ({ dateTime }) => {
  if (dateTime) {
    return moment(dateTime).format('DD MMM YYYY HH:mm');
  }
} 