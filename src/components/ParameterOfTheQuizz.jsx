import { fetchRandomQuiz, getCategories } from '../fetch';
import { AppContext } from './AppContext';

import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Link, SimpleGrid, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';

export default function ParametersOfTheQuizz({ onSubmitParams }) {

    const { isLoggedIn, onOpenDrawer } = useContext(AppContext)

    // useState
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [categorySelected, setCategorySelected] = useState('')
    const [level, setLevel] = useState('')


    // Functions
    // Function to get all the categories and with the "Object.keys" restructure the data to be able to map on all of them.
    const initCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Object.keys(data));

        } catch (error) {
            console.log(error.message)
        }
    }

    // Function to create the quizz wanted (categories and level) by the user.
    const handleSubmitCreateQuiz = async () => {
        try {
            setError('')
            const data = await fetchRandomQuiz(categorySelected, level)
            onSubmitParams(data)

        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        initCategories()
    }, [])

    return (
        <Flex alignItems="center">
            <Box>
                <SimpleGrid columns={{ base: 1, lg: 2 }}>
                    {categories.map((category) => (
                        <Box key={category} p={5} bg={categorySelected === category ? "#02C39A" : "#EFE6DD"} m={2} height='80px' boxShadow="xl" borderRadius={5} onClick={() => setCategorySelected(category)} cursor="pointer" textTransform="uppercase" fontWeight='semibold'>{category}</Box>
                    ))}
                </SimpleGrid>
            </Box>
            <Box ml={12}>
                <SimpleGrid columns={3} mt={7}>
                    <Box as="button" borderWidth={"1px"} borderColor={"gray.600"} m={1} onClick={() => setLevel("easy")} >EASY</Box>
                    <Box as="button" cursor={!isLoggedIn ? "not-allowed" : "pointer"} disabled={!isLoggedIn} bgColor={!isLoggedIn ? "gray.100" : ""} borderWidth={isLoggedIn ? "1px" : ""} borderColor={isLoggedIn ? "gray.600" : ""} m={1} onClick={() => setLevel("medium")}>MEDIUM</Box>
                    <Box as="button" cursor={!isLoggedIn ? "not-allowed" : "pointer"} disabled={!isLoggedIn} bgColor={!isLoggedIn ? "gray.100" : ""} borderWidth={isLoggedIn ? "1px" : ""} borderColor={isLoggedIn ? "gray.600" : ""} m={1} onClick={() => setLevel("hard")}>HARD</Box>
                </SimpleGrid >
                <Text fontStyle="italic" hidden={isLoggedIn}>If you wanna unlock the others levels, <Link onClick={onOpenDrawer}>log in</Link></Text>

                <Button m={10} colorScheme="teal" color="white" textTransform="uppercase" onClick={handleSubmitCreateQuiz}>Start the quizz </Button>
            </Box>
            {error &&
                <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>}
        </Flex >
    )
}
