import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Switch, Toolbar, Typography, ListItem, List } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

interface Props {
    darkMore: boolean;
    onSetDarkMore: (isDark: boolean) => void;
}

function Header(props: Props) {

    const midLinks = [
        { title: 'catalog', path: '/catalog' },
        { title: 'about', path: '/about' },
        { title: 'contact', path: '/contact' },
        { title: 'upload', path: '/upload' },
    ];

    const rightLinks = [
        { title: 'login', path: '/login' },
        { title: 'register', path: '/register' },
    ];

    const styleNav = {
        color: 'inherit', '&hover': { color: 'grey.500' }, '&.active': { color: 'text.secondary' }, textDecoration: 'none'

    }

    //function
    const handleChange = (event: any) => {
        props.onSetDarkMore(event.target.checked);
    }
    return ( 
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6" component={NavLink} to='/'>My Shop</Typography>
                <Switch
                    checked={props.darkMore}
                    onChange={handleChange}
                    inputProps={{'aria-label':'controlled'}}
                />
                <List sx={{display: "flex"}}>
                    {midLinks.map(({ title, path }) => {
                        return (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={{styleNav}}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        )
                    })}
                </List>

                <IconButton size="large" sx={{color: 'inherit'}}>
                <Badge badgeContent={4} color="secondary">
                        <ShoppingCart sx={{ color: 'red' }} />
                        </Badge>
                    </IconButton>

                <List sx={{display: "flex"}}>
                    {rightLinks.map(({ title, path }) => {
                        return (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={{styleNav}}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        )
                    })}
                </List>

            </Toolbar>
       </AppBar>
     );
}

export default Header;