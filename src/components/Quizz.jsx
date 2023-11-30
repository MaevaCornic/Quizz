import { Box, Button, Center, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { shuffle } from '../utils'

export default function Quizz({ item, isResponseSubmitted, setIsResponseSubmitted, onSuccess, currentQuestion, totalQuestions, onFinish, setIsGoodAnswer, isGoodAnswer }) {
  // console.log(item.correctAnswer)

  /**
   * New array with all the answers together 
   * Suffle is coming from a function found in Stackoverflow. 
   */
  const suggestions = useMemo(() => shuffle([item.correctAnswer, ...item.incorrectAnswers]), [item])

  const [value, setValue] = useState('')

  // To show the message of good or wrong answer
  // const [isGoodAnswer, setIsGoodAsnwer] = useState(false)

  const [messageError, setMessageError] = useState(false)

  if (!item?.id) {
    return null
  }

  const handleNoAnswerSelected = () => {
    setMessageError(true)
    setIsResponseSubmitted(false)
  }

  // To define a succes message or not regarding the answer
  const checkTheAnswer = () => {
    if (value === "") {
      handleNoAnswerSelected()
    }

    else if (value === item?.correctAnswer) {
      setIsGoodAnswer(true)
      onSuccess(value)
      setIsResponseSubmitted(true)
      setMessageError(false)

    } else {
      setIsGoodAnswer(false)
      setIsResponseSubmitted(true)
      setMessageError(false)
    }

    if (currentQuestion === totalQuestions) {
      onFinish()
    }

  }
  return (
    <>
      <Text fontWeight="bold" mt={4} mb={1} key={item.id}>{item.question.text}</Text>

      <RadioGroup onChange={setValue} value={value}>

        <Stack direction="row">
          {suggestions.map((suggestion) => (
            <Box key={suggestion} display="flex" flexDir="column">
              <Radio mt={2} value={suggestion} isReadOnly={isGoodAnswer}>{suggestion}</Radio>
            </Box>
          ))}

        </Stack>

      </RadioGroup>

      {!isResponseSubmitted ? null :
        isGoodAnswer === true ?
          <Center>
            <Text bg="green.100" width="350px" p={6} mt={6} borderRadius={10}>Bravoooo, c&apos;est une bonne réponse !!</Text>
          </Center>
          : isGoodAnswer === false &&
          <Center>
            <Text bg="red.100" width="350px" p={6} mt={6} borderRadius={10}>Dommage, mauvaise réponse ! <br />
              La bonne réponse était : <Box as="span" fontWeight="bold">{item.correctAnswer}</Box> </Text>
          </Center>
      }

      {messageError &&
        <Center>
          <Text bg="yellow.100" width="350px" p={6} mt={6} borderRadius={10}>Veuillez sélectionnez une réponse !</Text>
        </Center>
      }

      {!isResponseSubmitted ?
        <Box display="flex" justifyContent="flex-end">
          < Button onClick={checkTheAnswer} mt={5} colorScheme="purple">Valider</Button ></Box>
        : null
      }
    </>
  )
}
