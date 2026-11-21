
// Memeriksa apakah nilai merupakan angka valid
const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

// Format angka umum
const formatNumber = (value, maximumFractionDigits = 2) => {
  const number = toFiniteNumber(value);

  if (number === null) {
    return null;
  }

  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits,
  }).format(number);
};

// Format mata uang Rupiah
export const formatRupiah = (value) => {
  const number = toFiniteNumber(value);

  if (number === null) {
    return '—';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Format suhu dalam Celcius
export const formatSuhu = (value) => {
  const hasil = formatNumber(value, 1);

  return hasil === null ? '—' : `${hasil} °C`;
};

// Format berat dalam kilogram
export const formatKg = (value) => {
  const hasil = formatNumber(value, 2);

  return hasil === null ? '—' : `${hasil} kg`;
};

// Format persentase
export const formatPersen = (value) => {
  const hasil = formatNumber(value, 1);

  return hasil === null ? '—' : `${hasil}%`;
};

// Format dosis dalam mililiter
export const formatMl = (value) => {
  const hasil = formatNumber(value, 1);

  return hasil === null ? '—' : `${hasil} ml`;
};
