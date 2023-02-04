import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import AddVehicleDialog from './addVehicleDialog';


export function Vehicles({ cars, onRemove, onAdd, onEdit }) {
  const [rows, setRows] = useState([]);
  const [editOpen, setEditOpen] = useState([]);

  useEffect(() => {
    fetchedRows()
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 150,
      editable: true,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 150,
      editable: true,
    },
    {
      field: 'year',
      headerName: 'Year',
      type: 'string',
      width: 110,
      editable: true,
    },
    {
      field: 'seats',
      headerName: 'Seats',
      type: 'number',
      width: 160,

      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      type: 'number',
      editable: true,
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
      width: 150,
      type: 'number',
      editable: true,
    },
    {
      field: 'pic',
      headerName: 'Picture',
      width: 150,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      renderCell: (params) => <img src={(params.value)} />,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
        }
        return (
          <>
            <Button variant="contained" color="error" onClick={(e) => {
              e.stopPropagation();
              deleteElement(params.row);
            }}>remove</Button>
          </>
        )
      }
    },
  ];

  const editElementRequest = async (row) => {
    const response = await fetch('http://localhost:4000/vehicles/' + row.id, { method: 'PUT', headers: 'application/json', body: JSON.stringify(row) });
    const data = await response.json();
    console.log(data)

    
  };

  const handleRowEditCommit = React.useCallback(async (row) => {
        const response = await fetch('http://localhost:4000/vehicles/' + row.id, { method: 'PUT', headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(row) });
        const data = await response.json();
        console.log(data);
      },
    []
);

  const deleteElement = async (row) => {
    const response = await fetch('http://localhost:4000/vehicles/' + row.id, { method: 'DELETE' });
    const data = await response.json();
    console.log(data)
    setRows(rows.filter(r => r.id != row.id))
  };


  const fetchedRows = async () => {
    const response = await fetch('http://localhost:4000/vehicles');
    const data = await response.json();
    console.log(data)
    setRows(data)
  };

  const CustomToolbar = () => (
    <>
      <AddVehicleDialog dataRows={fetchedRows}></AddVehicleDialog>
    </>
  );

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      processRowUpdate={handleRowEditCommit}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true}}
        editMode='row'
        components={{Toolbar: CustomToolbar}}
      // onEditRowsModelChange={editElementRequest}
      // BaseButton= {Button={variant:"contained"}}
      />
    </Box>
  );
}