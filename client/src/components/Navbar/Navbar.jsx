import React, {useState, useEffect} from "react";
import { Link,useHistory, useLocation } from "react-router-dom";
import {useDispatch} from "react-redux"
import decode from "jwt-decode"
import { AppBar, Typography,Toolbar,Avatar,Button } from "@material-ui/core";
import memories from "../../images/memories.png";

import useStyles from "./styles";

function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();  //check sự thay đổi của localStore
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    useEffect(() => {
        const token = user?.token
        //JWT
        if(token){
            const decodeToken = decode(token);
            if(decodeToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    },[location])
    
    const logout = () => {
        dispatch({type: "LOGOUT"})
        history.push("/")
        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherits">
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.heading}
                    variant="h2"
                    align="center"
                >
                    Memories
                </Typography>
                <img
                    className={classes.image}
                    src={memories}
                    alt="memories"
                    height="90"
                ></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} arc={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button  component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar