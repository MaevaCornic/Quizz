export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


export const getTotalQuizzPerTags = async () => {
    try {
        const data = await fetch('https://the-trivia-api.com/v2/totals-per-tag?' + new URLSearchParams({
            categories: 'film_and_tv',
            difficulties: 'easy, medium',
            tags: 'film_and_tv',
            // headers
        }))
        const response = await data.json()
        console.log(response)

    } catch (error) {
        console.error(error)
    }
}

