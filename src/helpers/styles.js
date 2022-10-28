export default function styles(obj, atrs){
    var style = []
    Object.entries(atrs).forEach(([key, value]) => {
        style.push(`${key}:${value};`)
        obj.setAttribute('style', `${style.join(' ')}`)
    })
    style = []
}//styles css