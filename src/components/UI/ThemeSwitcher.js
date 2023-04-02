import { useSelector, useDispatch } from "react-redux";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { toggleTheme } from "../../store/features/Theme/themeSlice";

const ThemeSwitcher = () => {

    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    return (
        <div style={{
            position: "absolute",
            top: "10px",
            right: "10px"
        }}>
            <FormGroup>
                <FormControlLabel control={
                    <Switch checked={theme.darkTheme} onChange={() => dispatch(toggleTheme())} />}
                    label="Toggle theme"
                />
            </FormGroup>
        </div>
    )
}

export default ThemeSwitcher;