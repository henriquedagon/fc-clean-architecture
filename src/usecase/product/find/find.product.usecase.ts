import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputFindProductDto, OutputFindProductDto,} from "./find.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface<ProductInterface>;

    constructor(productRepository: ProductRepositoryInterface<ProductInterface>) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputFindProductDto
    ): Promise<OutputFindProductDto> {

        const product = await this.productRepository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
