import { TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import './SearchBar.scss';

const SearchBar = ({onClick, onChange, value}) => {

    return (
        <div className="searchBar">
            <ArrowBack sx={{alignSelf: "flex-end"}} onClick={onClick} /> 
            <TextField autoComplete="off" onChange={onChange} value={value}  label="search for a movie..." variant="standard" sx={{width: "100%"}} />
        </div>
    )
}

export default SearchBar;