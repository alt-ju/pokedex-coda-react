import { createContext, useState } from "react"

type PokemonType = {
    slug: string,
    name: string
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
        if (!team.find((poke) => poke.slug === pokemon.slug)) {
            setTeam([...team, pokemon]);
            console.log('pokemon ajouté', pokemon)
        }
    }

    return (
        <TeamContext.Provider
        value={{team, setTeam, addToTeam}}>
            {props.children}
        </TeamContext.Provider>
    )
}