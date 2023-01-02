
const originalTitle = 'Chat Aleksey'

export const changeTitle = function (notifications, userId) {
    
    var number = 0

    notifications.forEach( notification => {
        notification.senderId !== userId && number++
    })

    if(number == 0){
        document.title = originalTitle
    }else{
        document.title = `${originalTitle} | ${number == 1? `${number} mensagem`: `${number} mensagens`}`
    }

}

//under construction