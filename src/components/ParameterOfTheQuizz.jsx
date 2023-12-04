import { fetchRandomQuiz, getCategories } from '../fetch';

import { Alert, AlertDescription, AlertIcon, Button, Select, } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';

export default function ParametersOfTheQuizz({ onSubmitParams }) {

    const [categories, setCategories] = useState([])

    const initCategories = async () => {
        const data = await getCategories();
        console.log(data)

        setCategories(Object.keys(data));

    }

    useEffect(() => {
        initCategories()
    }, [])

    const [error, setError] = useState('')

    const handleSubmitCreateQuiz = async (values) => {
        // function to fetch the quizz. In the folder "fetch"
        try {
            setError('')
            const data = await fetchRandomQuiz(values)
            onSubmitParams(data)

        } catch (error) {
            setError(error.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            category: "",
            difficulty: "",
        },

        onSubmit: handleSubmitCreateQuiz
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Select name="category" value={formik.values.category} onChange={formik.handleChange} placeholder='Select categories' bg="pink" m={3} width="200px">
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </Select>

                <Select name="difficulty" value={formik.values.difficulty} onChange={formik.handleChange} placeholder='Select difficulty' bg="orange" m={3} width="200px">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Select>

                <Button type="submit" colorScheme="purple" mt={4} justifyContent="end">Start the quizz</Button>

                {error &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}

            </form>

        </div>
    )
}
