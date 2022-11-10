
//format date
export const formatDate = (currentDate) => {
    var date = new Date(Date.parse(currentDate)),
        
        formatDay = date.getDate().toString().length === 1? 
            '0'+date.getDate().toString(): date.getDate(),
            
        month = date.getMonth()+1, 

        formatMonth = month.toString().length === 1? 
        '0'+month.toString():month,
        //formatMonth = date.getMonth().toString().length === 1? 
        //'0'+date.getMonth().toString():date.getMonth(),
        
        format = `${formatDay}/${formatMonth}/${date.getFullYear()}`
    
    return format
}

//check same week beetwen dates
export const checkSameWeek = (currentDate) => {

    //date for checked
    var date = Date.parse(currentDate)

    //date of system
    //var dateSys = Date.parse(new Date())
    var dateSys = Date.parse(new Date(new Date().setHours(0, 0, 0, 0)))
    //one day in miliseconds
    var dayInMS = 86400000

    //time in miliseconds
        // 0 - sunday , 1 - monday , 2 - tuesday , 3 - wednesday
        // 4 - thursday , 5 - friday , 6 - sartuday 
    const numbersAccordsDays = {
        0: dateSys,
        1: dateSys - dayInMS,
        2: dateSys - (2 * dayInMS),
        3: dateSys - (3 * dayInMS),
        4: dateSys - (4 * dayInMS),
        5: dateSys - (5 * dayInMS),
        6: dateSys - (6 * dayInMS),
    }

    return date >= numbersAccordsDays[new Date(dateSys).getDay()]

    //under construction

}