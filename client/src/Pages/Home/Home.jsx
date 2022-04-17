import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../features/tasksSlice";
import { Grid } from "react-loader-spinner";
import Task from "../../Components/Task";
import AddTaskMenu from "../../Components/AddTaskMenu";
import Stats from "../../Components/Stats";

import { Wrapper, List, HeaderText } from "./style";

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    return (
        <Wrapper>
            <HeaderText>Todo App</HeaderText>
            <AddTaskMenu />

            {state.status === "pending" ? (
                <Grid color="#000" radius={8}/>
            ) : (
                <List>
                    {state.tasks.map((task) => (
                        <Task key={task._id} {...task} />
                    ))}
                </List>
            )}

            <hr color="black" width="100%" />
            <Stats />
        </Wrapper>
    );
};

export default Home;
