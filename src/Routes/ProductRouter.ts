import express from 'express'
import ProductController from '../Controller/ProductController';

const router = express.Router();

router.route('/products')
    .get(ProductController.getFullProductsOrFiltered)

router.route('/products/:id/related')
    .get(ProductController.getRelatedProducts);

router.route('/product/:id')
    .get(ProductController.getSingleProduct);

export default router;

