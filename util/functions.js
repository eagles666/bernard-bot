const getTimestamp = (date) => {
  var date = new Date(date);
  var year = date.getFullYear().toString().slice(2);
  var month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  var secondes =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${day}/${month}/${year} ${hour}:${minutes}:${secondes}`;
};

module.exports = { getTimestamp };
