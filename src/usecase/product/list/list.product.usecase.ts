import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputListProductDto, OutputListProductDto,} from "./list.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface<ProductInterface>;

    constructor(productRepository: ProductRepositoryInterface<ProductInterface>) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputListProductDto
    ): Promise<OutputListProductDto> {

        const products = await this.productRepository.findAll();
        return { products };
    }
}
