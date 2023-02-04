import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Alert, TextField } from '@mui/material';

export default function AddVehicleDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [manufacturer, setManufacturer] = React.useState('');
  const [model,setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [seats, setSeats] = React.useState('');
  const [inventory, setInventory] = React.useState('');

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickSend = (event) => {
   setOpen(false);
   if(manufacturer == '' || model == '' || year == '' || price == '' || inventory == '' || seats == ''){
    alert('invalid input');
    return;
   }
   handleSave();
  };

  const handleSave = async () => {
    const response = await fetch('http://localhost:4000/vehicles/' , { method: 'POST', headers: 
    {
        'Content-type':'application/json'
    }
    , body: JSON.stringify({'brand': manufacturer,
      'model': model,
      'year': year,
      'price': price,
      'inventory': inventory,
      'seats': seats})});
    const data = await response.json();
    console.log(data);
    const setData = props.dataRows;
    setData()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        add new element
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClickSend}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"add new vehicle"}
        </DialogTitle>
        <DialogContent>
        <TextField  id="outlined-required" label="manufacturer" variant="outlined"  onChange={(e) => {setManufacturer(e.target.value)}}/>
        <TextField  id="outlined-required" label="model" variant="outlined"  onChange={(e) => {setModel(e.target.value)}}/>
        <TextField  id="outlined-required" label="year" variant="outlined" onChange={(e) => {setYear(e.target.value)}}/>
        <TextField  id="outlined-required" label="seats" variant="outlined" onChange={(e) => {setSeats(e.target.value)}}/>
        <TextField  id="outlined-required" label="price" variant="outlined" onChange={(e) => {setPrice(e.target.value)}}/>
        <TextField  id="outlined-required" label="inventory" variant="outlined" onChange={(e) => {setInventory(e.target.value)}}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClickSend} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}