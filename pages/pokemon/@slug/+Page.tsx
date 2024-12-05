import { useData } from "vike-react/useData";
import { useState } from 'react'
import type { Data } from "./+data";


export default function PagePokemonUnique() {
    const data = useData<Data>()
    const [pokemon, setPokemon] = useState(data)
    
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
                <a>Ajouter à l'équipe</a>
            </div>
        </div>
            
            
        </>
    )
}
