import { useState } from 'react'

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
    const token = 'advanced-pokedex-api-key-9sd1u98cvg4t98yi'
    const request = await fetch('https://pokedex.coda.memento-dev.fr/pokemon?limit=30', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const allPokemon = await request.json()

    return allPokemon
}