import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  contenido: string | React.ReactNode;
  textoConfirmar: string;
  textoCancelar: string;
  disableConfirm?: boolean;
}

export default function ModalGenerico({
  open,
  onClose,
  onConfirm,
  titulo,
  contenido,
  textoConfirmar,
  textoCancelar,
  disableConfirm = false,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contenido}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{textoCancelar}</Button>
        <Button onClick={onConfirm} disabled={disableConfirm} color="error">
          {textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
