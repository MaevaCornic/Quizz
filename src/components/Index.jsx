import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'


import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure, } from '@chakra-ui/react'
import ParametersOfTheQuizz from './ParameterOfTheQuizz';
import { SettingsIcon, } from '@chakra-ui/icons';

import Quizz from './Quizz'
import Paginate from './Paginate';

export default function Index() {

    const [questions, setQuestions] = useState([])
    // State to stock all the good answers. If not on a state re-render every time and the array stays empty

    // To manage the modal of the parameter's quizz
    const { isOpen, onOpen, onClose } = useDisclosure()

    // To hide the button "valider" or the icon button
    const [isResponseSubmitted, setIsResponseSubmitted] = useState(false)

    // To show the message of good or wrong answer
    const [isGoodAnswer, setIsGoodAnswer] = useState(false)
    const [goodAnswers, setGoodAnswers] = useState([])
    const [score, setScore] = useState(0)
    const [isScoreShowed, setIsScoreShowed] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [isConfetti, setIsConfetti] = useState(false)

    // Pagination to get a question per div 
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionsPerPage] = useState(1);
    const indexOfLastQuestion = currentQuestion * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
    const nextPage = () => {
        if (currentQuestion !== Math.ceil(questions.length / questionsPerPage)) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // To initialize everything to zero when a user configure a quizz 
    const handleSubmitParams = (data) => {
        setQuestions(data)
        setIsFinished(false)
        setIsScoreShowed(false)
        setScore(0)
        setCurrentQuestion(1)
        setIsGoodAnswer(false)
        setIsResponseSubmitted(false)
        setIsConfetti(false)
        setGoodAnswers([])
        onClose()
    }

    // Elle prend en params la bonne réponse, puis va venir incrémenter une variable qui contient le total de bonnes réponses 
    const handleItemSuccess = (goodAnswer) => {
        setGoodAnswers((prevState) => {
            return [...prevState, goodAnswer]
        })
    }

    useEffect(() => {
        if (goodAnswers.length > 0) {
            setScore(Math.floor((goodAnswers?.length / questions.length) * 100))
        }

    }, [goodAnswers])

    const endOfTheQuizz = () => {
        setIsFinished(true)
        setIsScoreShowed(true)
        if (score >= 50) {
            setIsConfetti(true)
        }

    }

    // const getTotalQuizzPerTags = async (valueCategory) => {
    //     try {
    //         const data = await fetch('https://the-trivia-api.com/v2/totals-per-tag?' + new URLSearchParams({
    //             categories: valueCategory,
    //             difficulties: 'hard',
    //             tags: valueCategory,
    //             myHeaders
    //         }))

    //         const response = await data.json()
    //         console.log(response)
    //         setQuestions(response)

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const getCategories = async () => {
    //     try {
    //         const data = await fetch('https://the-trivia-api.com/v2/metadata?' + new URLSearchParams({
    //             categories: "all"
    //         }))
    //         const response = await data.json()
    //         console.log(response)
    //         // setCategories(response.byCategory)

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    // }, [])

    // const goodAnswer = (value) => {
    //     if (value === item.correctAnswer) {
    //         return true
    //     } else { return false }
    // }

    return (
        <>
            <Box display='flex' justifyContent="flex-start" pb={8} >
                <Button leftIcon={<SettingsIcon />} onClick={onOpen} colorScheme='yellow' justifyItems="left" boxShadow="2xl">Configure your quizz</Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent width="xs" >
                    <ModalBody >
                        <ParametersOfTheQuizz onSubmitParams={handleSubmitParams} />
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            {currentQuestions.map((question) => (
                <Box key={question.id} borderWidth={1} p={8} bg="#E3EBFF" borderRadius={10} width="700px">
                    <Text textAlign="left" fontStyle="italic" mt={3}>Question n°{currentQuestion}/{questions.length}</Text>

                    <Quizz item={question} isResponseSubmitted={isResponseSubmitted} setIsResponseSubmitted={setIsResponseSubmitted} onSuccess={handleItemSuccess} indexOfLastQuestion={indexOfLastQuestion} currentQuestion={currentQuestion} questions={questions} totalQuestions={questions.length} onFinish={endOfTheQuizz} isGoodAnswer={isGoodAnswer} setIsGoodAnswer={setIsGoodAnswer} />

                    {!isFinished &&
                        <Paginate questionsPerPage={questionsPerPage} totalQuestions={currentQuestions.length} nextPage={nextPage} isResponseSubmitted={isResponseSubmitted} setIsResponseSubmitted={setIsResponseSubmitted} indexOfLastQuestion={indexOfLastQuestion} currentQuestion={currentQuestion} setIsGoodAnswer={setIsGoodAnswer} />
                    }

                    {isConfetti &&
                        <Confetti
                        />
                    }
                </Box>
            ))

            }

            {isScoreShowed && score >= 50 ?
                <Box>
                    <Text fontWeight="bold" mt={10} >Félicitations, vous avez terminé votre quizz avec {score} % de réussite !!  </Text>
                </Box >
                : isScoreShowed && score < 50 ?
                    <Box>
                        <Text fontWeight="bold" mt={10} >Vous avez terminé votre quizz avec un taux de {score} % de réussite !!  </Text>
                    </Box >
                    : null

            }

        </>
    )
}
