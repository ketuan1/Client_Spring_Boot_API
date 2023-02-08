import {Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";

function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    return ( 
        <Container>
            <Typography>
                Testing error message
            </Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={() => axios.post('buggy/validate-error', {
                    "name": "",
                    "email": "test"
                })
                    .then(response => console.log(response.data))
                    .catch(error => {
                        console.log(error);
                        setValidationErrors(error);
                        
                    })}>
                    Test Validation Error
                </Button>

                <Button variant="contained" onClick={() => axios.get('buggy/404').then(response => console.log(response.data))}>
                    Test Validation Error 400
                </Button>

                <Button variant="contained" onClick={() => axios.get('buggy/500').then(response => console.log(response.data))}>
                    Test Validation Error 500
                </Button>
            </ButtonGroup>

            {
                validationErrors.length > 0 &&
                <Alert security="error">
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {validationErrors.map((error) => (
                                    <ListItem key={error}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                ))}
                        </List>
                </Alert>
            }

        </Container>
     );
}

export default AboutPage;