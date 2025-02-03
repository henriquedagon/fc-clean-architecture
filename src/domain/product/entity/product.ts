import ProductInterface from "./product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    const error = {context: "product"}
    if (this._id.length === 0) {
      this.notification.addError({...error, message: "Id is required"});
    }
    if (this._name.length === 0) {
      this.notification.addError({...error, message: "Name is required"});
    }
    if (this._price < 0) {
      this.notification.addError({...error, message: "Price must be greater than or equal to zero"});
    }
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
    return true;
  }
}
