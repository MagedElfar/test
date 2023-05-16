import Controller, { APIRoute, Methods } from '../app/controller';
import validationMiddleware from '../middleware/validation.middleware';
import validation from "../middleware/validation.middleware"
import { paramSchema } from '../utils/_commen-validation-schema';
import { addProductSchema } from '../utils/_product-validation-schema';

const routes: (controller: Controller) => APIRoute[] = (controller: any) => {

    const r: APIRoute[] = [
        {
            path: "/",
            method: Methods.POST,
            handler: controller.addProductHandler,
            localMiddleware: [
                validation(addProductSchema)
            ],
            auth: true
        },

        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getProductHandler,
            localMiddleware: [
                validation(paramSchema, "param")
            ],
            auth: true
        },

        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteProductHandler,
            localMiddleware: [
                validation(paramSchema, "param")
            ],
            auth: true
        }
    ]
    return r;
}


export default routes