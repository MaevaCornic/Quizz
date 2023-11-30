import { fetchRandomQuiz } from '../fetch';

import { Alert, AlertDescription, AlertIcon, Button, Select } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useState } from 'react';

export default function ParametersOfTheQuizz({ onSubmitParams }) {

    const [error, setError] = useState('')

    const handleSubmitCreateQuiz = async (values) => {

        // function to fetch the quizz. In the folder "fetch"
        try {
            setError('')
            const data = await fetchRandomQuiz(values)
            console.log(data)
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
                    <option value='history'>Histoire</option>
                    <option value='film_and_tv'>Film & TV</option>
                    <option value='arts_and_literature'>Arts & Literature</option>
                    <option value='food_and_drink'>Nourriture & Boissons</option>
                    <option value='general_knowledge'>Culture générale</option>
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
                    </Alert>
                }
            </form>
        </div >
    )
}
