import { Box, Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { shuffle } from '../utils'

export default function Question({ item }) {
  console.log(item.correctAnswer)

  /**
   * New array with all the answers together 
   * Suffle is coming from a function found in Stackoverflow. 
   */
  const suggestions = useMemo(() => shuffle([item.correctAnswer, ...item.incorrectAnswers]), [item])

  const [value, setValue] = useState('')
  console.log(value)
  const [isGoodAnswer, setIsGoodAsnwer] = useState("false")

  if (!item?.id) {
    return null
  }

  const checkTheAnswer = () => {

    if (value === item?.correctAnswer) {
      setIsGoodAsnwer(true)
    } else (setIsGoodAsnwer(false))
    // nextPage()
  }
  return (
    <>
      <Text fontWeight="bold" mt={2} mb={1} key={item.id}>{item.question.text}</Text>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          {suggestions.map((suggestion) => (
            <Box key={suggestion} display="flex" flexDir="column">
              <Radio value={suggestion}>{suggestion}</Radio>
            </Box>
          ))}
        </Stack>
      </RadioGroup>

      <Button onClick={checkTheAnswer}>Valider</Button>
      {isGoodAnswer === true &&
        <Text mt={2}>Bravoooo, c&apos;est une bonne réponse !!</Text>
      }
      {isGoodAnswer === false &&
        <Text mt={2}>Dommage, mauvaise réponse. <br />
          La bonne réponse était : {item.correctAnswer}</Text>}

    </>
  )
}
