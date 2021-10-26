import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Button, TextField, Modal } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

const baseURL = "/api/usuarios/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
  
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  useEffect(async() => {
    await peticionGet();
  }, []);

  const styles= useStyles();

  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
    nombre: '',
    apellido: ''
  })
  
  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuarioSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  const peticionGet = async() =>{
    await axios.get(baseURL)
      .then( res => {
        setData(res.data);
      })
  }

  const peticionPost=async()=>{
    await axios.post(baseURL, usuarioSeleccionado)
    .then(res=>{
      setData(data.concat(res.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseURL+usuarioSeleccionado.id, usuarioSeleccionado)
    .then(res=>{
      var dataNueva=data;
      dataNueva.map(usuario=>{
        if(usuarioSeleccionado.id===usuario.id){
          usuario.nombre=usuarioSeleccionado.nombre;
          usuario.apellido=usuarioSeleccionado.apellido;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseURL+usuarioSeleccionado.id)
    .then(res=>{
      setData(data.filter(usuario=>usuario.id !== usuarioSeleccionado.id));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarUsuario=(usuario, caso)=>{
    setUsuarioSeleccionado(usuario);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br /><br />
      <TextField name="apellido" className={styles.inputMaterial} label="Apellido" onChange={handleChange} size="medium"/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
      <br /><br />
      <TextField name="apellido" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellido}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>¿Estás seguro que deseas eliminar el usuario <b>{usuarioSeleccionado && usuarioSeleccionado.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )


  return (
    <div style={{ padding: "15px", backgroundColor: "#bebebe", minHeight: "100vh" }} className="App">
      <div align="center">
        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "#3F51B5", padding: "5px", paddingLeft: "10px", paddingRight: "10px", border: "none", borderRadius: " 7px", cursor: "pointer" }} className="flex items-center justify-center flex-1 h-full p-2 font-semibold bg-gray-900 hover:bg-red-600 text-gray-100 shadow rounded-lg transition duration-300 focus:outline-none" onClick={()=>abrirCerrarModalInsertar()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          &nbsp;&nbsp;Registrar&nbsp;
        </button>
      </div>
      <div style={{ backgroundColor: "#fff", marginTop: "10px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#eeeeee"}}>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Apellido</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(usuario => (
                <TableRow key = {usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>
                    <Edit className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Editar')}/>
                    <Delete className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}/>
                    &nbsp;&nbsp;&nbsp;
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open= {modalInsertar}
        onClose = {abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default App;
