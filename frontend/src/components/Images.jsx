import { Button, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadImages } from "../features/medicalFiles/medicalFilesSlice";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteImage } from "../features/medicalFiles/medicalFilesSlice";

function Images({images, setFormInput, formInput, setEdited}) {

    const dispatch = useDispatch()

    const handleFileUpload = (e) => {
        if (!e.target.files) {
          return;
        }
        setFormInput({
            ...formInput,
           images: e.target.files})
    };

    const handleDelete = (image) => {
        setEdited(true)
        dispatch(deleteImage(image?.split('/')[4]))
    }

    const handleSubmitUpload = () => {
        setEdited(true)
        dispatch(uploadImages(formInput.images))
    } 

  return (
    <>
    <div className="formImages">
        <label className='formLabel'>שים לב! יש להעלות מקסימום 3 תמונות</label>  
        <input 
        className='formInputFile'
        type='file'
        id='images'
        name='images'
        onChange={handleFileUpload}
        max='3'
        accept='.jpg,.png,.jpeg'
        multiple
        />
        <Button     
        variant='outlined' 
        onClick={handleSubmitUpload}
        sx={{color: 'CadetBlue', marginTop: '10px'}}
        >
        שמירת הקובץ&nbsp;
          <AddIcon />     
        </Button>
    </div>
    <h3>רשימת התמונות:</h3>
    <ul className="imagesLinks">
      {images.map((image, index) => (
        <Tooltip title="מחיקה"  key={index}>
            <li>
                <IconButton onClick={() => handleDelete(image)}>
                    <ClearIcon />
                </IconButton>
                <a  href={image} target="_blank">{image?.split('/')[4]}</a>
            </li>
        </Tooltip>
        ))}
     </ul>
     </>
    
    )
}

export default Images
