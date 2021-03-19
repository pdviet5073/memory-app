import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../redux/actions/posts";

function Form({ currentId, setCurrentId }) {
    const post = useSelector((state) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    console.log("file: Form.jsx > line 16 > Form > currentId", currentId);
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            );
        clear();
    };

    if (!user?.result?.name) {
        <Paper className={classes.paper}></Paper>;
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    return (
        <Paper className={classes.paper}>
            {!user?.result?.name ? (
                <Typography variant="h6" align="center">
                    please Sign In to create your own memories and lie other's
                    memories
                </Typography>
            ) : (
                <form
                    autoComplete="off"
                    noValidate
                    className={`${classes.root} ${classes.form}`}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6">
                        {currentId ? "Editing" : "Creating"} a Memory
                    </Typography>

                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={postData.title}
                        onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                        }
                    />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        value={postData.message}
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                message: e.target.value,
                            })
                        }
                    />
                    <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                tags: e.target.value.split(","),
                            })
                        }
                    />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                })
                            }
                        ></FileBase>
                    </div>
                    <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="Primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={clear}
                        fullWidth
                    >
                        Clear
                    </Button>
                </form>
            )}
        </Paper>
    );
}

export default Form;
