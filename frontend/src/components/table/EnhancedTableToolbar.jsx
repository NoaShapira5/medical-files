import PropTypes from 'prop-types';
import {Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';




function EnhancedTableToolbar(props) {
    const { numSelected, onDelete, selected } = props;

    const navigate = useNavigate()
  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const MyOptions = [
      "יצא לקובץ אקסל",
      "ייצא לקובץ וורד",
      "PDF ייצא לקובץ"
      ];
    
    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Tooltip title="Delete"
           >
            <IconButton onClick={() => onDelete(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list"
           sx={{ position: 'absolute', left: '130px' }}
           >
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
  
        {numSelected > 0 ? (
          <Typography
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} נבחרו
          </Typography>
        ) : (
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
          >
            תיקים רפואיים
          </Typography>
        )}
        <IconButton
          sx={{position: 'absolute', right: '5px'}}
          aria-label="more"
          onClick={handleClickMore}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <MoreVertIcon color='action'/>
        </IconButton>
        <Menu 
          anchorEl={anchorEl} 
          keepMounted onClose={handleClose} 
          open={open}>
          {MyOptions.map((option) => (
            <MenuItem
              key={option} 
              onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Button variant="contained" onClick={() => navigate('/create-file')}
         sx={{position: 'absolute', right: '50px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
          הוסף
        </Button>
        <Button variant="contained" onClick={() => navigate('/management')}
         sx={{position: 'absolute', right: '120px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
          ניהול
        </Button>
      </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

export default EnhancedTableToolbar
