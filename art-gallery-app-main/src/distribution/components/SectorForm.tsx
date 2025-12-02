import React, { useState } from 'react';
import type { Sector } from '../types/items';

interface SectorFormProps {
  onAddSector: (sector: Omit<Sector, 'id' | 'workers'>) => void;
}

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '60px',
    resize: 'vertical' as const,
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 15px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export const SectorForm: React.FC<SectorFormProps> = ({ onAddSector }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddSector({
      name: name.trim(),
      description: description.trim() || undefined,
    });

    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <input
        type="text"
        placeholder="Nombre del sector"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={formStyles.input}
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={formStyles.textarea}
      />
      <button type="submit" style={formStyles.button}>
        Agregar Sector
      </button>
    </form>
  );
};
