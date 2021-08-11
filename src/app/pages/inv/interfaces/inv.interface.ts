
export interface Product {
    id: number;
    name: string;
    price: number;
    inventario_stock: number;
    qty: number;
    date_venc?: number;
    lote?: number;
}
