import { TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import './SearchBar.scss';

const SearchBar = ({onClick, onChange}) => {

    return (
        <div className="searchBar">
            <ArrowBack sx={{alignSelf: "flex-end"}} onClick={onClick} /> 
            <TextField onChange={onChange}  label="search for a movie..." variant="standard" sx={{width: "100%"}} />
        </div>
    )
}

export default SearchBar;