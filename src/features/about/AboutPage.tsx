import {Button, ButtonGroup, Typography} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";

function AboutPage() {
    return ( 
        <Container>
            <Typography>
                Testing error message
            </Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={() => axios.post('buggy/validate-error', {
                    "name": "",
                    "email": "test"
                }).then(response => console.log(response.data)).catch(error  => console.log(error))}>
                    Test Validation Error
                </Button>

                <Button variant="contained" onClick={() => axios.get('buggy/404').then(response => console.log(response.data))}>
                    Test Validation Error
                </Button>

                <Button variant="contained" onClick={() => axios.get('buggy/500').then(response => console.log(response.data))}>
                    Test Validation Error
                </Button>
            </ButtonGroup>

        </Container>
     );
}

export default AboutPage;