// const headers = {
//     'Content-type': 'application/json; charset=UTF-8',
// };

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/xml')
myHeaders.get('Content-Type')

const url = "https://the-trivia-api.com/v2"

export const fetchRandomQuiz = async (values, setQuestions, onClose) => {
    try {
        const data = await fetch(`${url}/questions?` + new URLSearchParams({
            limit: 10,
            categories: values.category,
            difficulties: values.difficulty,
            tags: values.category,
            myHeaders
        }))
        const response = await data.json()
        setQuestions(response)
        onClose()

    } catch (error) {
        console.error(error.message)
    }
}
