'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (motivo: string) => void;
}

export default function ModalReporte({ open, onClose, onConfirm }: Props) {
  const [motivo, setMotivo] = useState('');

  const handleConfirm = () => {
    if (motivo.trim() !== '') {
      onConfirm(motivo);
      setMotivo('');
    }
  };

  const handleClose = () => {
    setMotivo('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reportar publicación</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Motivo"
          type="text"
          fullWidth
          multiline
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
