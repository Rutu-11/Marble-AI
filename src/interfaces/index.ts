export interface IOrder {
    id: number;
    user: IUser;
    createdAt: string;
    status: IOrderStatus;
    adress: IAddress;
    amount: number;
}

export interface IUser {
    id: number;
    fullName: string;
    gender: string;
    gsm: string;
    createdAt: string;
    addresses: IAddress[];
}

export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IAddress {
    text: string;
    coordinate: [string, string];
}

export interface IChartDatum {
    name: string;
    uv: number;
    pv:number;
    amt:number
}
export interface RevenueData {
    name:string;
    uv:number;
    pv:number;
    amt:number
  }
export interface IChart {
    data: IChartDatum[];
    total: number;
    trend: number;
}

export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}

export type TTab = {
    id: number;
    label: string;
    content: JSX.Element;
};
