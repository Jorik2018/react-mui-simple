import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import { Alert ,Dialog,DialogActions,DialogContent,DialogContentText} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { Autorenew } from '@mui/icons-material';
import { debounce,http } from 'gra-react-utils';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import {
  useNavigate
} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    textAlign: 'center',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const List = () => {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [state, setState] = useState({ page: 0 });
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [result, setResult] = useState({ size: 0, data: [] });
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);

  const isSelected = (code) => selected.indexOf(code) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = result.data.map((n) => n.code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
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

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result.rows.length) : 0;

  const ff = (p) => {
    try {
      fetchData(p);
      setPage(p);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    fetchData(0);
    setPage(0);
  };

  const onClickRefresh = () => {
    fetchData(state.page);
  }

  const fetchData = async (page) => {
    const result = await http.get('/admin/directory/api/people/' + page + '/' + rowsPerPage);
    setResult(result);
    setState({ page: page });
  };

  useEffect(() => {
    const debouncedHandleResize = debounce((width,height)=> {
      const header = document.querySelector('.MuiToolbar-root');
      const tableContainer = document.querySelector('.MuiTableContainer-root');
      const nav = document.querySelector('nav');
      const toolbarTable = document.querySelector('.Toolbar-table');
      if (tableContainer) {
        tableContainer.style.width = (width - nav.offsetWidth) + 'px';
        tableContainer.style.height = (height - header.offsetHeight
          - toolbarTable.offsetHeight) + 'px';
      }
    }, 500);
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, []);

  useEffect(() => { fetchData(0) }, []);

  const handleClickOpen = () => {
    navigate('/create');
  };

  return (
    <>
      <Toolbar class="Toolbar-table">
        <Button startIcon={<EditIcon />} onClick={handleClickOpenConfirm}>Editar</Button>
        <Button startIcon={<DeleteIcon />} onClick={handleClickOpenConfirm}>Eliminar</Button>
        <Button onClick={(e) => fetchData(state.page)} endIcon={<Autorenew />} />
      </Toolbar>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Fab color="primary" aria-label="add"
          onClick={handleClickOpen}
          style={{
            position: 'absolute',
            bottom: 24, right: 24
          }}>
          <AddIcon />
        </Fab>
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  style={{ color: 'white' }}
                  indeterminate={selected.length > 0 && selected.length < result.data.length}
                  checked={result.data.length > 0 && selected.length === result.data.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell style={{ minWidth: 80 }}>DNI</StyledTableCell>
              <StyledTableCell style={{ minWidth: 260 }}>Nombre Completo</StyledTableCell>
              <StyledTableCell style={{ minWidth: 260 }} align="right">Fat&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? result.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : result.data
            ).map((row, index) => {
              const isItemSelected = isSelected(row.code);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <StyledTableRow
                  hover
                  onClick={(event) => handleClick(event, row.code)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.code}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="right">
                    {row.code}
                  </TableCell>
                  <TableCell style={{ width: 260 }} >
                    {row.fullName}
                  </TableCell>
                  <TableCell style={{ width: 260 }} align="right">
                    {row.fat}
                  </TableCell>
                </StyledTableRow >
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Eliminar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancelar</Button>
          <Button onClick={() => {
            setOpenConfirm(false);
            setOpenSnack(true);

          }} autoFocus>
            Si
          </Button>
        </DialogActions>

      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => {
        setOpenSnack(false);
      }}>
        <Alert onClose={() => {
          setOpenSnack(false);
        }} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );

};

export default List;