import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    font-size: 16px;
`;

const Stats = () => {
    const state = useSelector((state) => state.tasks);

    const completed = state.tasks.filter(task => task.status).length;
    const unCompleted = state.tasks.filter(task => !task.status).length;

    return (
        <Wrapper>
            Completed: {completed}&#9989;
            <br />
            Uncompleted: {unCompleted}&#10060;
        </Wrapper>
    );
};

export default Stats;
