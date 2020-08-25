const makeTimeSeries = (trx) => {
    var timeseries = []
    var date = []
    var sum = 0
    var prev = 'string';
    trx.forEach(element => {
        if(element.date === prev){
            sum += element.amt
            prev = element.date
        } else {
            timeseries.push(sum)
            date.push(element.date)
            sum = 0
            sum += element.amt
            prev = element.date
        }
        
    });
    console.log('time series and date')
    console.log(timeseries)
    console.log(date)
    timeseries.push(sum);
    return { labels: [date], series: [timeseries] };
}

export { makeTimeSeries }

