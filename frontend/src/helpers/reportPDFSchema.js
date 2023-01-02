import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function reportPDFSchema(button){
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs 

    //formating words and paragraphs
    /*var words = reportContent.split(' ').filter( word => word !== "")
    
    var intNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    var wordsForLine = 8 
    
    words.forEach( (word, index) => {
        
        if(intNumbers.some( n => index === wordsForLine * n) || index == words.length-1){
            var currentIndex = index - wordsForLine
            var line = ''
            for(var i = currentIndex; i < index; i++){
                line += words[i]+' '
            }
            paragraphs.push(line)
            line = ''
            console.log(index)
        }
        
    })
    
    console.log(paragraphs)*/
    //

    //read blob
        //test
    //

    const reportTitle = [
        {
            text: 'Chat Aleksey',
            bold: true,
            color: '#2196F3',
            margin: 5
        }
    ]

    const reportBody = [

    ]

    const reportFooter = []

    const pdfDefinitions = {
        pageSize: 'A4',
        pageMargins: ['15', '20', '20', '15'],
        header: reportTitle,
        content: reportBody,
        footer: reportFooter
    }

    button.name === 'generate'
    ? pdfMake.createPdf(pdfDefinitions).download()
    : pdfMake.createPdf(pdfDefinitions).open()

}