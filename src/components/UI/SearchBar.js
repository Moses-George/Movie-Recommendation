import { TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import './SearchBar.scss';

const SearchBar = ({onClick, setSearchTerm, searchTerm}) => {

    return (
        <div className="searchBar">
            <ArrowBack sx={{alignSelf: "flex-end"}} onClick={onClick} /> 
            <TextField onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm} label="search for a movie..." variant="standard" sx={{width: "100%"}} />
        </div>
    )
}

export default SearchBar;