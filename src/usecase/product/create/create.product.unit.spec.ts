import CreateProductUseCase from "./create.product.usecase";
const inputA = {
    type: "a",
    name: "Product 1",
    price: 100,
};

const inputB = {
    type: "b",
    name: "Product 2",
    price: 200,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const productBRepository = MockRepository();
        const productBCreateUseCase = new CreateProductUseCase(productBRepository);

        const outputA = await productCreateUseCase.execute(inputA);

        expect(outputA).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price,
        });

        const outputB = await productBCreateUseCase.execute(inputB);

        expect(outputB).toEqual({
            id: expect.any(String),
            name: inputB.name,
            price: inputB.price * 2,
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        inputA.name = "";

        await expect(productCreateUseCase.execute(inputA)).rejects.toThrow(
            "product: Name is required"
        );
    });

    it("should thrown an error when price is negative", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        inputA.name = "Product 1";
        inputA.price = -1;

        await expect(productCreateUseCase.execute(inputA)).rejects.toThrow(
            "product: Price must be greater than or equal to zero"
        );
    });
});
