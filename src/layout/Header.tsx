import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Switch, Toolbar, Typography, ListItem, List, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

interface Props {
    darkMore: boolean;
    onSetDarkMore: (isDark: boolean) => void;
}

function Header(props: Props) {

    const { basket } = useContext(StoreContext);

    //function counter basket
    const itemCount = basket?.basketItems
        /**
         * case: 1
         *  var sum = 0;
                 for (let i = 0; i < basket!.basketItems.length!; i++) {
                     sum = sum + basket!.basketItems[i].quantity;
                     const itemCount = sum;
                 }
         */
        
        //case: 2
        .reduce((sum, item) => sum + item.quantity, 0);
    
    

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

    const stylesNav = {
        color: 'inherit', '&:hover': { color: 'grey.500' }, '&.active': { color: 'text.secondary' },
    }

    //function
    const handleChange = (event: any) => {
        props.onSetDarkMore(event.target.checked);
    }
    return ( 
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6" component={NavLink} to='/'>My Shop</Typography>
                <Switch
                    checked={props.darkMore}
                    onChange={handleChange}
                    inputProps={{'aria-label':'controlled'}}
                />
                </Box>
                
                <List sx={{display: "flex"}}>
                    {midLinks.map(({ title, path }) => {
                        return (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={stylesNav}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        )
                    })}
                </List>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton component={Link} to='/basket' size="large" sx={{color: 'inherit'}}>
                <Badge badgeContent={itemCount} color="secondary">
                        <ShoppingCart />
                        </Badge>
                    </IconButton>

                <List sx={{display: "flex"}}>
                    {rightLinks.map(({ title, path }) => {
                        return (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={stylesNav}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        )
                    })}
                </List>
                </Box>
            </Toolbar>
       </AppBar>
     );
}

export default Header;