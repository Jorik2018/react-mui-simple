import React from 'react';
import Button from '@mui/material/Button';
import { Alert, FormLabel } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import NativeSelect from '@mui/material/NativeSelect';
//import InputLabel  from '@mui/material/InputLabel ';
//import Step from '@mui/material/Step';
//import StepLabel from '@mui/material/StepLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
///////////////////////////////////////////
import Divider from '@mui/material/Divider';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
////////////////////////////////////////////////////
//const bull = (
//  <Box
//    component="span"
//    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//  >
//    •
//  </Box>
//);
///////////////////////////////////////////////////
const HelloWorld = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //function sayHello() {
  //  alert('Hello, World!');
  //}
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
    { field: 'Telef',
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

  const rows = [
    { id: 1, dni: '44444444', Name: 'Jon einsten Rodriguez Chavez', edad: 35, grado_inst: 'Inicial', est_civil: 'casado', tipo_seg: 'SIS', Certificado_discp: 'SI', Telef: '544554' },
  ];

  return (
    <div>
      <Button onClick={handleClickOpen}>Click me!</Button>
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

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

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="DNI"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
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
          <Button onClick={handleClose} color="primary" endIcon={<SendIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default HelloWorld;