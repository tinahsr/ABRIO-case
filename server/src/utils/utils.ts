import {ProductDB} from "../../database/ProductDB";
import {GetProductDTO} from "../product/DTO/GetProductDTO";
import {CartDB} from "../../database/CartDB";
import {GetCartDTO} from "../cart/DTO/GetCartDTO";

/**
 * Transforms a ProductDB object into a GetProductDTO.
 * @returns {GetProductDTO} - The transformed product data transfer object.
 * @param product - the product to be transformed
 */
export function transformProductDBtoGetProductDTO(product: ProductDB): GetProductDTO {
    const dto = new GetProductDTO();
    dto.id = product.id;
    dto.name = product.name;
    dto.color = product.color;
    dto.price = product.price;
    dto.inventory = product.inventory;
    dto.picture = product.picture;
    dto.categories = product.categories?.map((c) => c.name) || [];

    return dto;
}

/**
 * Transforms a CartDB object into a GetCartDTO.
 * @returns {GetCartDTO} - The transformed cart data transfer object.
 * @param cart - the cart item to be transformed
 */
export function transformCartDBtoGetCartDTO(cart: CartDB): GetCartDTO {
    const dto = new GetCartDTO();
    dto.id = cart.id;
    dto.count = cart.count;
    dto.product = transformProductDBtoGetProductDTO(cart.product);

    return dto;
}