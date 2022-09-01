import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Alert, FormLabel } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import { Autorenew } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import NativeSelect from '@mui/material/NativeSelect';
import { http } from 'gra-http';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useForm } from "react-hook-form";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

function TablePaginationActions(props: TablePaginationActionsProps) {

  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );

}

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const CrudPage = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const [page, setPage] = useState(0);
  const [o, setO] = useState({
    houseAccess: ' ',
    instructionGrade: ' ',
    maritalStatus: ' ',
    typeInsurance: ' ',
    belongsAssociation: ' '
  });
  const [e, setE] = useState({});
  const [state, setState] = useState({ page: 0 });
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ size: 0, data: [] });
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);

    /*http.get('/admin/directory/api/people/0/20').then(function (e) {
      setResult(e);
    });*/
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'dni', headerName: 'DNI', width: 130 },
    { field: 'Name', headerName: 'Nombre', width: 130 },
    { field: 'edad', headerName: 'Edad', type: 'number', width: 90 },
    { field: 'grado_inst', headerName: 'Grado Instrucción', width: 130 },
    { field: 'est_civil', headerName: 'E. Civil', width: 130 },
    { field: 'tipo_seg', headerName: 'Tipo Seguro', width: 130 },
    { field: 'Certificado_discp', headerName: 'Certificado Discapacidad', width: 130 },
    {
      field: 'Telef', headerName: 'Telefono', sortable: false, width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.dni || ''} ${params.row.Name || ''}`,
    }
  ];

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    fetchData(newPage);
  };

  const ff = (p) => {
    try {
      fetchData(p);
      setPage(p);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    const debouncedHandleResize = debounce(function handleResize() {
      const header = document.querySelector('.MuiToolbar-root');
      const tableContainer = document.querySelector('.MuiTableContainer-root');
      const toolbarTable = document.querySelector('.Toolbar-table');
      if (tableContainer) {
        tableContainer.style.height = (window.innerHeight - header.offsetHeight
          - toolbarTable.offsetHeight) + 'px';
      }
    }, 1000);
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });

  useEffect(() => { fetchData(0) }, []);

  /*
  React.useEffect( () => {
    const inputElement = inputRef.current;
    const handleEvent = ( event ) => {
        if ( event.key === 'Enter' ) {
            event.preventDefault();
            setSubmittedValue( inputRef.current.value );
        }
    };
    inputElement.addEventListener( 'keydown', handleEvent );
    return () => inputElement.removeEventListener( 'keydown', handleEvent );
  }, [] );
  */

  const handleChange = (name: any, v: any) => {
    if (name.target) {
      v = name;
      name = name.target.name || name.target.id;
    }
    var vv = v && v.target ? (v.target.type == 'checkbox' ? v.target.checked : v.target.value) : v;
    setO(o => ({
      ...o, [name]: vv
    }));
  };

  const formRef = React.createRef();

  const handleSave = () => {
    const form = formRef.current;
    if (form != null) {
      let ok = true;
      let list = form.querySelectorAll("input");
      for (let item of list) {
        if (!item.value) {
          setE(e => ({
            ...e, [item.name]: !item.value
          }));
          ok = false;
        }
      }
      //if (ok)
      http.post('/api/minsa/disabled-quiz', o).then((result) => {
        console.log(result);
      });
    }

  };

  React.useEffect(() => {
    const form = formRef.current;
    const onfocusout = (e) => {
      const el = e.target;
      setE(e => ({
        ...e, [el.name]: !el.value
      }));
    };
    if (form != null) {
      //onfocusout
      var list = form.querySelectorAll("input");
      for (let item of list) {
        item.addEventListener('focusout', onfocusout);
        //item.addEventListener('input', handleChange);
      }
      return () => {
        for (let item of list) {
          item.removeEventListener('focusout', onfocusout);
          //item.removeEventListener('input', handleChange);
        }
      }
    }
  }, [o, open]);

  const container = null;// window !== undefined ? () => window().document.body : undefined;
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const drawerWidth = 240;
  const theme = createTheme({
    components: {
      // Name of the component ⚛️
      MuiInput: {
        defaultProps: {
          required: true
        }
      },
    },
  });
  return (
    <Box

      sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Toolbar class="Toolbar-table">
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">home</Button>
          <Button startIcon={<EditIcon />} onClick={handleClickOpenConfirm}>Editar</Button>
          <Button startIcon={<DeleteIcon />} onClick={handleClickOpenConfirm}>Eliminar</Button>
          <Button onClick={(e) => fetchData(state.page)} endIcon={<Autorenew />} />
        </Toolbar>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Fab color="primary" aria-label="add"
            onClick={handleClickOpen}
            style={{
              position: 'absolute',
              bottom: 32, right: 32
            }}>
            <AddIcon />
          </Fab>
          <Table stickyHeader aria-label="sticky table">

            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < result.data.length}
                    checked={result.data.length > 0 && selected.length === result.data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <StyledTableCell style={{ minWidth: 260 }}>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell style={{ minWidth: 260 }} align="right">Calories</StyledTableCell>
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
                    <TableCell style={{ width: 260 }} >
                      {row.fullName}
                    </TableCell>
                    <TableCell style={{ width: 260 }} align="right">
                      {row.code}
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
      </Box>

      <Dialog open={open}

        autoComplete="off"
        ref={formRef} id="dialog"
        keepMounted
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CUESTIONARIO</DialogTitle>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContentText>
                Para la detección de las personas con discapacidad y su instructivo.
              </DialogContentText>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Datos de identificación:
                  </Typography>
                  <Divider />
                  <TextField
                    name="dni"
                    error={e.dni}
                    required
                    label="DNI"
                    value={o.dni}
                    onChange={handleChange}
                  />
                  <TextField
                    name="fullName"
                    label="Apellidos y Nombres"
                    value={o.fullName}
                    onChange={handleChange}
                  />
                  <TextField
                    name="address"
                    label="Dirección"
                    value={o.address}
                    onChange={handleChange}
                  />
                  <TextField
                    name="district"
                    label="Distrito"

                    value={o.district}
                    onChange={handleChange}
                  />
                  <TextField
                    select
                    name="houseAccess"
                    label="Acceso a la vivienda"
                    value={o.houseAccess}
                    onChange={handleChange}
                  >
                    <MenuItem value={' '}>-- Seleccionar --</MenuItem>
                    {['Facil', 'Accidentado', 'Otro'].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="age"
                    label="Edad"
                    value={o.age}
                    onChange={handleChange}
                    type="number"
                  />
                  <TextField
                    name="occupation"
                    label="Ocupación"
                    value={o.occupation}
                    onChange={handleChange}
                  />
                  <FormControl>
                    <InputLabel id="instruction-grade">Grado de Instrucción</InputLabel>
                    <Select
                      labelId="instruction-grade"
                      name="instructionGrade"
                      value={o.instructionGrade}
                      label="Grado de Instrucción"
                      onChange={handleChange}
                    >
                      <MenuItem value={' '}>-- Seleccionar --</MenuItem>
                      {
                        [
                          'Inicial',
                          'Primaria',
                          'Secundaria',
                          'Técnico',
                          'Superior',
                          'PRITE',
                          'CEBE',
                          'CEBA',
                          'Educación Inclusiva',
                          'Analfabeto',
                          'Otro'
                        ].map(e => <MenuItem value={e}>{e}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="marital-status">Estado Civil</InputLabel>
                    <Select
                      labelId="marital-status"
                      name="maritalStatus"
                      value={o.maritalStatus}
                      label="Estado Civil"
                      onChange={handleChange}
                    >
                      <MenuItem value={' '}>-- Seleccionar --</MenuItem>
                      {
                        [
                          'Soltero/a',
                          'Casado/a',
                          'Divorciado/a',
                          'Conviviente',
                          'Viudo/a'
                        ].map(e => <MenuItem value={e}>{e}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="type-insurance">Tipo de Seguro</InputLabel>
                    <Select
                      labelId="type-insurance"
                      name="typeInsurance"
                      value={o.typeInsurance}
                      label="Tipo de Seguro"
                      onChange={handleChange}
                    >
                      <MenuItem value={' '}>-- Seleccionar --</MenuItem>
                      {
                        [
                          'SIS',
                          'ESSALUD',
                          'Otro',
                          'No tiene'
                        ].map(e => <MenuItem value={e}>{e}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                  <TextField
                    name="medicalReport"
                    value={o.medicalReport}
                    label="Informe Medico"
                    onChange={handleChange}
                    multiline
                  />
                  <FormControl>
                    <FormLabel id="disability-certificate">Certificado de discapacidad</FormLabel>
                    <RadioGroup
                      aria-labelledby="disability-certificate"
                      value={o.disabilityCertificate}
                      onChange={handleChange}
                      name="disabilityCertificate"
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    select
                    name="belongsAssociation"
                    label='Pertenece a alguna asociación'
                    value={o.belongsAssociation}
                    onChange={handleChange}
                  >
                    <MenuItem value={' '}>-- Seleccionar --</MenuItem>
                    {['SI', 'NO'].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                  {
                    o.belongsAssociation === 'SI' ? <TextField
                      name="association"
                      label="Especifique cuál asociación"
                      value={o.association}
                      onChange={handleChange}
                      multiline
                    /> : null
                  }
                  <TextField
                    name="mainPhone"
                    label="Teléfono fijo / Celular"
                    value={o.mainPhone}
                    onChange={handleChange}
                  />
                  <TextField
                    name="otherPhone"
                    label="Teléfono fijo / Celular"
                    value={o.otherPhone}
                    onChange={handleChange}
                  />
                  <FormControl>
                    <FormLabel id="carer-required">¿Requiere cuidador?</FormLabel>
                    <RadioGroup
                      aria-labelledby="carer-required"
                      name="carerRequired"
                      value={o.carerRequired}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    name="carer"
                    label="Nombre de la persona cuidadora"
                    value={o.carer}
                    onChange={handleChange}
                  />
                  <TextField
                    name="carerPhone"
                    label="Teléfono de la persona cuidadora"
                    value={o.carerPhone}
                    onChange={handleChange}
                  />
                  <TextField
                    name="carerMail"
                    label="Correo Electrónico"
                    value={o.carerMail}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  CONDUCTA, COMPRENSIÓN Y COMUNICACIÓN
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="a1">¿Comprende órdenes simples? por ejemplo: dame la pelota, toma el cuaderno, abre la puerta.</FormLabel>
                    <RadioGroup
                      aria-labelledby="a1"
                      name="a1"
                      value={o.a1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="a2">¿Escucha?</FormLabel>
                    <RadioGroup
                      aria-labelledby="a2"
                      name="a2"
                      value={o.a2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="a3">¿Mira?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="a3"
                      name="a3"
                      value={o.a3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="a4">¿Habla?</FormLabel>
                    <RadioGroup
                      aria-labelledby="a4"
                      name="a4"
                      value={o.a4}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="a5">¿Comienza y mantiene una conversación?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="a5"
                      name="a5"
                      value={o.a5}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="a6">¿Analiza y encuentra soluciones a los problemas de la vida cotidiana? por ejemplo ¿qué hace, tiene frío o hambre?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="a6"
                      name="a6"
                      value={o.a6}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  MOVILIDAD
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="b1">¿Puede caminar?</FormLabel>
                    <RadioGroup
                      aria-labelledby="b1"
                      name="b1"
                      value={o.b1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="b2">¿Puede mover brazos y manos?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="b2"
                      name="b2"
                      value={o.b2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="b3">¿Tiene ausencia de alguna extremidad del cuerpo?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="b3"
                      name="b3"
                      value={o.b3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormGroup>
                      <FormLabel>¿Cuál es la extremidad que le falta?</FormLabel>
                      <FormControlLabel control={<Checkbox name="b4_1" checked={o.b4_1} onChange={handleChange} />} label="Brazo" />
                      <FormControlLabel control={<Checkbox name="b4_2" checked={o.b4_2} onChange={handleChange} />} label="Mano" />
                      <FormControlLabel control={<Checkbox name="b4_3" checked={o.b4_3} onChange={handleChange} />} label="Pierna" />
                      <FormControlLabel control={<Checkbox name="b4_4" checked={o.b4_4} onChange={handleChange} />} label="Pie" />
                      <FormControlLabel control={<Checkbox name="b4_5" checked={o.b4_5} onChange={handleChange} />} label="Otro" />
                    </FormGroup>
                    {
                      o.b4_5 == true ? <TextField
                        label="Otro"
                        name="b4_5_e"
                        value={o.b4_5_e}
                        onChange={handleChange}
                      /> : null
                    }
                  </FormControl>
                  <FormControl>
                    <FormLabel id="b5">¿Depende de una persona para movilizarse?</FormLabel>
                    <RadioGroup
                      aria-labelledby="b5"
                      name="b5"
                      value={o.b5}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="b6">¿Usa algún despositivo para movilizarse?</FormLabel>
                    <RadioGroup
                      aria-labelledby="b6"
                      name="b6"
                      value={o.b6}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormGroup>
                      <FormLabel>¿Qué dispositivo usa para movilizarse?{o.b7_4}</FormLabel>
                      <FormControlLabel control={<Checkbox name="b7_1" checked={o.b7_1} onChange={handleChange} />} label="Bastón" />
                      <FormControlLabel control={<Checkbox name="b7_2" checked={o.b7_2} onChange={handleChange} />} label="Andador" />
                      <FormControlLabel control={<Checkbox name="b7_3" checked={o.b7_3} onChange={handleChange} />} label="Silla de ruedas" />
                      <FormControlLabel control={<Checkbox name="b7_4" checked={o.b7_4} onChange={handleChange} />} label="Otro" />
                    </FormGroup>
                    {
                      o.b7_4 == true ? <TextField
                        label="Otro"
                        name="b7_4_o"
                        value={o.b7_4_o}
                        onChange={handleChange}
                      /> : null
                    }
                  </FormControl>
                  <FormControl>
                    <FormLabel id="b8">¿Puede estar de pie por largos períodos de tiempo, como por ejemplo 30 minutos?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="b8"
                      name="b8"
                      value={o.b8}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <FormControl>
                    <FormLabel id="b9">¿Puede desplazarse fuera de su hogar?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="b9"
                      name="b9"
                      value={o.b9}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  CUIDADO PERSONAL
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="c1">¿Puede comer sus alimentos solo?</FormLabel>
                    <RadioGroup
                      aria-labelledby="c1"
                      name="c1"
                      value={o.c1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="c2">Puede vestirse solo?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="c2"
                      name="c2"
                      value={o.c2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="c3">¿Puede lavarse todo el cuerpo, bañarse?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="c3"
                      name="c3"
                      value={o.c3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  RELACIONARSE CON OTRAS PERSONAS
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="d1">¿Se relaciona con personas que conoce?</FormLabel>
                    <RadioGroup
                      aria-labelledby="d1"
                      name="d1"
                      value={o.d1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="d2">¿Se relaciona con personas que no conoce?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="d2"
                      name="d2"
                      value={o.d2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="d3">¿Realiza actividad sexual?</FormLabel>
                    <RadioGroup
                      aria-labelledby="d3"
                      name="d3"
                      value={o.d3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >ACTIVIDADES FRECUENTES
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="e1">¿Se ocupa de las actividades domésticas? Por ejemplo cocinar, limpiar la casa, lavar la ropa.</FormLabel>
                    <RadioGroup
                      aria-labelledby="e1"
                      name="e1"
                      value={o.e1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="e2">¿Presenta dificultades para trabajar?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="e2"
                      name="e2"
                      value={o.e2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">¿Presenta dificultades para estudiar?</FormLabel>
                    <RadioGroup
                      aria-labelledby="e3"
                      name="e3"
                      value={o.e3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >PARTICIPACIÓN EN LA SOCIEDAD
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="f1">¿Participa en actividades de su comunidad? Por ejemplo: festividades, actividades religiosas.</FormLabel>
                    <RadioGroup
                      aria-labelledby="f1"
                      name="f1"
                      value={o.f1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="f2">¿Se le presentan barreras u obstáculos para participar? por ejemplo, inadecuada infraestructura para desplazarse o actividades de rechazo.</FormLabel>
                    <RadioGroup
                      aria-labelledby="f2"
                      name="f2"
                      value={o.f2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  INFORMACIÓN SOBRE NMENORES DE 5 AÑOS
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="g1">¿Cuenta con el Carné de Crecimiento y Desarrollo? (Se le pide a la persona cuidadora que enseñe el carné)</FormLabel>
                    <RadioGroup
                      aria-labelledby="g1"
                      name="g1"
                      value={o.g1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="g2">¿El personal de salud anotó alguna observación sobre el desarrollo de su niño/a?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="g2"
                      name="g2"
                      value={o.g2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  {
                    o.g2 == 'SI' ? <TextField
                      label="¿Qué observación le hizo?"
                      multiline
                      value={o.g3}
                      onChange={handleChange}
                    /> : null
                  }
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  INFORMACIÓN SOBRE UNA EVENTUALIDAD O EMERGENCIA
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <FormLabel id="h1">¿Qué tipo de transporte usa?</FormLabel>
                    <RadioGroup
                      aria-labelledby="h1"
                      name="h1"
                      value={o.h1}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="Público" control={<Radio />} label="Público" />
                      <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="h2">Ante algún evento desagradable (por ejemplo, terremoto, incendio, accdidente en el hogar) ¿Sabe usted como actuar?.</FormLabel>
                    <RadioGroup
                      aria-labelledby="h2"
                      name="h2"
                      value={o.h2}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  {
                    o.h2 == 'SI' ? <TextField
                      label="¿Cómo?"
                      name="h2_1"
                      multiline
                      value={o.h2_1}
                      onChange={handleChange}
                    /> : null
                  }
                  <FormControl>
                    <FormLabel id="h3">¿Conoce un plan de emergencia?</FormLabel>
                    <RadioGroup
                      aria-labelledby="h3"
                      name="h3"
                      value={o.h3}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="SI" control={<Radio />} label="SI" />
                      <FormControlLabel value="NO" control={<Radio />} label="NO" />
                    </RadioGroup>
                  </FormControl>
                  {
                    o.h3 == 'SI' ? <TextField
                      label="¿Cuál?"
                      name="h3_1"
                      multiline
                      value={o.h3_1}
                      onChange={handleChange}
                    /> : null
                  }
                </AccordionDetails>
              </Accordion>
            </form>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" endIcon={<SendIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
    </Box>
  );

};

export default CrudPage;