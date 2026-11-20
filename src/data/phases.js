
export const phases = [
    {
        id: 'IDLE',
        nama: 'Siaga',
        fase: 0,
        rentangSuhu: { min: 25, max: 30 },
        suhuSimulasi: 28,
    },
    {
        id: 'MIX_EM4',
        nama: 'Pencampuran EM4',
        fase: 1,
        rentangSuhu: { min: 25, max: 35 },
        suhuSimulasi: 30,
    },
    {
        id: 'HEATING',
        nama: 'Fase Panas',
        fase: 2,
        rentangSuhu: { min: 50, max: 60 },
        suhuSimulasi: 54,
    },
    {
        id: 'DRYING',
        nama: 'Pengeringan',
        fase: 3,
        rentangSuhu: { min: 40, max: 55 },
        suhuSimulasi: 48,
    },
    {
        id: 'DONE',
        nama: 'Selesai',
        fase: 3,
        rentangSuhu: { min: 25, max: 35 },
        suhuSimulasi: 30,
    },
    {
        id: 'FAULT',
        nama: 'Gangguan',
        fase: 0,
        rentangSuhu: null,
        suhuSimulasi: null,
    },
];
