import { useData } from "vike-react/useData"
import { useState, useContext } from 'react'
import type { Data } from "./+data"
import { TeamContext } from "../../../context/TeamContext"

export default function PagePokemonUnique() {
    const data = useData<Data>()
    const [pokemon, setPokemon] = useState(data)
    const teamContext = useContext(TeamContext)
    const { addToTeam } = teamContext
    const [ selectedImage, setSelectedImage ] = useState<string | null>(pokemon.sprites.normal.male)

    const handleImageSelection = (image: string) => {
        setSelectedImage(image)
        const buttons = document.querySelectorAll('.btn-version')
        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                buttons.forEach((btn) => btn.classList.remove('btn-clicked'));
                const clickedButton = event.target as HTMLElement
                clickedButton.classList.add('btn-clicked')
                }
            )
        })
    };

    return (
        <>
        <div className="container-details">
            <p className="title">{ pokemon.name }</p>
            <div className="button-container">
                {pokemon.sprites.normal.male && (
                    <button
                        className="btn-version"
                        onClick={() => handleImageSelection(pokemon.sprites.normal.male)}
                    >
                        Normal Male
                    </button>
                )}
                {pokemon.sprites.normal.female && (
                    <button
                        className="btn-version"
                        onClick={() => handleImageSelection(pokemon.sprites.normal.female)}
                    >
                        Normal Female
                    </button>
                )}
                {pokemon.sprites.shiny.male && (
                    <button
                        className="btn-version"
                        onClick={() => handleImageSelection(pokemon.sprites.shiny.male)}
                    >
                        Shiny Male
                    </button>
                )}
                {pokemon.sprites.shiny.female && (
                    <button
                        className="btn-version"
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
            <p>Statistiques du pokémon:</p>
            <div className="stats-container">
                { pokemon.stats.map((stat: any) => (
                    <div className="stats">
                        <p>{ stat.name }</p>
                        <p>{ stat.base_stat }</p>
                    </div>
                ))}
            </div>
            <div className="add-container">
                <button className="btn add" onClick={() => addToTeam(pokemon)}>Ajouter à l'équipe</button>
            </div>
        </div>
        </>
    )
}
