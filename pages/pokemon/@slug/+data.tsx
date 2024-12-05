import { useState } from 'react'
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    const token = 'advanced-pokedex-api-key-9sd1u98cvg4t98yi'
    const request = await fetch(`https://pokedex.coda.memento-dev.fr/pokemon/${pageContext.routeParams.slug}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const pokemon = (await request.json()).current

    console.log(pokemon)

    return pokemon
}