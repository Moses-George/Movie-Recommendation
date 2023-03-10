import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Google, Facebook } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Divider, Chip } from "@mui/material";
import '../../styles/pages/Auth.scss';
import Button from "../../components/UI/Button";
import { auth, signUpWithEmailAndPassword, signInWithGoogle, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Spinner from "../../components/UI/Spinners/Spinner";

const textFieldStyle = { width: "100%", "& .MuiFilledInput-root": { backgroundColor: "gray", color: "#fff" } }

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordIsInvalid, setPasswordIsInvalid] = useState("");
    const [invalidUsernameMessage, setInvalidUsernameMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [user, error] = useAuthState(auth);
    const navigate = useNavigate();
    // console.log(user);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
        if (error) {
            console.log(error);
        }
    }, [user, error, navigate])

    useEffect(() => {
        const usernameIsValid = (/^[a-z0-9_.]+$/).test(username);
        const identifier = setTimeout(() => {
            if (!username) {
                setInvalidUsernameMessage("");
            }

            if (!usernameIsValid && username.trim().length > 0) {
                setInvalidUsernameMessage("Username can only use letters, numbers, underscores and periods");
            }

            if (usernameIsValid) {
                setInvalidUsernameMessage("");
            }
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [username]);

    useEffect(() => {
        const atLeastTwoDigits = new RegExp("[0-9].*[0-9]").test(password);
        const atLeastOneCharacter = new RegExp("[a-zA-Z]").test(password);
        const lengthGreaterThanOrEqualToSix = password.length >= 6;

        const identifier = setTimeout(() => {
            if (!password) {
                setPasswordIsInvalid("");
            }

            if (!lengthGreaterThanOrEqualToSix && password.trim().length > 0) {
                setPasswordIsInvalid("Password length must be greater than or equal to 6 ");
            }

            if (lengthGreaterThanOrEqualToSix && !atLeastOneCharacter) {
                setPasswordIsInvalid("Password must contain at least one characters");
            }

            if (lengthGreaterThanOrEqualToSix && !atLeastTwoDigits) {
                setPasswordIsInvalid("Password must contain at least two digits");
            }

            if (lengthGreaterThanOrEqualToSix && atLeastTwoDigits && atLeastOneCharacter) {
                setPasswordIsInvalid("");
            }
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [password]);

    const signUpWithEmailAndPassword = async (username, email, password) => {
        setIsLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          console.log(user);
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            username,
            authProvider: "local",
            imageUrl: "",
            email
          })
        } catch (err) {
          console.log(err);
          alert(err.message);
        }
        setIsLoading(false);
      };

    const signUp = async (e) => {
        e.preventDefault();
        signUpWithEmailAndPassword(username, email, password);
    }

    return (
        <>
            {isLoading && <Spinner />}
            <div className="sign-up__wrapper">
                <h1>GEO MOVIES</h1>
                <div className="form-container">
                    <div className="form-control">
                        <h1>Sign Up</h1>
                        <form onSubmit={signUp} >
                            <TextField label="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                variant="filled"
                                required
                                sx={textFieldStyle} />
                            {invalidUsernameMessage && <p className="error-message">{invalidUsernameMessage}</p>}
                            <TextField label="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                variant="filled"
                                required
                                sx={textFieldStyle} />
                            <TextField label="Enter Password"
                                variant="filled"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {passwordIsInvalid && <p className="error-message">{passwordIsInvalid}</p>}
                            <Button disabled={passwordIsInvalid || invalidUsernameMessage} >Sign Up</Button>
                        </form>
                        <div>
                            <Divider sx={{ "&::before, &::after": { borderColor: "#fff" } }} >
                                <Chip label="OR" sx={{ color: "#fff", borderColor: "#fff" }} />
                            </Divider>
                        </div>
                        <div className="alt-auth">
                            <Button> <Google /> </Button>
                            <Button onClick={signInWithGoogle} > <Facebook /> </Button>
                        </div>
                        <p className="member">Already a member ? <Link to="/auth/login">LOGIN</Link> </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;