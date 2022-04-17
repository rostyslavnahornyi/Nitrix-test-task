import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../features/tasksSlice";
import styled from "styled-components";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@mui/material";

const Wrapper = styled.div`
    font-size: 20px;
    width: 100%;
    margin: 5px 0;
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    word-wrap: break-word;
    min-height: 40px;
    height: 100%;
    padding-left: 10px;
    border-radius: 5px 0 0 5px;
    background: rgba(180, 180, 180, 0.3);
    transition: 0.4s;

    &&:hover {
        background: rgba(180, 180, 180, 0.5);
    }
`;

const Icon = styled.div`
    height: 100%;
    width: 40px;
    position: relative;
    background: rgba(
        ${({ isUpdating }) => (isUpdating ? `0, 0, 255` : `255, 0, 0`)},
        0.5
    );
    display: flex;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    align-items: center;
    transition: 0.4s;

    &&:hover {
        background: rgba(
            ${({ isUpdating }) => (isUpdating ? `0, 0, 255` : `255, 0, 0`)},
            0.9
        );
        cursor: pointer;
    }
`;

const Span = styled.span`
    cursor: "pointer";
    userselect: "none";
    margin: "10px";
`;

const Task = ({ _id, name, status }) => {
    const dispatch = useDispatch();
    const span = useRef();

    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setText(name);
        setCompleted(status);
    }, []);

    useEffect(() => {
        completed
            ? (span.current.style.textDecoration = "line-through")
            : (span.current.style.textDecoration = "none");
    }, [completed]);

    const singleClickHandler = (e) => {
        if (!isUpdating) {
            setCompleted(!completed);
            dispatch(updateTask({ _id, name: text, status: !completed }));
        }
    };
    const doubleClickHandler = (e) => {
        setIsUpdating(!isUpdating);

        // random double click on textarea to save data
        if (isUpdating) {
            dispatch(updateTask({ _id, name: text, status: completed }));
        }
    };

    const saveHandler = (e) => {
        setIsUpdating(false);

        dispatch(updateTask({ _id, name: text, status: completed }));
    };

    return (
        <Wrapper>
            <Text
                onClick={singleClickHandler}
                onDoubleClick={doubleClickHandler}
            >
                {isUpdating ? (
                    <TextareaAutosize
                        defaultValue={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: "100%" }}
                    />
                ) : (
                    <Span ref={span}>{text}</Span>
                )}
            </Text>
            <Icon isUpdating={isUpdating}>
                {isUpdating ? (
                    <SendIcon
                        onClick={saveHandler}
                        style={{
                            color: "white",
                        }}
                        sx={{ fontSize: 25, cursor: "pointer" }}
                    />
                ) : (
                    <DeleteOutlinedIcon
                        onClick={() => dispatch(deleteTask({ _id }))}
                        style={{
                            color: "white",
                        }}
                        sx={{ fontSize: 25, cursor: "pointer" }}
                    />
                )}
            </Icon>
        </Wrapper>
    );
};

export default Task;
