import {
    
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from '@mui/material';
  import { useState } from 'react';
  
  interface OfrecerModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (mensaje: string) => void;
  }
  
  export const OfrecerModal: React.FC<OfrecerModalProps> = ({ open, onClose, onConfirm }) => {
    const [mensaje, setMensaje] = useState('');
  
    const handleConfirm = () => {
      onConfirm(mensaje);
      setMensaje('');
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Proponer un intercambio</DialogTitle>
        <DialogContent>
          <TextField
            label="Mensaje"
            multiline
            rows={4}
            fullWidth
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default OfrecerModal;
  