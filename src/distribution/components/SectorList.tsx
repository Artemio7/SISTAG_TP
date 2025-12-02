import React from 'react';
import type { Sector } from '../types/items';

interface SectorListProps {
  sectors: Sector[];
  selectedSectorId: string | null;
  onSelectSector: (sectorId: string) => void;
  onDeleteSector: (sectorId: string) => void;
}

const listStyles = {
  sectorList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  sectorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    background: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  sectorItemSelected: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    background: '#e7f3ff',
    border: '1px solid #007bff',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  sectorInfo: {
    flex: 1,
  },
  sectorName: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  sectorDescription: {
    margin: '0 0 5px 0',
    color: '#666',
    fontSize: '14px',
  },
  sectorWorkers: {
    fontSize: '12px',
    color: '#888',
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
  noSectors: {
    textAlign: 'center' as const,
    color: '#6c757d',
    fontStyle: 'italic',
    padding: '20px',
  },
};

export const SectorList: React.FC<SectorListProps> = ({
  sectors,
  selectedSectorId,
  onSelectSector,
  onDeleteSector,
}) => {
  if (sectors.length === 0) {
    return <p style={listStyles.noSectors}>No hay sectores creados</p>;
  }

  return (
    <div style={listStyles.sectorList}>
      {sectors.map((sector) => (
        <div
          key={sector.id}
          style={
            selectedSectorId === sector.id
              ? listStyles.sectorItemSelected
              : listStyles.sectorItem
          }
          onClick={() => onSelectSector(sector.id)}
        >
          <div style={listStyles.sectorInfo}>
            <h3 style={listStyles.sectorName}>{sector.name}</h3>
            {sector.description && (
              <p style={listStyles.sectorDescription}>{sector.description}</p>
            )}
            <span style={listStyles.sectorWorkers}>
              {sector.workers.length} trabajadores
            </span>
          </div>
          <button
            style={listStyles.deleteButton}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSector(sector.id);
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
