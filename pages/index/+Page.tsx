import React from "react";
import { useData} from "vike-react/useData"
import { useState } from 'react'
import type { Data } from "./+data";

export default function Page() {
  const data = useData<Data>()
  const [allPokemon, setPokemon] = useState(data)

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>Mon Pokedex</h1>
      <div className="container">
        { allPokemon && allPokemon.length > 0 ? (
          allPokemon.map((poke: any) => (
              <div className="pokemon-card" key={poke.id}>
                <a href={`/pokemon/${poke.slug}`}>
                  { poke.name }
                </a>
                <h3>({ poke.slug })</h3>
                <div>

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
                </div>
              </div>
            )
          )) : (
            <p>Chargement...</p>
          )
        }
      </div>
    </>
  );
}
