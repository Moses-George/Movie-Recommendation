import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "../../components/UI/Button";
import '../../styles/pages/Settings.scss';

const textFieldStyle = { width: "80%", "& .MuiFilledInput-root": { backgroundColor: "gray", color: "#fff" } }

const Settings = () => {

    const [showPassword, setShowPassword] = useState(false);

    const InputProps = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility sx={{ color: "#fff" }} /> : <VisibilityOff sx={{ color: "#fff" }} />}
                </IconButton>
            </InputAdornment>
        )
    }


    return (
        <div className="settings">
            <div className="edit-bio">
                <h2>Edit Bio</h2>
                <form>
                    <TextField label="Enter Username" type="email"
                        variant="filled"
                        sx={textFieldStyle} />
                    <TextField label="Enter Email" type="email"
                        variant="filled"
                        sx={textFieldStyle} />
                    <TextField label="Enter State" type="email"
                        variant="filled"
                        sx={textFieldStyle} />
                    <TextField label="Enter Country" type="email"
                        variant="filled"
                        sx={textFieldStyle} />
                    <Button>Save</Button>
                </form>
            </div>
            <div className="change-password">
                <h2>Change Password</h2>
                <form>
                    <TextField label="Enter current Password" variant="filled"
                        type={showPassword ? "text" : "password"}
                        sx={textFieldStyle}
                        InputProps={InputProps}
                    />
                    <TextField label="Enter new Password" variant="filled"
                        type={showPassword ? "text" : "password"}
                        sx={textFieldStyle}
                        InputProps={InputProps}
                    />
                    <TextField label="Confirm new Password" variant="filled"
                        type={showPassword ? "text" : "password"}
                        sx={textFieldStyle}
                        InputProps={InputProps}
                    />
                    <Button>Change Password</Button>    
                </form>
            </div>
        </div>
    )
}

export default Settings;