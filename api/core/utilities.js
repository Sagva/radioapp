const convertDateToTime = (timeString, time) => {
    let convertedDate = new Date(parseInt(timeString.replace(/[\/\(\)date]/gi, '')))
    if(time) {
        convertedDate = convertedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    } else {
        convertedDate = convertedDate.toLocaleString()
    }
    return convertedDate
}



module.exports = {
    convertDateToTime
}