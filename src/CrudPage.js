import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Alert, FormLabel } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import {Autorenew} from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import NativeSelect from '@mui/material/NativeSelect';
import { http } from 'gra-http';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

const CrudPage = () => {
  const [page, setPage] = useState(0);
  const [o, setO] = useState({});
  const [state, setState] = useState({ page: 0 });
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ size: 0, data: [] });
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const handleChange = (name: any, v: any) => {
    if (name.target) {
      v = name;
      name = name.target.name || name.target.id;
    }
    var vv = v && v.target ? v.target.value : v;
    setO(o => ({
      ...o, [name]: vv
    }));
  };

  const isSelected = (code) => selected.indexOf(code) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = result.data.map((n) => n.code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSave = () => {
    http.post('/admin/directory/api/people2', o).then((result) => {
      console.log(result);
    });
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
    http.get('/admin/directory/api/people/0/20').then(function (e) {
      setResult(e);
    });
  };


  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'dni', headerName: 'DNI', width: 130 },
    { field: 'Name', headerName: 'Nombre', width: 130 },
    {
      field: 'edad',
      headerName: 'Edad',
      type: 'number',
      width: 90,
    },
    { field: 'grado_inst', headerName: 'Grado Instrucción', width: 130 },
    { field: 'est_civil', headerName: 'E. Civil', width: 130 },
    { field: 'tipo_seg', headerName: 'Tipo Seguro', width: 130 },
    { field: 'Certificado_discp', headerName: 'Certificado Discapacidad', width: 130 },
    {
      field: 'Telef',
      headerName: 'Telefono',
      sortable: false,
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.dni || ''} ${params.row.Name || ''}`,
    },
    // {
    // field: 'fullName',
    // headerName: 'Full name',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    // width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //},
  ];


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

const onClickRefresh=()=>{
  fetchData(state.page);
}

  const fetchData = async (page) => {
    const result = await http.get('/admin/directory/api/people/' + page + '/' + rowsPerPage);
    setResult(result);
    setState({ page: page });
  };
  useEffect(() => { fetchData(0) }, []);
  return (
    <>
      <Button onClick={handleClickOpen}>Click me!</Button>
      <Button onClick={(e) => fetchData(state.page)} endIcon={<Autorenew/>} />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
);})}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={result.size}
          rowsPerPage={rowsPerPage}
          page={state.page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CUESTIONARIO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para la detección de las personas con discapacidad y su instructivo.
          </DialogContentText>
          <br />

          <Card sx={{ minWidth: 275 }}>
            <CardContent>

              <Typography variant="h6" component="div">
                Datos:
              </Typography>
              <Divider />
              {o.dni}
              <TextField
                autoFocus
                margin="dense"
                id="dni"
                label="DNI"
                type="text"
                value={o.dni}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                label="Apellidos y Nombres"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Dirección"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Distrito"
                type="text"
                fullWidth
              />
              <br /><br />
              <FormControl fullWidth>
                <FormLabel variant="standard" htmlFor="uncontrolled-native">
                  Acceso a la vivienda
                </FormLabel >
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>Seleccionar</option>
                  <option value={1}>Facil</option>
                  <option value={2}>Accidentado</option>
                  <option value={3}>Otro</option>
                </NativeSelect>
                <br />
                <TextField
                  id="standard-helperText"
                  label="Especifique"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
              </FormControl>
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Edad"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Ocupación"
                type="text"
                fullWidth
              />
              <br /><br />
              <FormControl fullWidth>
                <FormLabel variant="standard" htmlFor="uncontrolled-native">
                  Grado de Instrucción
                </FormLabel >
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>Seleccionar</option>
                  <option value={1}>Inicial</option>
                  <option value={2}>Primaria</option>
                  <option value={3}>Secundaria</option>
                  <option value={4}>Técnico</option>
                  <option value={5}>Superior</option>
                  <option value={6}>PRITE</option>
                  <option value={7}>CEBE</option>
                  <option value={8}>CEBA</option>
                  <option value={9}>Educación Inclusiva</option>
                  <option value={10}>Analfabeto</option>
                  <option value={11}>Otro</option>
                </NativeSelect>
                <br />
                <TextField
                  id="standard-helperText"
                  label="Especifique"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <FormLabel variant="standard" htmlFor="uncontrolled-native">
                  Estado Civil
                </FormLabel >
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>Seleccionar</option>
                  <option value={1}>Soltero/a</option>
                  <option value={2}>Casado/a</option>
                  <option value={3}>Divorciado/a</option>
                  <option value={3}>Conviviente</option>
                  <option value={3}>Viudo/a</option>
                </NativeSelect>
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <FormLabel variant="standard" htmlFor="uncontrolled-native">
                  Tipo de Seguro
                </FormLabel >
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>Seleccionar</option>
                  <option value={1}>SIS</option>
                  <option value={2}>ESSALUD</option>
                  <option value={3}>Otro</option>
                </NativeSelect>
                <br />
                <TextField
                  id="standard-helperText"
                  label="Especifique"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
              </FormControl>
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Informe Medico"
                type="text"
                fullWidth
              />
              <br /><br />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Certificado de discapacidad</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  //defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <FormLabel variant="standard" htmlFor="uncontrolled-native">
                  Pertenece a alguna asociación
                </FormLabel >
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>Seleccionar</option>
                  <option value={1}>Si</option>
                  <option value={2}>No</option>
                </NativeSelect>
                <br />
                <TextField
                  id="standard-helperText"
                  label="Especifique cuál"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
              </FormControl>
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Teléfono fijo / Celular"
                type="text"
                fullWidth
              />
              <br /><br />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">¿Requiere cuidador?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  //defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre de la persona cuidadora"
                type="text"
                fullWidth
              />
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Teléfono de la persona cuidadora"
                type="text"
                fullWidth
              />
              <br /><br />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Correo Electrónico"
                type="text"
                fullWidth
              />
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>

              <Typography variant="h6" component="div">
                CONDUCTA, COMPRENSIÓN Y COMUNICACIÓN
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Comprende órdenes simples? por ejemplo: dame la pelota, toma el cuaderno, abre la puerta.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Escucha?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Mira?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Habla?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Comienza y mantiene una conversación?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Analiza y encuentra soluciones a los problemas de la vida cotidiana? por ejemplo ¿qué hace, tiene frío o hambre?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </CardContent>
          </Card>
          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>

              <Typography variant="h6" component="div">
                MOVILIDAD
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede caminar?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede mover brazos y manos?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Tiene ausencia de alguna extremidad del cuerpo?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormGroup>
                    <FormLabel>¿Cuál es la extremidad que le falta?</FormLabel>
                    <FormControlLabel control={<Checkbox />} label="Brazo" />
                    <FormControlLabel control={<Checkbox />} label="Mano" />
                    <FormControlLabel control={<Checkbox />} label="Pierna" />
                    <FormControlLabel control={<Checkbox />} label="Pie" />
                    <FormControlLabel control={<Checkbox />} label="Otro" />
                  </FormGroup>
                  <TextField
                    id="standard-helperText"
                    label="Especifique"
                    //defaultValue="Describa por favor..."
                    //helperText="Some important text"
                    variant="standard"
                  />
                </FormControl>
                <br /><br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Depende de una persona para movilizarse?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Usa algún despositivo para movilizarse?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormGroup>
                    <FormLabel>¿Qué dispositivo usa para movilizarse?</FormLabel>
                    <FormControlLabel control={<Checkbox />} label="Bastón" />
                    <FormControlLabel control={<Checkbox />} label="Andador" />
                    <FormControlLabel control={<Checkbox />} label="Silla de ruedas" />
                    <FormControlLabel control={<Checkbox />} label="Otro" />
                  </FormGroup>
                  <TextField
                    id="standard-helperText"
                    label="Especifique"
                    //defaultValue="Describa por favor..."
                    //helperText="Some important text"
                    variant="standard"
                  />
                </FormControl>
                <br /><br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede estar de pie por largos períodos de tiempo, como por ejemplo 30 minutos?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede desplazarse fuera de su hogar?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </CardContent>
          </Card>
          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                CUIDADO PERSONAL
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede comer sus alimentos solo?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Puede vestirse solo?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Puede lavarse todo el cuerpo, bañarse?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                RELACIONARSE CON OTRAS PERSONAS
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Se relaciona con personas que conoce?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Se relaciona con personas que no conoce?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Realiza actividad sexual?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                ACTIVIDADES FRECUENTES
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Se ocupa de las actividades domésticas? Por ejemplo cocinar, limpiar la casa, lavar la ropa.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Presenta dificultades para trabajar?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Presenta dificultades para estudiar?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
              </Typography>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                PARTICIPACIÓN EN LA SOCIEDAD
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Participa en actividades de su comunidad? Por ejemplo: festividades, actividades religiosas.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Se le presentan barreras u obstáculos para participar? por ejemplo, inadecuada infraestructura para desplazarse o actividades de rechazo.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>

              </Typography>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                INFORMACIÓN SOBRE NMENORES DE 5 AÑOS
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Cuenta con el Carné de Crecimiento y Desarrollo? (Se le pide a la persona cuidadora que enseñe el carné)</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿El personal de salud anotó alguna observación sobre el desarrollo de su niño/a?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <TextField

                  id="standard-helperText"
                  label="¿Qué observación le hizo?"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />

              </Typography>
            </CardContent>
          </Card>

          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                INFORMACIÓN SOBRE UNA EVENTUALIDAD O EMERGENCIA
              </Typography>
              <Divider />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Qué tipo de transporte usa?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Público" control={<Radio />} label="Público" />
                    <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Ante algún evento desagradable (por ejemplo, terremoto, incendio, accdidente en el hogar) ¿Sabe usted como actuar?.</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <TextField

                  id="standard-helperText"
                  label="¿Cómo?"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
                <br /><br />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">¿Conoce un plan de emergencia?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                    <FormControlLabel value="NO" control={<Radio />} label="NO" />
                  </RadioGroup>
                </FormControl>
                <br />
                <TextField

                  id="standard-helperText"
                  label="¿Cómo?"
                  //defaultValue="Describa por favor..."
                  //helperText="Some important text"
                  variant="standard"
                />
              </Typography>
            </CardContent>
          </Card>

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


    </>
  );
};

export default CrudPage;