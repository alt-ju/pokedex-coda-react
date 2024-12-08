import { createContext, useState } from "react"

export type PokemonType = {
    slug: string,
    name: string,
    sprites: {
        shiny: {
            male: string | null,
            female: string | null
        },
        normal: {
            male: string | null,
            female: string | null
        }
    },
    types: {
        name: string,
        slot: number,
        slug: string
    }[],
    stats: {
        name: string,
        slug: string,
        base_stat: number
    }[]
}

type TeamContextType = {
    team: PokemonType[];
    setTeam: (team: PokemonType[]) => void;
    addToTeam: (pokemon: PokemonType) => void;
}


export const TeamContext = createContext<TeamContextType>({
    team: [],
    setTeam: () => {}, 
    addToTeam: () => {}
});

type TeamProviderProps = {
    children: React.ReactNode
}

export const TeamProvider = (props: TeamProviderProps) => {
    const [team, setTeam] = useState<PokemonType[]>([])

        const addToTeam = (pokemon: PokemonType) => {
            if (team.length < 6) {
                if (!team.find((poke) => poke.slug === pokemon.slug)) {
                    setTeam([...team, pokemon])
                } 
            } else {
                alert('Votre équipe est pleine, vous ne pouvez pas ajouter plus de 6 pokémons.')
            }
    } 

    return (
        <TeamContext.Provider
        value={{team, setTeam, addToTeam}}>
            {props.children}
        </TeamContext.Provider>
    )
}