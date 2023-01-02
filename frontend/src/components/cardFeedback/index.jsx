import { useState, useRef, useEffect } from 'react'
import './styles.css'
import { Button } from 'react-bootstrap'

//auth context
import ContextAuth from '../../contexts/provider/auth'
//chat context
import { ContextChat } from '../../contexts/chat/chatContext'

//Api
import Api from '../../services/api'

//error handling
import { errorHandling } from '../../helpers/errorHandling'

export default function CardFeedback(){

    const [questions, setQuestions] = useState([])
    const [contentTextarea, setContentTextarea] = useState('')

    const { setCardFeedback } = ContextChat()

    const { id, socket } = ContextAuth()

    const questionOne = useRef(),
        questionTwo = useRef(),
        questionThree = useRef(),
        thanksCard = useRef()
    
    //element progress line
    const progressLine = useRef()

    //show each question accords with actions of user
    useEffect(() => {
        
        //function set hide(display=none) components of questions
        function hideQuestion(currentQuestion){
            var elements = [questionOne, questionTwo, questionThree]

            if(currentQuestion){
                elements.forEach( question => {
                    if(question.current !== currentQuestion) question.current.style.display = 'none'
                })
            }else{
                elements.forEach( question => {
                    question.current.style.display = 'none'
                })
            }

        }


        if(questions.length === 0){
            questionOne.current.style.display = 'flex'

            progressLine.current.style.width = '33%'
            
        }else if(questions.length === 1){
            
            progressLine.current.style.width = '60%'
            
            hideQuestion(questionTwo.current)
            questionTwo.current.style.display = 'flex'
        }else if(questions.length === 2){
            
            progressLine.current.style.width = '100%'
            
            hideQuestion(questionThree.current)
            questionThree.current.style.display = 'flex'

        }

    }, [questions])

    const options_questionTwo = [
        'sim, eu amo esse chat!',
        'talvez',
        'não',
        'nem pagando, ele é péssimo!'
    ]

    //put evaluation to database
    async function handleEvaluation(){

        //hide evaluation input
        questionThree.current.style.display = 'none'
        thanksCard.current.style.display = 'flex'

        if((questions[0] || !questions[0]) && questions[1]){
            try{

                //emit update in evaluations
                socket.emit('updateEvaluations')//socket of connection with dashboard component

                var response = await Api.post('/chat/evaluation-chat', {
                    userId: id, 
                    questionOne: questions[0],
                    questionTwo: questions[1],
                    content: contentTextarea
                })

            }catch(error){
                errorHandling(error, 'cardFeedback')
            }

        }

    }

    return(
        <div className="cardFeedbackFirst">
            <div className="cardFeedback">
                <div className="btnCloseFeedback" onClick={() => setCardFeedback(false)}>
                    <p>x</p>
                </div>
                <div className="bodyFeedback">
                    <header>
                        O chat Aleksey quer ouvir a sua opinião
                    </header>
                    <div className="bodyQuestions">
                        <div className="progressElement">
                            <div ref={progressLine}></div>
                        </div>
                        <div className="cardQuestions">

                            <div ref={questionOne} className="questionOne" style={{display: 'none'}}>
                                <p>1. Você gosta do chat Aleksey</p>
                                <ul>
                                    <li onClick={e => setQuestions([true])}><p>Sim</p></li>
                                    <li onClick={e => setQuestions([false])}><p>Não</p></li>
                                </ul>
                            </div>
                            <div ref={questionTwo} className="questionTwo" style={{display: 'none'}}>
                                <p>2. Você nos recomendaria para alguém?</p>
                                <ul>
                                    {
                                        options_questionTwo.map( (option, index) => (
                                            <li key={index} onClick={() => setQuestions([...questions, option])}>
                                                <p>{option}</p>
                                            </li>
                                        ))    
                                    }
                                </ul>
                            </div>
                            <div ref={questionThree} className="questionThree" style={{display: 'none'}}>
                                <p>3. Quer explicar a sua resposta? {'(opcional)'}</p>
                                <textarea 
                                    style={{
                                        width: '100%', 
                                        border: '1px solid gray',
                                        height: '130px',
                                        borderRadius: '2px',
                                        resize: 'none',
                                        fontSize: '12px'
                                    }}
                                    onChange={e => setContentTextarea(e.target.value)}
                                    value={contentTextarea}
                                > 
                                escreva aqui              
                                </textarea>
                            </div>

                            <div ref={thanksCard} className='thanksCardEvaluation'>
                                <div>
                                    <small>Clóvis Agradece &#128513;</small>
                                    <img src="/img/congratulations.png" alt="congratulations" />
                                </div>
                            </div>

                        </div>
                        <footer>
                            <img src="/img/chatIcon.png" alt="logo" />
                            {
                                questions.length === 2 
                                ?<Button onClick={() => [handleEvaluation(),setQuestions([...questions, contentTextarea])]}>enviar</Button> 
                                :<p>desenvolvido por Clóvis Aleksey</p>
                            }
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )

}