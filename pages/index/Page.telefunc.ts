
const token = 'advanced-pokedex-api-key-9sd1u98cvg4t98yi'

export const onSearch = async (searchInput: string) => {

    const request = await fetch(`https://pokedex.coda.memento-dev.fr/pokemon?search=${searchInput}&with=type`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = request.json()

    return data 
}

export const onGetTypes = async () => {
    const reponse = await fetch('https://pokedex.coda.memento-dev.fr/type', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const pokeType = await reponse.json()

    return pokeType
}

export const onSelectType = async () => {
    const request = await fetch(`https://pokedex.coda.memento-dev.fr/pokemon?with=type`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const dataWithType = request.json()

    return dataWithType
}