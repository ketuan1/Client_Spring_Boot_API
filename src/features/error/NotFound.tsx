import { Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";

import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return ( 
        <Container>
            <Typography gutterBottom variant="h3">Not Found</Typography>
            <Divider />
            <Button  onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
     );
}

export default NotFound;