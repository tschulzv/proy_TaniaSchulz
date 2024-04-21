import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import debounce from 'lodash/debounce';
import Navbar from "../../components/Navbar.component";
import "../../components/StyleUtils.style.css"
import "./ResourceTable.style.css";

const ResourceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/resources");
        setData(response.data.resources);
        setLoading(false);
        console.log(" Exito, recursos:", response.data.resources);
      } catch (error) {
        console.error("No se obtuvieron los recursos", error);
      }
    };

    fetchData();
  }, []);

  // debounce evita que se crean demasiadas updates
  const handleInputChange = debounce((value) => {
    setFilterValue(value);
  }, 200); 

  const filteredData = data.filter(item =>
    item.subject.toLowerCase().includes(filterValue.toLowerCase())
    || item.topic.toLowerCase().includes(filterValue.toLowerCase())
    || item.type.toLowerCase().includes(filterValue.toLowerCase())
    || item.source.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Memo evita que se vuelva a renderiza excesivamente
  const columns = React.useMemo(
    () => [
      {
        Header: 'ASIGNATURA',
        accessor: 'subject',
      },
      {
        Header: 'TEMA',
        accessor: 'topic',
      },
      {
        Header: 'TIPO',
        accessor: 'type',
      },
      {
        Header: 'FUENTE',
        accessor: 'source',
        Cell: ({row}) => (
          <a href={row.original.source}>{row.original.source}</a>
        )
      },
      {
        Header: '',
        accessor: '_id',
        Cell: ({ row }) => (
          <Link to={`/resources/${row.original._id}/edit`}>Editar</Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  // funcion para navegar a pagina de crear
  const addResource = () => {
    navigate("/resources/create");
  }

  return (
    <div className="wrapper">
      <Navbar title1="INICIO" link1="/" title2="ESTADISTICAS" link2="/stats" title3="AJUSTES" link3="/settings" />
      <h2 className="title">Organizador</h2>
      <div>
        <input
          id="filterValue"
          value={filterValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Buscar..."
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <button className="btn" onClick={addResource}>AGREGAR</button>
    </div>

  );
};

export default ResourceTable;
