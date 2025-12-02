import React, { useState } from 'react';
import type { Sector, Worker } from '../types/items';
import { SectorForm, WorkerForm, SectorList, WorkerList } from '../components';

// Estilos inline para evitar el problema del CSS
const styles = {
  distributionView: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center' as const,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  distributionContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  section: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
    minHeight: '400px',
  },
  sectionTitle: {
    color: '#495057',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
};

export const DistributionPage: React.FC = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const selectedSector = sectors.find(
    (sector) => sector.id === selectedSectorId
  );

  const addSector = (sector: Omit<Sector, 'id' | 'workers'>) => {
    const newSector: Sector = {
      ...sector,
      id: Date.now().toString(),
      workers: [],
    };
    setSectors((prev) => [...prev, newSector]);
  };

  const addWorker = (worker: Omit<Worker, 'id'>) => {
    if (!selectedSectorId) return;

    const newWorker: Worker = {
      ...worker,
      id: Date.now().toString(),
    };

    setSectors((prev) =>
      prev.map((sector) =>
        sector.id === selectedSectorId
          ? { ...sector, workers: [...sector.workers, newWorker] }
          : sector
      )
    );
  };

  const deleteSector = (sectorId: string) => {
    setSectors((prev) => prev.filter((sector) => sector.id !== sectorId));
    if (selectedSectorId === sectorId) {
      setSelectedSectorId(null);
    }
  };

  const deleteWorker = (workerId: string) => {
    if (!selectedSectorId) return;

    setSectors((prev) =>
      prev.map((sector) =>
        sector.id === selectedSectorId
          ? {
              ...sector,
              workers: sector.workers.filter(
                (worker) => worker.id !== workerId
              ),
            }
          : sector
      )
    );
  };

  return (
    <div style={styles.distributionView}>
      <h1 style={styles.title}>Distribución de Personal</h1>

      <div style={styles.distributionContainer}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Sectores</h2>
          <SectorForm onAddSector={addSector} />
          <SectorList
            sectors={sectors}
            selectedSectorId={selectedSectorId}
            onSelectSector={setSelectedSectorId}
            onDeleteSector={deleteSector}
          />
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {selectedSector
              ? `Trabajadores - ${selectedSector.name}`
              : 'Selecciona un sector'}
          </h2>

          {selectedSector && (
            <>
              <WorkerForm onAddWorker={addWorker} />
              <WorkerList
                workers={selectedSector.workers}
                onDeleteWorker={deleteWorker}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
