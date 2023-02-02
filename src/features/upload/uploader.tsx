import {Input, Typography} from "@mui/material";

function Uploader() {

    const onFileChangeHandler = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0])
        fetch('http://localhost:8080/api/file/upload', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                alert("File upload successful");
            }
        });
        console.log(formData);
        
    }
    return ( 
        <>
            <Typography variant="h2">
            Uploader Page
             </Typography>

        <Input type="file" onChange={onFileChangeHandler} />
        </>
     );
}

export default Uploader;