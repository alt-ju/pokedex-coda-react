import { useData } from "vike-react/useData";
import { useState, useContext } from 'react'
import type { Data } from "./+data";
import { TeamContext } from "../../../context/TeamContext";

export default function PagePokemonUnique() {
    const data = useData<Data>()
    const [pokemon, setPokemon] = useState(data)
    const teamContext = useContext(TeamContext)
    const { addToTeam } = teamContext
    
    return (
        <>
        <div className="container-details">
            <p>{ pokemon.name }</p>
            { pokemon.types.map((type: any) => (
                <p>{ type.name }</p>
            ))}
            { pokemon.stats.map((stat: any) => (
                <div className="stats">
                    <p>{ stat.name }</p>
                    <p>{ stat.base_stat }</p>
                </div>
            ))}
            <div>
                <button onClick={() => addToTeam(pokemon)}>Ajouter à l'équipe</button>
            </div>
        </div>
            
            
        </>
    )
}
