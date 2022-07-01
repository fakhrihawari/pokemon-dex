import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

const Detail = () => {
    const { id } = useParams();
    const [detailData, setDetailData] = useState({});
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
    const [abilities, setAbilities] = useState([]);

    const pokeDetailEndPoint = "https://pokeapi.co/api/v2/pokemon/";
    const fetchData = async (id) => {
        const response = await axios.get(pokeDetailEndPoint + id);
        setDetailData(response.data);
        setStats(response.data.stats);
        setTypes(response.data.types);
        setAbilities(response.data.abilities);

    }
    useEffect(() => {
        fetchData(id);
    }, [id])

    return (
        <Container>
            <PokemonTitle>{detailData.name}</PokemonTitle>
            <PokemonStatWraper>
                <PokemonStatImageWraper>
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"} alt={detailData.name} />
                </PokemonStatImageWraper>

                <PokemonInfoCard>
                    <PokemonSubtitle>Stats</PokemonSubtitle>
                    <PokemonStatInfo>
                        {stats.map((stat, id) => {
                            return (
                                <PokemonStatInfoItem key={stat.stat.name}>
                                    <h2>{stat.base_stat}</h2>
                                    <P>{stat.stat.name.toUpperCase()}</P>

                                </PokemonStatInfoItem>)
                        })}

                    </PokemonStatInfo>
                </PokemonInfoCard>


                <PokemonInfoCard>
                    <PokemonSubtitle>Abilities</PokemonSubtitle>
                    <PokemonInfoWrapper>
                        {abilities.map(pokemon =>
                            <Type key={pokemon.slot}>{pokemon.ability.name}</Type>
                        )}
                    </PokemonInfoWrapper>

                </PokemonInfoCard>

                <PokemonInfoCard>
                    <PokemonSubtitle>Type</PokemonSubtitle>
                    <PokemonInfoWrapper>
                        {types.map((pokemon, id) =>
                            <Type key={pokemon.slot}>{pokemon.type.name}</Type>
                        )}
                    </PokemonInfoWrapper>

                </PokemonInfoCard>
            </PokemonStatWraper>


        </Container>
    )
};


const Container = styled.div`
    width: min(80%,700px);
    margin: 100px auto;
    padding : 0 20px;
    @media (min-width: 600px) {
    }
`;

const PokemonTitle = styled.h2`
    text-transform: capitalize;
`;

const Card = styled.div`
    border-radius: 10px;
    box-shadow: 0 1px 1px rgb(100 100 100 / 50%);
`

const PokemonStatWraper = styled.div`
    margin-top: 50px;

    display: flex;
    flex-wrap:wrap;
    gap:20px;
    justify-content:center;
    
`;
const PokemonStatImageWraper = styled(Card)`
    width: min(100%,300px);
    background-color: #fafafa;

`;
const PokemonStatInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;

`;
const PokemonStatInfoItem = styled(Card)`
    width:min(33%, 90px);
    background-color: hsl(48 100% 50%) ;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color:#fff;
`;
const PokemonSubtitle = styled.h3`
    text-align: left;
    margin-bottom: 10px;
`;
const PokemonInfoCard = styled(Card)`
    width: min(100%,300px);
    background-color: #fafafa;
    padding:20px;
`;
const PokemonInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    gap:20px;
`;
const Type = styled.div`
    padding: 10px;
    font-size: 16px;
    text-transform: capitalize;
    background-color: hsl(48 100% 50%);
    color:#fff;
    font-weight: 700;
    border-radius: 15px;
`;
const P = styled.div`
    margin: 0;
    font-size:10px;
    font-weight: 700;
`;
export default Detail;