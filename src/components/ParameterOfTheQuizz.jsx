import { fetchRandomQuiz, getCategories } from '../fetch';
import { AppContext } from './AppContext';

import { Alert, AlertDescription, AlertIcon, Box, Button, Select, } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react';

export default function ParametersOfTheQuizz({ onSubmitParams }) {

    const { isLoggedIn } = useContext(AppContext)
    // useState
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')

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
    const handleSubmitCreateQuiz = async (values) => {
        try {
            setError('')
            const data = await fetchRandomQuiz(values)
            onSubmitParams(data)

        } catch (error) {
            setError(error.message)
        }
    }

    const handleOpenDrawer = () => {
    }

    // Hook useFormik
    const formik = useFormik({
        initialValues: {
            category: "",
            difficulty: "",
        },

        onSubmit: handleSubmitCreateQuiz
    })

    useEffect(() => {
        initCategories()
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Select name="category" value={formik.values.category} onChange={formik.handleChange} placeholder='Select categories' bg="pink" m={3} width="200px">
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </Select>

                <Select name="difficulty" value={formik.values.difficulty} onChange={formik.handleChange} placeholder='Select difficulty' bg="orange" m={3} width="200px">
                    <option value="easy" selected>Easy</option>
                    <option value="medium" disabled={!isLoggedIn}>Medium</option>
                    <option value="hard" disabled={!isLoggedIn}>Hard</option>
                    <option disabled hidden={isLoggedIn}>Pour accéder aux autres niveaux veuillez créer un compte</option>
                </Select>

                <Box display="flex">
                    <Button type="submit" colorScheme="purple" mt={4} justifyContent="end">Start the quizz</Button>
                    <Button mt={4} ml={2} onClick={handleOpenDrawer}>Sign up/Log in</Button>
                </Box>
                {error &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}
            </form>
        </div>
    )
}
