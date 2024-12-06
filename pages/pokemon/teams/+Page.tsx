import { useData } from "vike-react/useData"
import { useContext, useState, useEffect } from 'react'
import { TeamContext } from "../../../context/TeamContext";
import { onGetPokemons } from "./Page.telefunc";

export default function Page() {
    const teamContext = useContext(TeamContext)
    const { team, setTeam } = teamContext
    const [pokemons, setPokemons] = useState([]);
    
    useEffect(() => {
        onGetPokemons(...team.map((pkmn) => pkmn.slug) as string[]).then((pokemon: any) => {
            setPokemons(pokemon);
        })
    }, []);

    return(
        <>
            { team.map((poke) => (
                <div>
                    <a href={`/pokemon/${poke.slug}`}>
                    { poke.name }
                    </a>
                    <div>
                        <img src={ poke.sprites.normal.male } />
                        <img src={ poke.sprites.shiny.male} />
                    </div>
                    { poke.sprites.normal.female !== null ? (
                        <div>
                            <img src={ poke.sprites.normal.female} />
                            <img src={ poke.sprites.shiny.female} />
                        </div>
                    ) : null }
                    
                </div>
            ))}
        </>
    )
}