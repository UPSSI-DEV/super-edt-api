module.exports = { setupDates }


function setupDates() {

    const DAY_MS = 86400000

    Date.prototype.getWeek = function() {
        var oneJan = new Date(this.getFullYear(),0,1)
        return Math.ceil((((this - oneJan) / DAY_MS) + oneJan.getDay()) / 7)
    } 

    Date.schoolYear = function(week) {
        const now = new Date()
        let year;

        if(now.getWeek() > 34)
            year = (week > 34) ? now.getFullYear() : now.getFullYear() + 1
        else
            year = (week < 34) ? now.getFullYear() : now.getFullYear() - 1

        return year
    }

    Date.dayOfWeek = function(year, week, day) {
        const oneJan = new Date(year, 0, 1);
        const timestamp = oneJan.getTime() + DAY_MS * ((week - 1) * 7 + day - oneJan.getDay())
        
        return new Date(timestamp)
    }
}