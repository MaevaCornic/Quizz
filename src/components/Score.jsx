import { Box, Text } from "@chakra-ui/react"
import Confetti from "react-confetti"

function Score({ goodAnswers, totalQuestions }) {
    const percentage = Math.floor((goodAnswers / totalQuestions) * 100)

    return (
        <div>
            {percentage >= 50 ?
                <Box>
                    <Confetti />
                    <Text fontWeight="bold" mt={10}>Félicitations, vous avez terminé votre quizz avec {percentage} % de réussite !! </Text>
                </Box>
                :
                <Box>
                    <Text fontWeight="bold" mt={10} >Vous avez terminé votre quizz avec un taux de {percentage} % de réussite !!  </Text>
                </Box >
            }
        </div>
    )
}

export default Score