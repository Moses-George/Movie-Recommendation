import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import '../../styles/Movies/MovieSearch.scss';
import Button from "../UI/Button";

const textFieldStyle = {
    width: "100%", "&:hover": { backgroundColor: "#464646" },
    "& .MuiFilledInput-root": { backgroundColor: "gray", color: "#fff" }
}

const MovieSearch = ({ type }) => {

    const [rating, setRating] = useState("");

    return (
        <div className="movie-search">
            <div className="movie-search__header">{`SEARCH FOR A ${type}`}</div>
            <div className="movie-search__form">
                <form>
                    <TextField label="Enter  name" type="text"
                        variant="filled"
                        sx={textFieldStyle} />
                    <FormControl fullWidth sx={textFieldStyle}>
                        <InputLabel id="demo-simple-select-label">Select Genre</InputLabel>
                        <Select variant="filled" 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" value={rating}
                            label="Genre"
                            onChange={(e) => setRating(e.target.value)} >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={textFieldStyle}>
                        <InputLabel id="demo-simple-select-label">Rating Range</InputLabel>
                        <Select variant="filled" 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" value={rating}
                            label="Rating Range"
                            onChange={(e) => setRating(e.target.value)} >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </FormControl>
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default MovieSearch;