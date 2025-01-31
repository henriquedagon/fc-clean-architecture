import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/product.interface";

export default interface ProductRepositoryInterface<T extends ProductInterface>
  extends RepositoryInterface<T> {}
