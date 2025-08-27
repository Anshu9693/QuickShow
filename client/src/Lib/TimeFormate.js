const TimeFormate = (minutes)=>{
    const hours = Math.floor(minutes/60);
    const MinutesReminder = minutes%60;
    return `${hours}h${MinutesReminder}m`
}

export default TimeFormate;