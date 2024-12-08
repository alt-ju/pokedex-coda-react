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
            setPokemons(pokemon)
        })
    }, []);

    const averageStats = () => {
        const globalStats: Record<string, number> = {}

        team.forEach((poke => {
            poke.stats.forEach((stat) => {
                globalStats[stat.slug] = (Number(globalStats[stat.slug]) || 0) + stat.base_stat;
            })
        }))

        return globalStats
    }

    const stats = averageStats()

    const typesStats = () => {
        const typeCounts: Record<string, number> = {};

        team.forEach(poke => {
            poke.types.forEach((type) => {
                typeCounts[type.name] = (typeCounts[type.name] || 0) + 1;
            });
        });

        return typeCounts;
    };

    const statsType = typesStats()
    
    const handleDelete = (pokeToDelete: PokemonType) => {
        const updatedTeam = team.filter((poke) => poke.slug !== pokeToDelete.slug)
        setTeam(updatedTeam)
    };

    return(
        <>
            <h2 className="title">Mon équipe</h2>
            <div className="team">
                { team.map((poke) => (
                    <div className="pokemon-card">
                        <a href={`/pokemon/${poke.slug}`}>
                        { poke.name }
                        </a>
                        <div className="normal">
                            { poke.sprites.normal.male !== null ? (
                            <img src={ poke.sprites.normal.male } alt={`Image d'un ${ poke.slug} normal male`} />
                            ) : null 
                            }
                        </div>
                        <div>
                            <button className="btn delete" onClick={() => handleDelete(poke)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="global-stats">
                <div>
                    <h2 className="stat-title">Statistiques de l'équipe</h2>
                    <div className="team-stats">
                        <div className="team-stat"><p>Moyenne des PV de l'équipe: { Math.round(stats.hp / team.length) }</p></div>
                        <div className="team-stat"><p>Moyenne des Attaques de l'équipe: { Math.round(stats.attack / team.length) }</p></div>
                        <div className="team-stat"><p>Moyenne des Défenses de l'équipe: { Math.round(stats.defense / team.length) }</p></div>
                        <div className="team-stat"><p>Moyenne des Attaque Spéciale de l'équipe: { Math.round(stats['special-attack'] / team.length)}</p></div>
                        <div className="team-stat"><p>Moyenne des Défenses Spéciales de l'équipe: { Math.round(stats['special-defense'] / team.length)}</p></div>
                        <div className="team-stat"><p>Moyenne des Vitesses de l'équipe: { Math.round(stats.speed / team.length)}</p></div>
                    </div>
                </div>
                <div>
                    <h2 className="stat-title">Types dans l'équipe</h2>
                    <div className="team-type team-stat">
                        { Object.entries(statsType).map(([type, value]) => (
                            <p>{type} x{value}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}