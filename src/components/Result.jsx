import { Box, Link, Text } from "@chakra-ui/react"
import Confetti from "react-confetti"
import { AppContext } from "./AppContext"
import { useContext } from "react"

function Result({ goodAnswers, totalQuestions }) {

    const { onOpenDrawer, isLoggedIn } = useContext(AppContext)
    const percentage = Math.floor((goodAnswers / totalQuestions) * 100)


    return (
        <div>
            {percentage >= 50 ?
                <Box>
                    <Confetti />
                    <Text fontWeight="bold" mt={10}>Congratulations, you finished your quizz with {percentage} % of success !! </Text>
                </Box>
                :
                <Box>
                    <Text fontWeight="bold" mt={10} >You finish the game with {percentage} % of success !!  </Text>
                </Box >
            }
            {isLoggedIn &&
                <Text>You won 1 point with this game !</Text>}


            {!isLoggedIn &&
                <Text>If you wanna unlock the others levels <Link onClick={onOpenDrawer}>log in</Link>.</Text>}

        </div>
    )
}

export default Result