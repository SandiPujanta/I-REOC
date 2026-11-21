
import { RASIO_EM4_ML_PER_KG, TARIF_PER_KWH } from '../data/konstanta';

// Menghitung persentase penyusutan berat
export const hitungSusut = (beratAwal, beratAkhir) => {
  if (beratAwal == null || beratAkhir == null) {
    return 0;
  }

  const awal = Number(beratAwal);
  const akhir = Number(beratAkhir);

  if (
    !Number.isFinite(awal) ||
    !Number.isFinite(akhir) ||
    awal <= 0 ||
    akhir < 0
  ) {
    return 0;
  }

  return ((awal - akhir) / awal) * 100;
};

// Menghitung dosis EM4 dalam mililiter
export const hitungDosisEM4 = (beratAwal) => {
  const berat = Number(beratAwal);

  if (
    beratAwal == null ||
    !Number.isFinite(berat) ||
    berat <= 0
  ) {
    return 0;
  }

  return berat * RASIO_EM4_ML_PER_KG;
};

// Menghitung biaya listrik dalam Rupiah
export const hitungBiayaListrik = (energiKwh) => {
  const energi = Number(energiKwh);

  if (
    energiKwh == null ||
    !Number.isFinite(energi) ||
    energi < 0
  ) {
    return 0;
  }

  return energi * TARIF_PER_KWH;
};
