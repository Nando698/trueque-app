'use client';

import { activarUsuario, desactivarUsuario, eliminarUsuario } from '@/connect/users';
import { Usuario } from '@/interfaces/Usuario';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import { useState } from 'react';





interface Props {
    usuarios: Usuario[];
    paginaActual: number;
    totalPaginas: number;
    setPaginaActual: (pagina: number) => void;
}

export default function UsuariosAdmin({
    usuarios,
    paginaActual,
    totalPaginas,
    setPaginaActual,
}: Props) {




    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');


    const mostrarSnackbar = (mensaje: string) => {
        setSnackbarMsg(mensaje);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box mb={5}>
            <Typography variant="h5" gutterBottom color="white">
                Usuarios
            </Typography>
            <List>
                {usuarios?.map((user) => (
                    <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
                        <ListItem disablePadding>
                            <ListItemText
                                primary={`${user.nombre} (${user.correo})`}
                                secondary={`Estado: ${user.estado}`}
                            />
                        </ListItem>
                        <Stack direction="row" spacing={2} mt={1}>

                            {user.estado === 'ACTIVO' ? (
                                <Button
                                    variant="outlined"
                                    onClick={async () => {
                                        try {
                                            await desactivarUsuario(user.id);
                                            mostrarSnackbar(`Usuario "${user.nombre}" desactivado`);
                                        } catch (error) {
                                            mostrarSnackbar(`Error al desactivar "${user.nombre}"`);
                                        }
                                    }}
                                >
                                    Desactivar
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={async () => {
                                        await activarUsuario(user.id);
                                        mostrarSnackbar(`Usuario "${user.nombre}" activado`);
                                    }}
                                >
                                    Activar
                                </Button>
                            )}

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    await eliminarUsuario(user.id);
                                    mostrarSnackbar(`Usuario "${user.nombre}" eliminado`);
                                }}
                            >
                                Eliminar
                            </Button>
                        </Stack>
                    </Paper>
                ))}
            </List>

            <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
                <Button
                    variant="outlined"
                    onClick={() => setPaginaActual(Math.max(paginaActual - 1, 1))}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </Button>

                <Typography color="white" sx={{ alignSelf: 'center' }}>
                    Página {paginaActual} de {totalPaginas}
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => setPaginaActual(Math.min(paginaActual + 1, totalPaginas))}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </Button>
            </Stack>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Box>


    );
}
