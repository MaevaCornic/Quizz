import { useState } from 'react'

import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, } from '@chakra-ui/react'
import { SettingsIcon, } from '@chakra-ui/icons';

// Compnent import
import ParametersOfTheQuizz from './ParameterOfTheQuizz';
import NextPage from './NextPage';
import QuizzItem from './QuizzItem';
import Result from './Score';

export default function Index() {

    const [questions, setQuestions] = useState([])

    // To manage the modal of the parameter's quizz
    const { isOpen, onOpen, onClose } = useDisclosure()

    // To hide the button "valider" or the icon button
    const [isResponseSubmitted, setIsResponseSubmitted] = useState(false)

    // To show the message of good or wrong answer
    const [isGoodAnswer, setIsGoodAnswer] = useState(false)

    // To stock the good answers
    const [goodAnswers, setGoodAnswers] = useState(0)

    const [isScoreShowed, setIsScoreShowed] = useState(false)

    // To handle the button next page at the end of the quizz
    const [isFinished, setIsFinished] = useState(false)
    // const [isConfetti, setIsConfetti] = useState(false)

    // Pagination to get a question per div 
    const [currentQuestionNumber, setcurrentQuestionNumber] = useState(1);
    const actualQuestion = questions[currentQuestionNumber - 1]

    const handleNextPage = () => {
        setcurrentQuestionNumber(currentQuestionNumber + 1)
    };

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

    const endOfTheQuizz = () => {
        setIsFinished(true)
        setIsScoreShowed(true)
    }

    return (
        <>
            <Box display='flex' justifyContent="flex-start" pb={8} >
                <Button leftIcon={<SettingsIcon />} onClick={onOpen} colorScheme='yellow' justifyItems="left" boxShadow="2xl">Configure your quizz</Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent width="xs" >
                    <ModalBody>
                        <ParametersOfTheQuizz onSubmitParams={handleSubmitParams} />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {!!actualQuestion?.id &&
                <>
                    <Box borderWidth={1} p={8} bg="#E3EBFF" borderRadius={10} width="700px">
                        <Text textAlign="left" fontStyle="italic" mt={3}>Question n°{currentQuestionNumber}/{questions.length}</Text>

                        <QuizzItem item={actualQuestion} isResponseSubmitted={isResponseSubmitted} setIsResponseSubmitted={setIsResponseSubmitted} onSuccess={handleItemSuccess} currentQuestionNumber={currentQuestionNumber} totalQuestions={questions.length} onFinish={endOfTheQuizz} isGoodAnswer={isGoodAnswer} setIsGoodAnswer={setIsGoodAnswer} />

                        {!isFinished &&
                            <NextPage handleNextPage={handleNextPage} isResponseSubmitted={isResponseSubmitted} setIsResponseSubmitted={setIsResponseSubmitted} setIsGoodAnswer={setIsGoodAnswer} />
                        }
                    </Box>

                    {isScoreShowed &&
                        <Result goodAnswers={goodAnswers} totalQuestions={questions.length} />
                    }
                </>
            }
        </>
    )
}
