'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { obtenerCategorias } from '@/connect/categorias';

type Categoria = {
  id: number;
  nombre: string;
};

interface Props {
  onChange: (selectedIds: string[]) => void;
}

export default function MultipleSelectCheckmarks({ onChange }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (err) {
      console.error("Error al obtener categorias!", err);
    }
  };

  fetchData();

  }, []);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id="multiple-checkbox-label">Categorías</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) =>
          categorias
            .filter((cat) => selected.includes(cat.id.toString()))
            .map((cat) => cat.nombre)
            .join(', ')
        }
      >
        {categorias.map((cat) => (
          <MenuItem key={cat.id} value={cat.id.toString()}>
            <Checkbox checked={selected.includes(cat.id.toString())} />
            <ListItemText primary={cat.nombre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
