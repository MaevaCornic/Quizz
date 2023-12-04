import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

export default function NextPage({ handleNextPage, isResponseSubmitted, setIsResponseSubmitted, setIsGoodAnswer }) {

    const onSubmitNextPage = () => {
        handleNextPage()
        setIsResponseSubmitted(false)
        setIsGoodAnswer(false)
    }

    return (
        <>
            {
                isResponseSubmitted &&
                <Box display="flex" justifyContent="flex-end">
                    <Button mt={6} rightIcon={<ChevronRightIcon />} onClick={onSubmitNextPage} variant="outline">Question suivante</Button>
                </Box>
            }
        </>
    )
}
