import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMore: boolean;
    onSetDarkMore: (isDark: boolean) => void;
}

function Header(props: Props) {

    //function
    const handleChange = (event: any) => {
        props.onSetDarkMore(event.target.checked);
    }
    return ( 
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">My Shop</Typography>
                <Switch
                    checked={props.darkMore}
                    onChange={handleChange}
                    inputProps={{'aria-label':'controlled'}}
                />
            </Toolbar>
       </AppBar>
     );
}

export default Header;