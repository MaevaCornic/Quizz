import { Box, Link, Text } from "@chakra-ui/react"
import Confetti from "react-confetti"
import { AppContext } from "./AppContext"
import { useContext } from "react"

function Result({ goodAnswers, totalQuestions }) {

    const { onOpenDrawer } = useContext(AppContext)
    const percentage = Math.floor((goodAnswers / totalQuestions) * 100)


    return (
        <div>
            {percentage >= 50 ?
                <Box>
                    <Confetti />
                    <Text fontWeight="bold" mt={10}>Congratulations, vous finish your quizz with {percentage} % of success !! </Text>
                </Box>
                :
                <Box>
                    <Text fontWeight="bold" mt={10} >You finish the game with {percentage} % of success !!  </Text>
                </Box >
            }

            You won 1 point with this game !

            <br />If you wanna unlock the others levels <Link onClick={onOpenDrawer}>sign up</Link>
        </div>
    )
}

export default Result