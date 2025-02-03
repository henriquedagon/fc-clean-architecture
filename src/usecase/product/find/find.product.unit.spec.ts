import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
const input = {
    type: "a",
    id: "1",
};

const product = new Product("1", "Product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const productFindUseCase = new FindProductUseCase(productRepository);

        const output = await productFindUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100,
        });
    });

    it("should throw an error when type is missing", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("product: Product type not supported");
        });
        const productFindUseCase = new FindProductUseCase(productRepository);

        input.type = "";

        await expect(productFindUseCase.execute(input)).rejects.toThrow(
            "product: Product type not supported"
        );
    });

});
