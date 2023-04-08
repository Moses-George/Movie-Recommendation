import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import '../../styles/pages/Auth.scss';
import Button from "../../components/UI/Button/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthSpinner from "../../components/UI/Spinners/AuthSpinner";

const textFieldStyle = { width: "100%", "& .MuiFilledInput-root": { backgroundColor: "gray", color: "#fff" } }

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <AuthSpinner />}
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
                                onChange={(e)=> setEmail(e.target.value)}
                                value={email}
                                required
                                sx={textFieldStyle} />
                            <TextField
                                label="Enter Password"
                                variant="filled"
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password}
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
                        <div className="or">OR</div>
                        </div>
                        <div className="alt-auth">
                            <Button onClick={signInWithGoogle} > <Google /> </Button>
                            <Button onClick={() => alert("This option is disabled!. You may want to sign in with google")}  > <Facebook /> </Button>
                        </div>
                        <p className="member">Don't have an account ? <Link to="/auth/sign-up">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;