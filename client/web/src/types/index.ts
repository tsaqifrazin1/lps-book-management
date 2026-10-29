
export interface MasterJenisBuku {
    id: number;
    nama: string;
}

export interface Buku {
    id: number;
    judul: string;
    penulis: string;
    jenisBukuId: number;
    jenisBuku?: MasterJenisBuku;
    tanggalRilis: string;
    jumlahHalaman: number;
}

export interface BukuPayload {
    judul: string;
    penulis: string;
    jenisBukuId: number;
    tanggalRilis: string;
    jumlahHalaman: number;
}
