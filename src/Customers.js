import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import AddCustomerDialog from './addCustomerDialog';


export function Customers({ customers, onRemove, onAdd, onEdit }) {
  const [rows, setRows] = useState([]);
  const [editOpen, setEditOpen] = useState([]);

  useEffect(() => {
    fetchedRows()
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'full name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 150,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'phone number',
      type: 'string',
      width: 110,
      editable: true,
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
    const response = await fetch('http://localhost:4000/customer/' + row.id, { method: 'PUT', headers: 'application/json', body: JSON.stringify(row) });
    const data = await response.json();
    console.log(data)

    
  };

  const handleRowEditCommit = React.useCallback(async (row) => {
        const response = await fetch('http://localhost:4000/customer/' + row.id, { method: 'PUT', headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(row) });
        const data = await response.json();
        console.log(data);
      },
    []
);

  const deleteElement = async (row) => {
    const response = await fetch('http://localhost:4000/customer/' + row.id, { method: 'DELETE' });
    const data = await response.json();
    console.log(data)
    setRows(rows.filter(r => r.id != row.id))
  };


  const fetchedRows = async () => {
    const response = await fetch('http://localhost:4000/customer');
    const data = await response.json();
    console.log(data)
    setRows(data)
  };

  const CustomToolbar = () => (
    <>
      <AddCustomerDialog dataRows={fetchedRows}></AddCustomerDialog>
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