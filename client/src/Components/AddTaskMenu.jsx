import React, { useState } from "react";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasksSlice";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0 20px;
`;

const AddTaskMenu = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const createHandler = (e) => {
        dispatch(createTask({ name: value }));
        setValue("");
    };

    return (
        <Wrapper>
            <TextField
                onChange={(e) => setValue(e.target.value)}
                value={value}
                fullWidth
                label="Add your new Todo"
                variant="outlined"
                inputProps={{maxLength: 255}}
            />
            <AddBoxIcon
                onClick={createHandler}
                color="primary"
                sx={{ fontSize: 70, cursor: "pointer" }}
            />
        </Wrapper>
    );
};

export default AddTaskMenu;
