import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offsetNumber, setoffsetNumber] = useState(30);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true);
            let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=" + (offsetNumber - 30));
            // maping response so it will become name and id only;
            const remaping_pokemon = response.data.results.map(pokemon => { return { name: pokemon.name, id: pokemon.url.split("/").filter(url => url.trim().length > 0)[5] } });
            
            setTimeout(()=>{
                setPokemons((prev) => [...prev, ...remaping_pokemon]);
                setLoading(false);
            },100)
            
        };
        getPokemons()
    }, [offsetNumber])

    const loadMore = () => {
        setoffsetNumber(offsetNumber + 30);
    };

    const PokemonImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    return (
        <div>
            {/* <HeroSearch>
                <Search placeholder="Search Pokemon Here" onChange={(e) => setFindPokemon(e.target.value)}></Search>
                <SearchButton onClick={fetchPokemon}>Search</SearchButton>
            </HeroSearch> */}
            <Hero>
                <HeroImage>
                    <img src="/pokemon-dex/images/pokemon-text.png" alt="title_pokemon" />
                </HeroImage>
            </Hero>

            <PokemonContainer>
                {pokemons.map((pokemon,index) =>
                    <PokemonCard key={index}>
                        <Wrapper>
                            <Link to={'/detail/' + pokemon.id}>
                                <img src={PokemonImageUrl + pokemon.id + ".png"} alt={pokemon.name} />
                            </Link>
                        </Wrapper>
                        <PokemonTitle>{pokemon.name}</PokemonTitle>
                    </PokemonCard>
                )}

               
            </PokemonContainer>
            {loading ? <h3 style={{margin:"50px"}}>Loading ...</h3> : <LoadButton onClick={loadMore}>
                    Load More
                </LoadButton>}


        </div>
    );
};

// const HeroSearch = styled.div`
//     min-height: 200px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
// `;

const Hero = styled.div`
    min-height: 200px;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeroImage = styled.div`
    width: min(50%,500px);
`;

// const Search = styled.input`
//   width: min(50%,400px);
//   height: 2em;
//   border-radius: 15px;
//   padding: 1em;
//   border: 2px solid #c9c9c9;
//   text-align: center;
// `;
// const SearchButton = styled.button`
//     margin: 20px 0;
//     padding: 1em;
//     border-radius: 15px;
//     font-family: var(--main-font);
//     text-transform: uppercase;
//     font-weight: 500;
//     border: 2px solid #c9c9c9;
// `;

const PokemonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: min(90%,1200px);
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px) {
        flex-direction: row;
        justify-content: center;
    }
`
const PokemonCard = styled.div`
    border-radius: 20px;
    box-shadow: 0 1px 1px rgb(100 100 100 / 50%);
    margin: 10px;
    padding: 20px;
    text-align: center;
    background-color: #fafafa;
    width:min(30%,200px);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    text-transform: capitalize;

    &:hover{
        transform: scale(1.05);
        transition: all 300ms ease-in-out 0s;
    }


`
const PokemonTitle = styled.h3`

`;

const Wrapper = styled.div`
    background-color: #fff;
    border-radius: 50%;
    width: min(60%,100px);
    height: min(60%,100px);
    box-shadow: 0 1px 15px hsl(203 100% 37%);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadButton = styled.button`
    background-color: hsl(207,83%,53%);
    color : #fff;
    font-size: 1.2rem;
    padding: 0.5em 1em;
    border: none;
    box-shadow: 0 1px 1px rgb(100 100 100 / 50%);
    border-radius: 10px;
    cursor: pointer;
    margin: 50px;
`;
export default Home;