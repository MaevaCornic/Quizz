import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

export default function Paginate({ questionsPerPage, totalQuestions, nextPage, isResponseSubmitted, setIsResponseSubmitted, setIsGoodAnswer }) {

    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleNextpage = () => {
        nextPage()
        setIsResponseSubmitted(false)
        setIsGoodAnswer(false)
    }

    return (
        <>
            {
                isResponseSubmitted &&
                <Box display="flex" justifyContent="flex-end">
                    <Button mt={6} rightIcon={<ChevronRightIcon />} onClick={handleNextpage} variant="outline">Question suivante</Button>
                </Box>
            }
        </>
    )
}
