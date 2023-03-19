import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Divider, Chip } from "@mui/material";
import '../../styles/pages/Auth.scss';
import Button from "../../components/UI/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../../firebase";
import Spinner from "../../components/UI/Spinners/Spinner";
import { signInWithEmailAndPassword } from "firebase/auth";

const textFieldStyle = { width: "100%", "& .MuiFilledInput-root": { backgroundColor: "gray", color: "#fff" } }

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const logIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Spinner />}
            <div className="sign-up__wrapper">
                <h1>GEO MOVIES</h1>
                <div className="form-container">
                    <div className="form-control">
                        <h1>Login</h1>
                        <form onSubmit={logIn} >
                            <TextField
                                label="Enter Email"
                                type="email"
                                variant="filled"
                                inputRef={emailRef}
                                required
                                sx={textFieldStyle} />
                            <TextField
                                label="Enter Password"
                                variant="filled"
                                inputRef={passwordRef}
                                required
                                type={showPassword ? "text" : "password"}
                                sx={textFieldStyle}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <Visibility sx={{ color: "#fff" }} /> : <VisibilityOff sx={{ color: "#fff" }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {error && <p className="error-message">{error}</p>}
                            <Button>Login</Button>
                        </form>
                        <div>
                            <Divider sx={{ "&::before, &::after": { borderColor: "#fff" } }} >
                                <Chip label="OR" sx={{ color: "#fff", borderColor: "#fff" }} />
                            </Divider>
                        </div>
                        <div className="alt-auth">
                            <Button onClick={signInWithGoogle} > <Google /> </Button>
                            <Button onClick={()=> alert("This option is disabled!. You may want to sign up with google")}  > <Facebook /> </Button>
                        </div> 
                        <p className="member">Don't have an account ? <Link to="/auth/sign-up">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;