import React, {forwardRef, useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { ArrowDownward, ChevronLeft, ChevronRight, Clear, Edit, FilterList, FirstPage, LastPage, Search, ViewColumn} from "@material-ui/icons";
import axios from "axios";

const baseURL = "http://localhost:5000/api/usuarios";

function Tabla() {  

  //const [data, setData] = useState([]);

  const peticionGet = async() =>{
    axios.get(baseURL)
      .then( res => {
        console.log(res.data);
      })
  }

  useEffect(async() => {
    await peticionGet();
  }, []);

  const iconosTabla = {
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columnas = [
    {
      title: 'Nombre',
      field: 'nombre'
    },
    {
      title: 'Apellido',
      field: 'apellido'
    }
  ];

  const tablaDatos=(
    <MaterialTable
          icons = {iconosTabla}
          columns = {columnas}
        //   data = {datos}
          title = 'Tabla de Amparos'
          localization = {{
            header:{
              actions: ""                  
            },
            body:{
              emptyDataSourceMessage: 'Sin registros para mostrar'
            },
            toolbar:{
              searchTooltip:'Busqueda',
              searchPlaceholder:'Busqueda',
            },
            pagination:{
              firstTooltip: 'Primera Página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Siguiente página',
              lastTooltip: 'Ultima página',
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'filas',
            },
            }}
            actions = {[
              {
                icon: () => 
                  <label className="block mx-2 bg-gray-900 hover:bg-gray-100 focus:shadow-outline focus:outline-none text-gray-100 hover:text-gray-900 text-xs p-2 rounded transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                    </svg>
                  </label>,
                tooltip: '',
                //onClick: (event, rowData) => seleccionarAmp(rowData, 'Modal')                   
              }
            ]}
            options = {{
              actionsColumnIndex: -1
            }}
        />
  );

    return (
        <div>
            <form>
                <div className="flex flex-row mt-4 w-full my-2">
                    <span className="w-2/6 my-auto font-semibold cursor-default">Nombre:</span>
                    <input className="flex shadow-sm rounded-md h-full px-2 py-2.5 w-4/6 border focus:outline-none" type="text" placeholder="María" id="txtName" name="txtNonmbre" onChange={""} value="" />
                </div>
                <div className="flex w-full my-2">
                    <span className="w-2/6 my-auto font-semibold cursor-default">Apellido:</span>
                    <input className="flex shadow-sm rounded-md h-full px-2 py-2.5 w-4/6 border focus:outline-none" type="text" placeholder="Rodriguéz" id="txtName" name="txtApellido" onChange={""} value="" />
                </div>
                <button className="flex mb-3 bg-gray-900 text-gray-100 hover:bg-green-500 text-sm font-bold uppercase px-12 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none transition duration-300" type="#">
                  &nbsp;&nbsp;Registrar
                </button>
            </form>
            {tablaDatos}
        </div>
    )
}

export default Tabla;