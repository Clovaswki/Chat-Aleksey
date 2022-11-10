
const bad = `necessita-se aplicar esforços quanto à remediação do cenário em questão, a fim de 
de contorna a insatisfatória avaliação da aplicação Chat Aleksey no que tange ao público usuário. 
Logo, algumas medidas pré-definidas, no momento de concepção deste sistema, podem ser consideradas, a
título de exemplificação, a restruturação do design das interfaces para um todo mais intuitivo viria
a calhar, haja vista que, cosoante a pesquisas consagradas de marketing e trafêgo digital no momento em que
este relatório foi produzido, aplicações web, que pautam-se em vieses cognitivos da psicologia quanto ao design das
interfaces, dispõem de uma taxa de sucesso mais do que satisfatória no que se refere à usabilidade e fidelidade. Assim, a 
eventual utilização desta medida teria o propósito central de capturar o público cativo do sistema Chat Aleksey.
`
const good = ` a interface intuitiva desta aplicação tem cativado os usuários do bate-papo, de modo a 
satisfaze-los, o que, nessa instância, constitui o epicentro dos índices satisfatórios do fluxo de avaliações
referentes à utilização, por parte do público usuário, da aplicação Chat Aleksey.
`

//formating evaluations data for create a report
export function evaluationsReport(evaluationsGraphCircle, evaluationsGraphLine, setReport) {

    const { totalUsers, like } = evaluationsGraphCircle
    const { DontLike, maybe, never } = evaluationsGraphLine

    var calcUsersLike = ((like / totalUsers) * 100).toString().split('.')[0]
    var calcLoveTheChat = ((evaluationsGraphLine.like / totalUsers) * 100).toString().split('.')[0]
    var calcDontLikeChat = ((DontLike / totalUsers) * 100).toString().split('.')[0]
    var calcMaybeLikeChat = ((maybe / totalUsers) * 100).toString().split('.')[0]
    var calcNeverLikeChat = ((never / totalUsers) * 100).toString().split('.')[0]

    //finalizar, viu clóvis 
    const conditions = {
        conditionOne: () => {
            var value = parseInt(calcUsersLike)
            var returnValue = ''

            if (value >= 50 && value <= 70) {
                returnValue = 'boa'
            } else if (value >= 70 && value <= 80) {
                returnValue = 'ótima'
            } else if (value >= 40 && value < 50) {
                returnValue = 'regular'
            } else if (value >= 20 && value < 40) {
                returnValue = 'ruim'
            } else if (value > 80) {
                returnValue = 'excelente'
            } else {
                returnValue = 'péssima'
            }

            return returnValue

        },
        conditionTwo: () => {
            var valueLove = parseInt(calcLoveTheChat)
            var valueLike = parseInt(calcUsersLike)

            return valueLove > 50 && valueLike > 50 || (valueLove >= 40 && valueLove <= 50) && valueLike > 50
                ? 'favortismo'
                : 'baixo favoritismo'

        },
        conditionThree: () => {
            //building....
        }
    }

    var condition_badOrGood = conditions.conditionTwo() === 'baixo favoritismo'

    var reportSchema = `
                A ponderação superficial das avaliações a respeito da aplicação Chat Aleksey materializam 
                uma ${conditions.conditionOne()} preferência. Ademais, cabe elencar que o espectro de variáveis inerentes ao processo de avaliação tendem ao 
                ${conditions.conditionTwo()} por este aplicativo. Nesse sentido, é válido complementar que 
                ${ condition_badOrGood ? bad: good}
            `
    setReport(reportSchema)

    //finalizar ein clovis
}