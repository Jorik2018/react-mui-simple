import React, { useState, useEffect } from 'react';
import { debounce } from '../utils/Utils';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert, Box, Button, Checkbox, Dialog, DialogActions, DialogContent,
  FormGroup, FormLabel, MenuItem, Radio, Snackbar, Stack,
  TextField
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { http } from 'gra-http';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useForm } from "react-hook-form";

export const Form = () => {

  const [o, setO] = useState({});
  const [e, setE] = useState({});
  const [state, setState] = useState({ page: 0 });
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(true);
  const [result, setResult] = useState({ size: 0, data: [] });

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClose = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const fetchData = async (page) => {
    const result = await http.get('/admin/directory/api/people/' + page + '/' + rowsPerPage);
    setResult(result);
    setState({ page: page });
  };

  useEffect(() => {
    const debouncedHandleResize = debounce((width, height) => {
      const header = document.querySelector('.MuiToolbar-root');
      const [body, toolBar] = formRef.current.children;
      const nav = document.querySelector('nav');
      body.style.height = (height - header.offsetHeight - toolBar.offsetHeight) + 'px';
      toolBar.style.width = (width - nav.offsetWidth) + 'px';
    });
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, []);

  const handleChange = (name: any, v: any) => {
    if (name.target) {
      v = name;
      name = name.target.name || name.target.id;
    }
    var vv = v && v.target ? (v.target.type === 'checkbox' ? v.target.checked : v.target.value) : v;
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

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

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
  const onfocusout = (e) => {
    const el = e.target;
    setE(e => ({
      ...e, [el.name]: !el.value
    }));
  };
  const defaultProps = function (name) {
    return {
      name: name,
      onBlur: onfocusout,
      error: e[name],
      required: true,
      value: o[name],
      onChange: handleChange
    }
  }
  function getContent() {
    return <ThemeProvider theme={theme}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <Box style={{ overflow: 'auto' }}>
          <Card >
            <CardContent>

              Para la detección de las personas con discapacidad y su instructivo.
              {/*process.env.REACT_APP_NOT_SECRET_CODE={process.env.REACT_APP_NOT_SECRET_CODE};
        process.env.NODE_ENV={process.env.NODE_ENV}*/}
            </CardContent>
          </Card>
          <Accordion expanded={true}>
            <AccordionSummary variant="h6" component="div">
              DATOS DE IDENTIFICACION
            </AccordionSummary>
            <AccordionDetails >

              <TextField
                label="DNI"
                {...defaultProps('dni')}
              />
              <TextField
                label="Apellidos y Nombres"
                {...defaultProps('fullName')}
              />
              <TextField
                label="Dirección"
                {...defaultProps('address')}
              />
              <TextField
                label="Distrito"
                {...defaultProps("district")}
              />
              <TextField
                select
                label="Acceso a la vivienda"
                {...defaultProps("houseAccess")}
              >
                {['Facil', 'Accidentado', 'Otro'].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...defaultProps("age")}
                label="Edad"
                type="number"
              />
              <TextField
                {...defaultProps("occupation")}
                label="Ocupación"
              />
              <TextField
                select
                {...defaultProps("instructionGrade")}
                label="Grado de Instrucción"
              >
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
              </TextField>
              <TextField
                select
                {...defaultProps("maritalStatus")}
                label="Estado Civil"
              >
                {
                  [
                    'Soltero/a',
                    'Casado/a',
                    'Divorciado/a',
                    'Conviviente',
                    'Viudo/a'
                  ].map(e => <MenuItem value={e}>{e}</MenuItem>)
                }
              </TextField>
              <TextField
                select
                {...defaultProps("typeInsurance")}
                label="Tipo de Seguro"
              >
                {
                  [
                    'SIS',
                    'ESSALUD',
                    'Otro',
                    'No tiene'
                  ].map(e => <MenuItem value={e}>{e}</MenuItem>)
                }
              </TextField>
              <TextField
                {...defaultProps("medicalReport")}
                label="Informe Medico"
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
                {...defaultProps("belongsAssociation")}
                label='Pertenece a alguna asociación'
              >
                {['SI', 'NO'].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              {
                o.belongsAssociation === 'SI' ? <TextField
                  {...defaultProps("association")}
                  label="Especifique cuál asociación"
                  multiline
                /> : null
              }
              <TextField
                {...defaultProps("mainPhone")}
                label="Teléfono fijo / Celular"
              />
              <TextField
                {...defaultProps("otherPhone")}
                label="Teléfono fijo / Celular"
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
                {...defaultProps("carer")}
                label="Nombre de la persona cuidadora"
              />
              <TextField
                {...defaultProps("carerPhone")}
                label="Teléfono de la persona cuidadora"
              />
              <TextField
                {...defaultProps("carerMail")}
                label="Correo Electrónico"
              />
            </AccordionDetails>

          </Accordion>
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
                  {...defaultProps("a1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="a2">¿Escucha?</FormLabel>
                <RadioGroup
                  aria-labelledby="a2"
                  {...defaultProps("a2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="a3">¿Mira?.</FormLabel>
                <RadioGroup
                  aria-labelledby="a3"
                  {...defaultProps("a3")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="a4">¿Habla?</FormLabel>
                <RadioGroup
                  aria-labelledby="a4"
                  {...defaultProps("a4")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="a5">¿Comienza y mantiene una conversación?.</FormLabel>
                <RadioGroup
                  aria-labelledby="a5"
                  {...defaultProps("a5")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="a6">¿Analiza y encuentra soluciones a los problemas de la vida cotidiana? por ejemplo ¿qué hace, tiene frío o hambre?.</FormLabel>
                <RadioGroup
                  aria-labelledby="a6"
                  {...defaultProps("a6")}
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
                  {...defaultProps("b1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="b2">¿Puede mover brazos y manos?.</FormLabel>
                <RadioGroup
                  aria-labelledby="b2"
                  {...defaultProps("b2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="b3">¿Tiene ausencia de alguna extremidad del cuerpo?.</FormLabel>
                <RadioGroup
                  aria-labelledby="b3"
                  {...defaultProps("b3")}
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
                    {...defaultProps("b4_5_e")}
                    label="Otro"
                  /> : null
                }
              </FormControl>
              <FormControl>
                <FormLabel id="b5">¿Depende de una persona para movilizarse?</FormLabel>
                <RadioGroup
                  aria-labelledby="b5"
                  {...defaultProps("b5")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="b6">¿Usa algún despositivo para movilizarse?</FormLabel>
                <RadioGroup
                  aria-labelledby="b6"
                  {...defaultProps("b6")}
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
                  o.b7_4 === true ? <TextField
                    {...defaultProps("b7_4_o")}
                    label="Otro"

                  /> : null
                }
              </FormControl>
              <FormControl>
                <FormLabel id="b8">¿Puede estar de pie por largos períodos de tiempo, como por ejemplo 30 minutos?.</FormLabel>
                <RadioGroup
                  aria-labelledby="b8"
                  {...defaultProps("b8")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="b9">¿Puede desplazarse fuera de su hogar?.</FormLabel>
                <RadioGroup
                  aria-labelledby="b9"
                  {...defaultProps("b9")}
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
                  {...defaultProps("c1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="c2">Puede vestirse solo?.</FormLabel>
                <RadioGroup
                  aria-labelledby="c2"
                  {...defaultProps("c2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="c3">¿Puede lavarse todo el cuerpo, bañarse?.</FormLabel>
                <RadioGroup
                  aria-labelledby="c3"
                  {...defaultProps("c3")}
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
                  {...defaultProps("d1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="d2">¿Se relaciona con personas que no conoce?.</FormLabel>
                <RadioGroup
                  aria-labelledby="d2"
                  {...defaultProps("d2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="d3">¿Realiza actividad sexual?</FormLabel>
                <RadioGroup
                  aria-labelledby="d3"
                  {...defaultProps("d3")}
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
                  {...defaultProps("e1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="e2">¿Presenta dificultades para trabajar?.</FormLabel>
                <RadioGroup
                  aria-labelledby="e2"
                  {...defaultProps("e2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">¿Presenta dificultades para estudiar?</FormLabel>
                <RadioGroup
                  aria-labelledby="e3"
                  {...defaultProps("e3")}
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
                  {...defaultProps("f1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="f2">¿Se le presentan barreras u obstáculos para participar? por ejemplo, inadecuada infraestructura para desplazarse o actividades de rechazo.</FormLabel>
                <RadioGroup
                  aria-labelledby="f2"
                  {...defaultProps("f2")}
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
                  {...defaultProps("g1")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="g2">¿El personal de salud anotó alguna observación sobre el desarrollo de su niño/a?.</FormLabel>
                <RadioGroup
                  aria-labelledby="g2"
                  {...defaultProps("g2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              {
                o.g2 === 'SI' ? <TextField
                  {...defaultProps("g3")}
                  label="¿Qué observación le hizo?"
                  multiline
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
                  {...defaultProps("h1")}
                >
                  <FormControlLabel value="Público" control={<Radio />} label="Público" />
                  <FormControlLabel value="Privado" control={<Radio />} label="Privado" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="h2">Ante algún evento desagradable (por ejemplo, terremoto, incendio, accdidente en el hogar) ¿Sabe usted como actuar?.</FormLabel>
                <RadioGroup
                  aria-labelledby="h2"
                  {...defaultProps("h2")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              {
                o.h2 === 'SI' ? <TextField
                  {...defaultProps("h2_1")}
                  label="¿Cómo?"
                  maxlength={450}
                  multiline
                /> : null
              }
              <FormControl>
                <FormLabel id="h3">¿Conoce un plan de emergencia?</FormLabel>
                <RadioGroup
                  aria-labelledby="h3"
                  {...defaultProps("h3")}
                >
                  <FormControlLabel value="SI" control={<Radio />} label="SI" />
                  <FormControlLabel value="NO" control={<Radio />} label="NO" />
                </RadioGroup>
              </FormControl>
              {
                o.h3 === 'SI' ? <TextField
                  label="¿Cuál?"
                  name="h3_1"
                  multiline
                  value={o.h3_1}
                  onChange={handleChange}
                /> : null
              }
            </AccordionDetails>
          </Accordion>
        </Box>
        <Stack direction="row" justifyContent="center"
          style={{ padding: '10px', backgroundColor: '#1976d2' }}
          alignItems="center" spacing={1}>
          <Button variant="contained" startIcon={<EditIcon />}>Editar</Button>
          <Button variant="contained" startIcon={<DeleteIcon />}>Eliminar</Button>
        </Stack>
      </form>
    </ThemeProvider>
  }
  return (
    1 == 1 ? <Box style={{ textAlign: 'left' }}>{getContent()}</Box>
      : <Box
        sx={{ display: 'flex' }}>
        <Dialog open={open}
          autoComplete="off"
          ref={formRef} id="dialog"
          keepMounted
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">CUESTIONARIO</DialogTitle>
          <DialogContent>
            {getContent()}
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

}