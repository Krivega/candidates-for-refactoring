// Отсутствовали конструкторы в классах
class Order {
  private customer: Customer;

  constructor() {
    // в customer ожидается объявление объекта
    this.customer = new Customer();
  }

  getTotalPrice(): number {
    return this.customer.calculateTotalPrice();
  }
}

class Customer {
  private items: Item[];

  constructor() {}

  calculateTotalPrice(): number {
    // вычисление общей цены на основе items
  }
}
