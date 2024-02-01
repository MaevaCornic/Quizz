import { useContext, useState } from 'react'

import { Box, Text, useDisclosure, } from '@chakra-ui/react'

// Compnent import
import ParametersOfTheQuizz from './ParameterOfTheQuizz';
import NextPage from './NextPage';
import QuizzItem from './QuizzItem';
import Result from './Result';
import { AppContext } from './AppContext';
import { updatePoints } from '../fetch';
import HeaderBar from './HeaderBar';

export default function Index() {

    // useContext
    const { user, setUser } = useContext(AppContext)

    // useState
    const [questions, setQuestions] = useState([])
    const { onClose } = useDisclosure()
    // To hide the button "valider" or the icon button
    const [isResponseSubmitted, setIsResponseSubmitted] = useState(false)
    // To show the message of good or wrong answer
    const [isGoodAnswer, setIsGoodAnswer] = useState(false)
    // To stock the good answers
    const [goodAnswers, setGoodAnswers] = useState(0)
    const [isScoreShowed, setIsScoreShowed] = useState(false)
    // To handle the button next page at the end of the quizz
    const [isFinished, setIsFinished] = useState(false)
    // Pagination to get a question per div 
    const [currentQuestionNumber, setcurrentQuestionNumber] = useState(1);
    const actualQuestion = questions[currentQuestionNumber - 1]

    // Functions
    // To handle the next question page + the submit "prochaine question" 
    const handleNextPage = () => {
        setcurrentQuestionNumber(currentQuestionNumber + 1)
    };

    const onSubmitNextPage = () => {
        handleNextPage()
        setIsResponseSubmitted(false)
        setIsGoodAnswer(false)
    }

    const handleItemSuccess = () => {
        setGoodAnswers((prevState) => (prevState + 1))
    }

    // To initialize everything to zero when a user configure a quizz 
    const handleSubmitParams = (data) => {
        setQuestions(data)
        setIsFinished(false)
        setIsScoreShowed(false)
        setcurrentQuestionNumber(1)
        setIsGoodAnswer(false)
        setIsResponseSubmitted(false)
        setGoodAnswers(0)
        onClose()
    }

    // To handle the score 
    const endOfTheQuizz = async () => {
        setIsFinished(true)
        setIsScoreShowed(true)
        const response = await updatePoints(user?.id, user?.points)
        setUser(response)
    }

    return (

        <>
            <HeaderBar questions={questions} setQuestions={setQuestions} />

            {
                actualQuestion?.id ?
                    <>
                        <Box mt={10} boxShadow="xl" borderWidth={1} p={8} bg="#F8EBD0" borderRadius={10} width="700px">
                            <Text textAlign="left" fontStyle="italic" mt={3}>Question n°{currentQuestionNumber}/{questions.length}</Text>

                            <QuizzItem item={actualQuestion} isResponseSubmitted={isResponseSubmitted} setIsResponseSubmitted={setIsResponseSubmitted} onSuccess={handleItemSuccess} currentQuestionNumber={currentQuestionNumber} totalQuestions={questions.length} onFinish={endOfTheQuizz} isGoodAnswer={isGoodAnswer} setIsGoodAnswer={setIsGoodAnswer} />

                            {!isFinished &&
                                <NextPage onSubmitNextPage={onSubmitNextPage} isResponseSubmitted={isResponseSubmitted} />
                            }
                            {isScoreShowed &&
                                <Result goodAnswers={goodAnswers} totalQuestions={questions.length} />
                            }
                        </Box>

                    </> : <ParametersOfTheQuizz onSubmitParams={handleSubmitParams} />
            }
        </>
    )
}
