import type { PokemonType } from "../../../context/TeamContext";

import { useData } from "vike-react/useData"
import { useContext, useState, useEffect } from 'react'
import { TeamContext } from "../../../context/TeamContext";
import { onGetPokemons } from "./Page.telefunc";

export default function Page() {
    const teamContext = useContext(TeamContext)
    const { team, setTeam } = teamContext
    const [ pokemons, setPokemons ] = useState([]);
    
    useEffect(() => {
        onGetPokemons(...team.map((pkmn) => pkmn.slug) as string[]).then((pokemon: any) => {
            setPokemons(pokemon);
        })
    }, []);

    const averageStats = () => {
        const globalStats: Record<string, number> = {};

        team.forEach((poke => {
            poke.stats.forEach((stat) => {
                globalStats[stat.slug] = (Number(globalStats[stat.slug]) || 0) + stat.base_stat;
            });
        }))

        return globalStats
    }

    const stats = averageStats()

    const handleDelete = (pokeToDelete: PokemonType) => {
        const updatedTeam = team.filter((poke) => poke.slug !== pokeToDelete.slug);
        setTeam(updatedTeam); 
    };

    return(
        <>
            <h2>Mon équipe</h2>
            <div className="team">
                { team.map((poke) => (
                    <div className="pokemon-card">
                        <a href={`/pokemon/${poke.slug}`}>
                        { poke.name }
                        </a>
                        <div className="shiny">
                            <p>Shiny</p>
                            { poke.sprites.shiny.male !== null ? (
                            <img src={ poke.sprites.shiny.male } alt={`Image d'un ${ poke.slug} shiny male`} />
                            ) : null
                            }
                            { poke.sprites.shiny.female !== null ? (
                                <img src={ poke.sprites.shiny.female } alt={`Image d'un ${ poke.slug} shiny femelle`} />
                            ) : null
                            }
                        </div>
                        <div className="normal">
                            <p>Normal</p>
                            { poke.sprites.normal.male !== null ? (
                            <img src={ poke.sprites.normal.male } alt={`Image d'un ${ poke.slug} normal male`} />
                            ) : null 
                            }
                            {
                            poke.sprites.normal.female !== null ? (
                                <img src={ poke.sprites.normal.female } alt={`Image d'un ${ poke.slug} normal femelle`} />
                            ) : null
                            }
                        </div>
                        <div>
                            <button onClick={() => handleDelete(poke)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="team-stats">
                <h2>Statistiques de l'équipe</h2>
                <div className="team-stats">
                    <div>
                        <p>Moyenne des PV de l'équipe: {stats.hp / team.length}</p>
                        <p>Moyenne des Attaques de l'équipe: {stats.attack / team.length}</p>
                        <p>Moyenne des Défenses de l'équipe: {stats.defense / team.length}</p>
                        <p>Moyenne des Attaque Spéciale de l'équipe: { stats['special-attack'] / team.length}</p>
                        <p>Moyenne des Défenses Spéciales de l'équipe: { stats['special-defense'] / team.length}</p>
                        <p>Moyenne des Vitesses de l'équipe: { stats.speed / team.length}</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}