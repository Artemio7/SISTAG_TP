import React, { useState } from 'react';
import type { Worker } from '../types/items';

interface WorkerFormProps {
  onAddWorker: (worker: Omit<Worker, 'id'>) => void;
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
    width: '100%',
    boxSizing: 'border-box' as const,
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
    width: '100%',
  },
  roleSelection: {
    position: 'relative' as const,
    width: '100%',
  },
};

export const WorkerForm: React.FC<WorkerFormProps> = ({ onAddWorker }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  const predefinedRoles = [
    'Curador',
    'Guía',
    'Seguridad',
    'Recepcionista',
    'Conservador',
    'Educador',
    'Técnico',
    'Administrador',
    'Limpieza',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !salary) return;

    onAddWorker({
      name: name.trim(),
      role: role.trim(),
      salary: parseFloat(salary),
    });

    setName('');
    setRole('');
    setSalary('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <input
        type="text"
        placeholder="Nombre del trabajador"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={formStyles.input}
      />

      <div style={formStyles.roleSelection}>
        <input
          type="text"
          placeholder="Rol del trabajador"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          list="predefined-roles"
          required
          style={formStyles.input}
        />
        <datalist id="predefined-roles">
          {predefinedRoles.map((roleOption) => (
            <option key={roleOption} value={roleOption} />
          ))}
        </datalist>
      </div>

      <input
        type="number"
        placeholder="Sueldo ($)"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        min="0"
        step="0.01"
        required
        style={formStyles.input}
      />

      <button type="submit" style={formStyles.button}>
        Agregar Trabajador
      </button>
    </form>
  );
};
