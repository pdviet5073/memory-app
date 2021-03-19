import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {signUp, signIn} from "../../redux/actions/auth"
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
   
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./icon";
import useStyles from "./styles";

const initialState = {firstName:"", lastName:"",email:"",password:"",confirmPassword:"",}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    console.log('file: Auth.jsx > line 26 > Auth > isSignUp', isSignUp)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData, history))
        }else dispatch(signIn(formData, history))
        
    };
    const handleChange = (e) => {
        //cái này đỉnh cao vãi : [e.target.name]: e.target.value
        setFormData({...formData,[e.target.name]: e.target.value});
    };
    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMode = () => {
        setIsSignUp(!isSignUp);
        handleShowPassword(false);
    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj; //nếu tồn tại bên trái ?. thì thực hiện bên phải
        const token = res?.tokenId;
        try {
            dispatch({type: "AUTH", data:{result, token}})
            history.push('/')
        } catch (error) {
            
        }
        console.log(res)

    }
    const googleFailure =() => {
        console.log("Google Sign In was unsuccessful. Try again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Lsat"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sing Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="898018952527-qldgjm2s241mk05ihtgjcdhjoh0kf37i.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon variant="contained" />}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure= {googleFailure}
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
