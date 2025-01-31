import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";
const inputA = {
    id: "1",
    name: "Product 1",
    price: 100,
};

const inputB = {
    id: "1",
    name: "Product 2",
    price: 200,
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

describe("Unit test update product use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(inputA);

        expect(output).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price,
        });
    });

    // it("should thrown an error when name is missing", async () => {
    //     const productRepository = MockRepository();
    //     const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    //
    //     inputA.name = "";
    //
    //     await expect(productUpdateUseCase.execute(inputA)).rejects.toThrow(
    //         "Name is required"
    //     );
    // });
    //
    // it("should thrown an error when price is negative", async () => {
    //     const productRepository = MockRepository();
    //     const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    //
    //     inputA.name = "Product 1";
    //     inputA.price = -1;
    //
    //     await expect(productUpdateUseCase.execute(inputA)).rejects.toThrow(
    //         "Price must be greater than or equal to zero"
    //     );
    // });
});
