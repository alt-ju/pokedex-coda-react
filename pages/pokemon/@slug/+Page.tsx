import { useData } from "vike-react/useData"
import { useState, useContext } from 'react'
import type { Data } from "./+data"
import { TeamContext } from "../../../context/TeamContext"

export default function PagePokemonUnique() {
    const data = useData<Data>()
    const [pokemon, setPokemon] = useState(data)
    const teamContext = useContext(TeamContext)
    const { addToTeam } = teamContext
    const [ selectedImage, setSelectedImage ] = useState<string | null>(pokemon.sprites.shiny.male)

    const handleImageSelection = (image: string) => {
        setSelectedImage(image)
    };
    
    return (
        <>
        <div className="container-details">
            <p>{ pokemon.name }</p>
            <div className="button-container">
                {pokemon.sprites.normal.male && (
                    <button
                        className="btn"
                        onClick={() => handleImageSelection(pokemon.sprites.normal.male)}
                    >
                        Normal Male
                    </button>
                )}
                {pokemon.sprites.normal.female && (
                    <button
                        className="btn"
                        onClick={() => handleImageSelection(pokemon.sprites.normal.female)}
                    >
                        Normal Female
                    </button>
                )}
                {pokemon.sprites.shiny.male && (
                    <button
                        className="btn"
                        onClick={() => handleImageSelection(pokemon.sprites.shiny.male)}
                    >
                        Shiny Male
                    </button>
                )}
                {pokemon.sprites.shiny.female && (
                    <button
                        className="btn"
                        onClick={() => handleImageSelection(pokemon.sprites.shiny.female)}
                    >
                        Shiny Female
                    </button>
                )}
            </div>
            <img src={selectedImage || ""} alt={selectedImage ? `Image de ${pokemon.name}` : ""} />
            <p>Types:</p>
            <div className="types-container">
                { pokemon.types.map((type: any) => (
                    <div className="types">
                        <p>{ type.name }</p>
                    </div> 
                ))}
            </div>
            <div className="stats-container">
                { pokemon.stats.map((stat: any) => (
                    <div className="stats">
                        <p>{ stat.name }</p>
                        <p>{ stat.base_stat }</p>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => addToTeam(pokemon)}>Ajouter à l'équipe</button>
            </div>
        </div>
        </>
    )
}
