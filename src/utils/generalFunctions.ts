
function getformattedCurentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;
    return `${month}-${day}-${year}`;
}

function getformattedFutureDate(futureDays: number) {
    const currentDate = new Date();
    const date = new Date(currentDate.setDate(currentDate.getDate() + futureDays));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    return `${month}-${day}-${year}`;
    
}
  
  export { getformattedCurentDate, getformattedFutureDate };