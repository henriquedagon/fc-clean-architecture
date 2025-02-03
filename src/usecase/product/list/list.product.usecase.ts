import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputListProductDto, OutputListProductDto,} from "./list.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";
import Product from "../../../domain/product/entity/product";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface<ProductInterface>;

    constructor(productRepository: ProductRepositoryInterface<ProductInterface>) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputListProductDto
    ): Promise<OutputListProductDto> {

        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(product: ProductInterface[]): OutputListProductDto {
        return {
            products: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}
