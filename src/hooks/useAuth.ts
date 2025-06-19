// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { validarToken } from '@/connect/auth';

export const useAuthRedirect = () => {
  useEffect(() => {
    const verificar = async () => {
      const valido = await validarToken();
      if (!valido) {
        window.location.href = '/login';
      }
    };
    verificar();
  }, []);
};
