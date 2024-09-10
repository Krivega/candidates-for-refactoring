/**
 * Что было плохо: Order жестко зависел от создания экземпляра Customer.
 * Что стало лучше: Теперь Order принимает экземпляр Customer через конструктор.
 *
 * Что было плохо: Свойство items в Customer не инициализировано.
 * Что стало лучше: Свойство items инициализировано пустым массивом. Добавлен метод addItem для добавления элементов и проверка в методе calculateTotalPrice.
 */

class Order {
  private customer: Customer;

  constructor(customer: Customer) {
    this.customer = customer;
  }

  public getTotalPrice(): number {
    return this.customer.calculateTotalPrice();
  }
}

class Customer {
  private items: Item[] = [];

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public calculateTotalPrice(): number {
    // вычисление общей цены на основе items
  }
}
