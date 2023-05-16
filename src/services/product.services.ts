import { ProductRepository } from './../model/product.model';
import { Inject, Service } from "typedi";
import { AddProductDto } from '../dto/product.dto';
import AxelorServices from './axelor.services';

@Service()
export default class ProductServices {
    private readonly productRepository: ProductRepository;
    private readonly axelorServices: AxelorServices;


    constructor(
        @Inject() productRepository: ProductRepository,
        @Inject() axelorServices: AxelorServices
    ) {
        this.productRepository = productRepository;
        this.axelorServices = axelorServices
    }



    async addProduct(addProductDto: AddProductDto) {
        try {

            await this.axelorServices.createProduct(addProductDto)
            return;

        } catch (error) {
            throw error
        }
    }

    async getProduct(id: number) {
        try {

            return await this.axelorServices.getProduct(id)

        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id: number) {
        try {

            await this.axelorServices.deleteProduct(id)
            return;

        } catch (error) {
            throw error
        }
    }

}
