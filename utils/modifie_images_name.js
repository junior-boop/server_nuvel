export const Millisecond = (millisecond, seconds) => {

	if(millisecond < 10) return `${seconds}000${millisecond}`
	if(millisecond < 100) return `${seconds}00${millisecond}`
	if(millisecond < 1000) return `${seconds}0${millisecond}`
    return `${seconds}${millisecond}`
}

export function MinutesTime(){
	const date = new Date()
	const getHour = date.getHours()
    const getMinute = date.getMinutes()
    const getMillisecond = date.getMilliseconds()
    const getSecond = date.getSeconds()

    const minuteConverts = (getHour * 60) + getMinute 
	
    const seconds = Millisecond(getMillisecond, getSecond)

	if(minuteConverts < 10) return `${seconds}000${minuteConverts}`
	if(minuteConverts < 100) return `${seconds}00${minuteConverts}`
	if(minuteConverts < 1000) return `${seconds}0${minuteConverts}`
    return `${seconds}${minuteConverts}`
}

export function DateForme(){
	const date = new Date()
	const getDate = date.getDate()
    const getMonth = date.getMonth()
    const getYears = date.getFullYear()

    const day = getDate < 10 ? `0${getDate}` : getDate
    const month = getMonth < 10 ? `0${getMonth}` : getMonth

    return `${day}${month}${getYears}`	
}


export default function Metadata_images(image){
    const object = {}
    object.size = image.size
    object.minetype = image.type
    object.lastmodified = image.lastModified
    object.originalname = image.name

    let imagetitre = `IMG${MinutesTime()}-${DateForme()}`
    
    switch (image.type) {
        case 'image/jpeg':
            object.name = imagetitre + '.jpg'
            return object
        case 'image/png':
            object.name = imagetitre + '.png'
            return object
    }
}