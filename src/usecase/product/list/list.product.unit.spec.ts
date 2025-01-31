import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";

const product1 = new Product("1", "Product 1", 100);
const product2 = new Product("2", "Product 2", 200);

const productB1 = new ProductB("3", "Product 3", 300);
const productB2 = new ProductB("4", "Product 4", 400);

const MockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

const MockProductBRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productB1, productB2])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test list product use case", () => {
    it("should list all products", async () => {
        const productRepository = MockProductRepository();
        const productBRepository = MockProductBRepository();
        const productListUseCase = new ListProductUseCase(productRepository);
        const productBListUseCase = new ListProductUseCase(productBRepository);

        const outputA = await productListUseCase.execute({});

        expect(outputA.products.length).toBe(2);
        expect(outputA.products[0].id).toBe(product1.id);
        expect(outputA.products[0].name).toBe(product1.name);
        expect(outputA.products[0].price).toBe(product1.price);
        expect(outputA.products[1].id).toBe(product2.id);
        expect(outputA.products[1].name).toBe(product2.name);
        expect(outputA.products[1].price).toBe(product2.price);

        const outputB = await productBListUseCase.execute({});

        expect(outputB.products.length).toBe(2);
        expect(outputB.products[0].id).toBe(productB1.id);
        expect(outputB.products[0].name).toBe(productB1.name);
        expect(outputB.products[0].price).toBe(productB1.price);
        expect(outputB.products[1].id).toBe(productB2.id);
        expect(outputB.products[1].name).toBe(productB2.name);
        expect(outputB.products[1].price).toBe(productB2.price);

    });

});
