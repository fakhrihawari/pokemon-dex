import { useCallback, useMemo, useReducer, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
    width: min(80%,1000px);
    margin-inline:auto;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%-2rem;
    height: 100vh;
    flex-direction: column;
    
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 20px;
`;
const reducer = (state,action)=>{
    switch(action.type){
        case 'tambah':
            return state+1;
        case 'kurang':
            return  state<=0?0:state-1;
        default:
            throw new Error(); 
    }
};
const Other = () => {
    const [number, setNumber] = useState(0);
    const [state, dispatch] = useReducer(reducer,0);
    const expensiveCount = useMemo(()=>{
        return number **2;
    },[number])
    const showNumber = useCallback(()=>{
        alert(`Count ${number}`)
    },[number]);



    return (
        <Container>

            <Wrapper>

                <h1>{(number <= 0) ? 0 : number}</h1>
                <ButtonWrapper>
                    <button onClick={() => setNumber(number + 1)}>+</button>
                    <button onClick={() => setNumber(number - 1)}>-</button>
                </ButtonWrapper>
                <h1>useReducer:{state}</h1>
                <ButtonWrapper>
                    <button onClick={() => dispatch({type:'tambah'})}>+</button>
                    <button onClick={() => dispatch({type:'kurang'})}>-</button>
                </ButtonWrapper>
                <h3></h3>


            </Wrapper>

        </Container>
    )
};

export default Other