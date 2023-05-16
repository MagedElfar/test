import Controller, { APIRoute } from "../app/controller";
import { Request, Response, NextFunction } from "express";
import routes from "../route/_product.routes";
import { Inject } from "typedi";
import ProductServices from "../services/product.services";


export default class ProductController extends Controller {
    protected routes: APIRoute[];
    private readonly productServices: ProductServices


    constructor(
        path: string,
        @Inject() productServices: ProductServices
    ) {
        super(path);
        this.routes = routes(this);
        this.productServices = productServices
    }

    async addProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            await this.productServices.addProduct(req.body);

            super.setResponseSuccess({
                res,
                status: 201,
                message: "product is added successfully"
            })

        } catch (error) {
            next(error)
        }
    };

    async getProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const { id } = req.params;

            const product = await this.productServices.getProduct(+id);

            super.setResponseSuccess({
                res,
                status: 200,
                data: { product }
            })

        } catch (error) {
            next(error)
        }
    };

    async deleteProductHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const { id } = req.params;

            await this.productServices.deleteProduct(+id);

            super.setResponseSuccess({
                res,
                status: 200,
                message: "product is deleted successfully"
            })

        } catch (error) {
            next(error)
        }
    };


}
