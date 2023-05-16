import { Service } from "typedi";
import { v4 as uuidv4 } from 'uuid';
import { setError } from "../utils/error-format";
import { AddProductDto } from '../dto/product.dto';
import * as api from '../utils/axelor.api';
import * as fs from "fs"
import * as path from "path"
import axios from "axios";
import FormData from "form-data";


@Service()
export default class AxelorServices {

    constructor() { }

    private axelorProduct(addProductDto: AddProductDto) {
        const product: any = {
            stockManaged: true,
            productTypeSelect: 'storable',
            unit: {
                id: '1'
            },
            ...addProductDto,
        }

        if (addProductDto?.category) product.productCategory = { id: addProductDto.category }

        return product
    }

    private async authenticate() {
        try {
            const res = await api.login()

            return res.headers['set-cookie'];

        } catch (error) {
            throw error
        }
    }

    private async logout(cookie: any) {
        try {
            await api.logout(cookie)
        } catch (error) {
            throw error
        }
    }

    async downloadFile(url: string, filePath: string) {
        const writer = fs.createWriteStream(filePath);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    };


    async uploadMedia(imagePath: string, cookie: any) {
        try {


            const fileName = imagePath.split("/")

            const filePath = path.join(path.dirname(__dirname), "..", "public", "media", fileName[fileName.length - 1])

            await this.downloadFile(imagePath, filePath)

            const file = fs.readFileSync(filePath);

            const headers = {
                'X-File-Name': fileName[fileName.length - 1],
                'X-File-Offset': 0,
                'X-File-Size': file.length,
                'X-File-Type': 'image',
            }

            const res = await api.uploadMedia(file, cookie, headers);

            fs.unlinkSync(filePath)

            return res.data?.id;

        } catch (error) {
            console.error(error);
        }
    }

    async createProduct(addProductDto: AddProductDto) {
        try {


            const cookie = await this.authenticate()

            const product = this.axelorProduct(addProductDto)

            if (addProductDto?.image) {
                const id = await this.uploadMedia(addProductDto.image!, cookie)

                product.picture = {
                    id
                }
            }

            const { data } = await api.createProduct({
                data: product
            }, cookie)


            await this.logout(cookie)

            // if (data?.status !== 0) throw setError(400, data?.data?.message);

            return;
        } catch (error) {
            throw error
        }
    }

    async getProduct(id: number) {
        try {

            const cookie = await this.authenticate()

            const { data } = await api.getProduct(id, cookie)

            await this.logout(cookie)

            if (data?.status !== 0) throw setError(400, data?.data?.message);

            return data?.data;

        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id: number) {
        try {

            const cookie = await this.authenticate()

            const { data } = await api.deleteProduct(id, cookie)

            await this.logout(cookie)

            if (data?.status !== 0) throw setError(400, data?.data?.message);

            return;
        } catch (error) {
            throw error
        }
    }
}
