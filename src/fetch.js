const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/xml')
myHeaders.get('Content-Type')

const url = "https://the-trivia-api.com/v2"

export const fetchRandomQuiz = async (values) => {
    try {
        const data = await fetch(`${url}/questions?` + new URLSearchParams({
            limit: 2,
            categories: values.category,
            difficulties: values.difficulty,
            // tags: values.category,
            myHeaders
        }))

        if (!data.ok) {
            throw new Error("Data not ok")
        }

        const response = await data.json()
        return response

    } catch (error) {
        console.error(error)
        throw new Error("Une erreur est survenue")
    }
}
