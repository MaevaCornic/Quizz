// const myHeaders = new Headers()
// myHeaders.append('Content-Type', 'text/xml')
// myHeaders.get('Content-Type')

const url = "https://the-trivia-api.com/v2"

export const fetchRandomQuiz = async (values) => {
    try {
        const data = await fetch(`${url}/questions?` + new URLSearchParams({
            limit: 10,
            categories: values.category,
            difficulties: values.difficulty,
            // tags: values.category,
            // headers: myHeaders
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


export const getCategories = async () => {
    try {
        const data = await fetch(`${url}/categories`)

        if (!data.ok) {
            throw new Error("Data not ok")
        }

        const response = await data.json()
        return response

    } catch (error) {
        console.log(error.message)
        throw new Error('Une erreur est survenue')
    }
}

// export const getTotalQuizzPerTags = async () => {
//     try {
//         const data = await fetch('https://the-trivia-api.com/v2/totals-per-tag?' + new URLSearchParams({
//             categories: 'film_and_tv',
//             difficulties: 'easy, medium',
//             tags: 'film_and_tv',
//             // headers
//         }))
//         const response = await data.json()
//         console.log(response)

//     } catch (error) {
//         console.error(error)
//     }
// }

// const getTotalQuizzPerTags = async (valueCategory) => {
//     try {
//         const data = await fetch('https://the-trivia-api.com/v2/totals-per-tag?' + new URLSearchParams({
//             categories: valueCategory,
//             difficulties: 'hard',
//             tags: valueCategory,
//             myHeaders
//         }))

//         const response = await data.json()
//         console.log(response)
//         setQuestions(response)

//     } catch (error) {
//         console.error(error)
//     }
// }

// const getCategories = async () => {
//     try {
//         const data = await fetch('https://the-trivia-api.com/v2/metadata?' + new URLSearchParams({
//             categories: "all"
//         }))
//         const response = await data.json()
//         console.log(response)
//         // setCategories(response.byCategory)

//     } catch (error) {
//         console.error(error)
//     }
// }

// useEffect(() => {
// }, [])

// const goodAnswer = (value) => {
//     if (value === item.correctAnswer) {
//         return true
//     } else { return false }
// }