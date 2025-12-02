import React from 'react';
import type { Worker } from '../types/items';

interface WorkerListProps {
  workers: Worker[];
  onDeleteWorker: (workerId: string) => void;
}

const listStyles = {
  workerList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  workerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    background: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  workerDetail: {
    margin: '0',
    fontSize: '14px',
    color: '#555',
  },
  deleteButton: {
    padding: '5px 10px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  noWorkers: {
    textAlign: 'center' as const,
    color: '#6c757d',
    fontStyle: 'italic',
    padding: '20px',
  },
  salarySummary: {
    padding: '10px',
    background: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
  },
};

export const WorkerList: React.FC<WorkerListProps> = ({
  workers,
  onDeleteWorker,
}) => {
  if (workers.length === 0) {
    return (
      <p style={listStyles.noWorkers}>No hay trabajadores en este sector</p>
    );
  }

  const totalSalary = workers.reduce((sum, worker) => sum + worker.salary, 0);

  return (
    <div style={listStyles.workerList}>
      <div style={listStyles.salarySummary}>
        <strong>Total de sueldos: ${totalSalary.toFixed(2)}</strong>
      </div>

      {workers.map((worker) => (
        <div key={worker.id} style={listStyles.workerItem}>
          <div style={listStyles.workerInfo}>
            <h4 style={listStyles.workerName}>{worker.name}</h4>
            <p style={listStyles.workerDetail}>
              <strong>Rol:</strong> {worker.role}
            </p>
            <p style={listStyles.workerDetail}>
              <strong>Sueldo:</strong> ${worker.salary.toFixed(2)}
            </p>
          </div>
          <button
            style={listStyles.deleteButton}
            onClick={() => onDeleteWorker(worker.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
