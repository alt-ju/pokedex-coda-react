import { useContext } from "react"
import { TeamContext } from "../../../context/TeamContext"

export const onGetPokemons = async (...pokemonSlugs: string[]) => {
    const token = 'advanced-pokedex-api-key-9sd1u98cvg4t98yi'

    const pokemons = await Promise.all(pokemonSlugs.map(async (poke) => {
        const reponse = await fetch(`https://pokedex.coda.memento-dev.fr/pokemon/${poke.slug}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const pokeReturn = await reponse.json()

        return pokeReturn
    }))

    return
}