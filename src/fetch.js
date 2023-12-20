const urlApi = "https://the-trivia-api.com/v2"
const urlBackEnd = 'https://quizz-backend-xdv2.onrender.com/api'

// To fetch a quizz regardind the category and the difficuty choosen by the user.
export const fetchRandomQuiz = async (values) => {
    try {
        const data = await fetch(`${urlApi}/questions?` + new URLSearchParams({
            limit: 2,
            categories: values.category,
            difficulties: values.difficulty,
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

// To get all the categories available 
export const getCategories = async () => {
    try {
        const data = await fetch(`${urlApi}/categories`)

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

// To connect a user 
export const authentification = async (values) => {

    try {

        let bodyContent = new FormData();
        bodyContent.append("identifier", values.email);
        bodyContent.append("password", values.password);


        const data = await fetch(`${urlBackEnd}/auth/local`, {
            method: "POST",
            body: bodyContent
        })

        if (!data.ok) {
            throw new Error("data pas ok")
        }

        const response = await data.json()
        return response

    } catch (error) {
        console.log(error.message)
        throw new Error("une erreur est survenue, veuillez réessayez")
    }
}

// To find a specific user with the token
export const findUser = async (token) => {

    try {

        const data = await fetch(`${urlBackEnd}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!data.ok) {
            throw new Error('data not ok ')
        }
        const response = await data.json()
        return response

    } catch (error) {
        console.log(error.message)
        throw new Error('Pas reussi à récupérer le user')
    }
}

export const updatePoints = async (id, points) => {

    try {
        const token = localStorage.getItem('token')

        let bodyContent = new FormData();
        bodyContent.append("points", points + 1)

        const data = await fetch(`${urlBackEnd}/users/${id}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: bodyContent
        })

        if (!data.ok) {
            throw new Error('problème avec le fetch en PUT')
        }

        const response = data.json()
        return response

    } catch (error) {
        console.log(error.message)
    }
}

export const updateProfile = async (values, id) => {

    try {

        const token = localStorage.getItem('token')
        let bodyContent = new FormData();
        bodyContent.append("username", values.username);

        const data = await fetch(`${urlBackEnd}/users/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: bodyContent
        })

        if (!data.ok) {
            throw new Error('Erreur sur le PUT')
        }
        const response = await data.json()
        return response

    } catch (error) {
        console.log(error.message)
    }
}

export const register = async (values) => {

    try {

        const bodyContent = new FormData()
        bodyContent.append("username", values.username);
        bodyContent.append("email", values.email)
        bodyContent.append("password", values.password);

        const data = await fetch(`${urlBackEnd}/auth/local/register`, {
            method: "POST",
            body: bodyContent
        })
        const response = await data.json()
        localStorage.setItem('token', response.jwt)
        return response

    } catch (error) {
        console.log(error.message)
    }
}

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
