import { useData } from "vike-react/useData"
import { useState, useEffect } from 'react'
import type { Data } from "./+data";
import { onSearch, onGetTypes } from "./Page.telefunc";


export default function Page() {
  const data = useData<Data>()
  const [ allPokemon, setAllPokemon ] = useState(data)
  const [ filteredPokemon, setFilteredPokemon ] = useState(data)
  const [ searchInput, setSearchInput ] = useState('')
  const [ types, setTypes ] = useState([])
  const [ selectedType, setSelectedType ] = useState('default')

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }

  const handleSelectChange = (e: any) => {
    setSelectedType(e.target.value)
  }
  
  useEffect(() => {
    if (searchInput.length > 0) {
      onSearch(searchInput).then((pokemon: any) => {
        const filtered = pokemon.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
      )
        setFilteredPokemon(filtered)})
    } else {
      setFilteredPokemon(allPokemon)
    }
  }, [searchInput, allPokemon])

  useEffect(() => {
    onGetTypes().then((type: any) => { setTypes(type) })
  }, [])

  useEffect(() => {
    if (selectedType === 'default') {
      setFilteredPokemon(allPokemon)
    } else {
      const filtered = allPokemon.filter((pokemon: any) => 
        pokemon.types.some((type: {name: string, slug: string}) => type.name === selectedType)
      )
      setFilteredPokemon(filtered)
    }
  }, [selectedType, allPokemon])
  
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>Mon Pokedex</h1>
      <div className="search-tools">
        <input type="text"
          placeholder="Rechercher..." 
          onChange={handleChange}
          value={searchInput}
          className="search-bar"/>
        <select className="select" name="selectType" id="selectType" onChange={handleSelectChange}>
          <option value="default">Tous types</option>
          { types.map((type:any) => (
            <option key={type.slug} value={type.name}>{type.name}</option>
          ))}
        </select>
      </div>
      
      <div className="container">
        { filteredPokemon && filteredPokemon.length > 0 ? (
          filteredPokemon.map((poke: any) => (
            <a href={`/pokemon/${poke.slug}`}>
              <div className="pokemon-card" key={poke.id}>
                <p>{ poke.name }</p>
                <p>({ poke.slug })</p>
                <div>
                  <div className="normal">
                    { poke.sprites.normal.male !== null ? (
                      <img src={ poke.sprites.normal.male } alt={`Image d'un ${ poke.slug} normal male`} />
                    ) : null 
                    }
                  </div>
                </div>
              </div>
              </a>
            )
          )) : (
            null
          )
        }
      </div>
    </>
  );
}
