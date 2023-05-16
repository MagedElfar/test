export class AddProductDto {
    code: string;
    name: string;
    costPrice: string;
    salePrice?: number;
    description?: string;
    category?: number;
    image?: string
}