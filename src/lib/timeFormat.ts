
function formatTime(stringTime:string):Date{
    const [weekday, month, day, year] = stringTime.split(" ");

    const formattedTime = new Date(Date.UTC(
      parseInt(year, 10),
      new Date(Date.parse(month + " 1, 2020")).getMonth(), // Convert month name to month index
      parseInt(day, 10)
    ));
    return formattedTime
}

export default formatTime

