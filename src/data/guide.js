// Data Buku Panduan — daftar bahan yang boleh dan dilarang dimasukkan ke reaktor

export const SOP_VERSION = 'SOP v2';

export const guideSections = [
    {
        id: 'boleh',
        judul: 'Boleh Dimasukkan',
        diizinkan: true,
        items: [
            {
                id: 'a1',
                judul: 'Sisa Sayur & Buah',
                keterangan: 'Kulit buah, sayuran layu, ampas tahu',
            },
            {
                id: 'a2',
                judul: 'Nasi & Sisa Makanan',
                keterangan: 'Nasi, sisa roti, ampas kopi kering',
            },
            {
                id: 'a3',
                judul: 'Canang & Banten Organik',
                keterangan: 'Bunga & janur (tanpa staples)',
            },
        ],
    },
    {
        id: 'dilarang',
        judul: 'Dilarang Dimasukkan',
        diizinkan: false,
        items: [
            {
                id: 'f1',
                judul: 'Plastik, Kaca & Logam',
                keterangan: 'Menyumbat bilah pengaduk mekanis',
            },
            {
                id: 'f2',
                judul: 'Tulang Besar & Minyak Pekat',
                keterangan: 'Merusak motor & mematikan mikroba',
            },
        ],
    },
];