//'entities/stockItem.js' Auxiliar para criação
export const typesA = [
  "Processor",
  "RAM Memory",
  "Graphics Card",
  "Motherboard",
  "Cooler",
];
export default class CreateProduct {
  constructor({ name, description, price, quantity, type }) {
    (this.id = Math.floor(Math.random() * 1000)),
      (this.name = name),
      (this.description = description),
      (this.price = +price),
      (this.quantity = +quantity),
      (this.type = type),
      (this.addDate= new Date()),
      this.#validate(this);
  }
  #validate(product) {
    const validName = typeof this.name === "string";
    const validDescription = typeof this.description === "string";
    const validPrice = typeof this.price === "number";
    const validQuantity = typeof this.quantity === "number" && Number.isInteger(this.quantity);
    const validType = typesA.includes(this.type);
    
    if (!validType || !validDescription || !validPrice || !validName || !validQuantity) {
      throw new Error("Invalid item!");
    }
    return product;
  }
}
