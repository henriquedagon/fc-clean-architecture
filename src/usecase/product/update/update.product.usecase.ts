import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputUpdateProductDto, OutputUpdateProductDto} from "./udpate.product.dto";
import ProductB from "../../../domain/product/entity/product-b";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface<ProductInterface>;

    constructor(productRepository: ProductRepositoryInterface<ProductInterface>) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputUpdateProductDto
    ): Promise<OutputUpdateProductDto> {

        const product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
