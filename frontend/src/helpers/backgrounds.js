
//property on the local storage
var key = 'chatAleksey-background'

//list of backgrounds
const backgrounds = {
    1: 'url(/img/background1.png)',
    2: 'url(/img/wallpaper2.jpg)',
    3: 'url(/img/wallpaper3.jpg)'
}

//store preference of background on the local storage
export const applyBackground = (background) => {

    localStorage.setItem(key, backgrounds[background])

}

//get background
export const getBackground = () => {
    var background = localStorage.getItem(key)

    if(typeof background === undefined || !background || background === null) return backgrounds[1]

    return background
}