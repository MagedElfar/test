import { Container } from 'typedi';
import Controller from "../app/controller";
import ProductController from '../controllers/product.controllers';
import ProductServices from '../services/product.services';



const routes: Controller[] = [

    new ProductController(
        "/products",
        Container.get(ProductServices),
    ),


]

export default routes