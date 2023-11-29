import { useEffect, useState } from 'react'
import Question from './Question'

import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure, } from '@chakra-ui/react'
import ParametersOfTheQuizz from './ParameterOfTheQuizz';
import { SettingsIcon, } from '@chakra-ui/icons';
import Paginate from './Paginate';

export default function RandomQuizzes() {

    const [questions, setQuestions] = useState([])
    // console.log(questions)
    // const [isGoodAnswer, setIsGoodAsnwer] = useState("false")
    // const [value, setValue] = useState('')

    // To manage the modal of the parameter's quizz
    const { isOpen, onOpen, onClose } = useDisclosure()


    // Pagination to get a question per div 
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(1);
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)

    const nextPage = () => {
        if (currentPage !== Math.ceil(questions.length / questionsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Give the message regarding the answer
    // const checkTheAnswer = (item, value) => {
    //     if (value === item?.correctAnswer) {
    //         setIsGoodAsnwer(true)
    //     } else (setIsGoodAsnwer(false))
    //     // nextPage()
    // }

    // useEffect(() => {

    // }, [])


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
            <Box display='flex' justifyContent="flex-start" pb={8}>
                <Button leftIcon={<SettingsIcon />} onClick={onOpen} colorScheme='yellow' justifyItems="left" boxShadow="2xl">Configure your quizz</Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent width="xs" >
                    <ModalBody >
                        <ParametersOfTheQuizz setQuestions={setQuestions} onClose={onClose} />
                    </ModalBody>

                    <ModalFooter>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            {currentQuestions.map((question) => (
                <Box key={question.id} borderWidth={1} p={8}>
                    <Text textAlign="left" fontStyle="italic" mt={3}>Question n°{currentPage}/{questions.length}</Text>
                    <Question item={question} />
                    {/* <Button onClick={checkTheAnswer}>Valider</Button> */}
                    {/* <Paginate questionsPerPage={questionsPerPage} totalQuestions={currentQuestions.length} checkTheAnswer={checkTheAnswer} nextPage={nextPage} /> */}
                </Box>
            ))
            }

        </>
    )
}
