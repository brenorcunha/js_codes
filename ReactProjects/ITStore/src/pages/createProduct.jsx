//Same as 'entities/stockItem.js'

const typesA = [
  "Processor",
  "RAM Memory",
  "Graphics Card",
  "Motherboard",
  "Cooler",
];

export default class createProduct {
  constructor({name, description, price, quantity, type}) {
    (this.name = name),
      (this.description = description),
      (this.price = price),
      (this.quantity = quantity),
      (this.type = type),
      (this.#validate())
  }
  #validate(product) {
    const validName = typeof product.name === "string";
    const validDescription = typeof product.description === "string";
    const validQuantity =
      typeof product.quantity === "number" && Number.isInteger(product.quantity);
    const validPrice = typeof product.price === "number";
    const validType = typesA.includes(product.type);
    if (
      !validName ||
      !validDescription ||
      !validQuantity ||
      !validPrice ||
      !validType
    ) {
      alert("[ERROR] Invalid item. Try again.")
      throw new Error("Invalid item!");
    }
  }
}
