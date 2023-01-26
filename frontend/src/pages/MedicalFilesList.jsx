import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EnhancedTableHead from "../components/table/EnhancedTableHead";
import EnhancedTableToolbar from "../components/table/EnhancedTableToolbar";
import { Box, Paper, FormControlLabel, TableContainer, Table, TableBody, TableCell, TableRow, TablePagination, Checkbox, Switch } from "@mui/material";
import { getMedicalFiles, deleteMedicalFile } from "../features/medicalFiles/medicalFilesSlice";
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'

function MedicalFilesList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {medicalFiles, isLoading} = useSelector((state) => state.medicalFiles)
  
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('cageNum');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const headCells = [
      {
        id: 'cageNum',
        numeric: true,
        disablePadding: false,
        label: 'כלוב מספר',
      },
      {
        id: 'arrivalDate',
        numeric: false,
        disablePadding: false,
        label: 'תאריך הגעה',
      },
      {
        id: 'refNum',
        numeric: true,
        disablePadding: false,
        label: 'מספר פנייה',
      },
      {
        id: 'refName',
        numeric: false,
        disablePadding: false,
        label: 'שם הפונה',
      },
      {
        id: 'feederName',
        numeric: false,
        disablePadding: false,
        label: 'שם המאכיל',
      },
      {
        id: 'trappingAd',
        numeric: false,
        disablePadding: false,
        label: 'כתובת הלכידה',
      },
      {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'מין',
      },
      {
        id: 'color',
        numeric: false,
        disablePadding: false,
        label: 'צבע',
      },
      {
        id: 'mainDiagnosis',
        numeric: false,
        disablePadding: false,
        label: 'אבחנה ראשית',
      },
      {
        id: 'releaseDate',
        numeric: false,
        disablePadding: false,
        label: 'תאריך שחרור',
      },
    
    ];

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
  
    useEffect(() => {
      dispatch(getMedicalFiles())
    }, [dispatch])
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = medicalFiles.map((n) => n.refNum);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const onDelete = (medicalFileIds) => {
      if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
        dispatch(deleteMedicalFile(medicalFileIds)).unwrap().then(() => {
          toast.success('המחיקה בוצעה בהצלחה')
          setSelected([])
        })
        .catch(toast.error)
        
    }
    }
  
    const isSelected = (id) => selected.indexOf(id) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicalFiles.length) : 0;
  
    if(isLoading) {
      return <Spinner />
    }  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} onDelete={onDelete} selected={selected}/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={medicalFiles.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(medicalFiles, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{cursor: 'pointer'}}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row._id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.cageNum}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{new Date(row.arrivalDate).toLocaleString(["ban", "id"]).split(' ')[0]}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.refNum}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.refName}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.feederName}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.trappingAd}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.gender}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.color}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{row.mainDiagnosis}</TableCell>
                        <TableCell onClick={() => navigate(`/medical-file/${row._id}`)} align="center">{new Date(row.releaseDate).toLocaleString(["ban", "id"]).split(' ')[0]}</TableCell>
  
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={medicalFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
}

export default MedicalFilesList
