import { TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import './SearchBar.scss';

const SearchBar = ({onClick}) => {

    return (
        <div className="searchBar">
            <ArrowBack sx={{alignSelf: "flex-end"}} onClick={onClick} />
            <TextField label="search for a movie..." variant="standard" sx={{width: "100%"}} />
        </div>
    )
}

export default SearchBar;