import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import styled from "styled-components";
import Home from "./Pages/Home/Home";
import "./style.css";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Wrapper>
                    <Home />
                </Wrapper>
            </Provider>
        </React.StrictMode>
    );
}
// store.subscribe(() => console.log(store.getState()));

export default App;
