// Circular Dependency - классы зависят друг от друга
class OrderService {
  private customerService: CustomerService;
  
  constructor() {
    this.customerService = new CustomerService();
  }
  
  createOrder(customerId: string, items: any[]) {
    // Получаем клиента через CustomerService
    const customer = this.customerService.getCustomer(customerId);
    
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    const order = {
      id: this.generateOrderId(),
      customerId,
      items,
      total: this.calculateTotal(items),
      createdAt: new Date()
    };
    
    // Уведомляем CustomerService о новом заказе
    this.customerService.onOrderCreated(order);
    
    return order;
  }
  
  private calculateTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  
  private generateOrderId(): string {
    return 'ORDER_' + Math.random().toString(36).substr(2, 9);
  }
  
  getOrdersByCustomer(customerId: string) {
    // Логика получения заказов
    return [];
  }
}

class CustomerService {
  private orderService: OrderService;
  
  constructor() {
    // Создаем циклическую зависимость
    this.orderService = new OrderService();
  }
  
  getCustomer(customerId: string) {
    // Логика получения клиента
    return {
      id: customerId,
      name: 'John Doe',
      email: 'john@example.com'
    };
  }
  
  getCustomerWithOrders(customerId: string) {
    const customer = this.getCustomer(customerId);
    
    if (customer) {
      // Используем OrderService для получения заказов
      const orders = this.orderService.getOrdersByCustomer(customerId);
      
      return {
        ...customer,
        orders
      };
    }
    
    return null;
  }
  
  onOrderCreated(order: any) {
    // Обновляем статистику клиента
    console.log(`Customer ${order.customerId} made a new order`);
    
    // Отправляем уведомление
    this.sendOrderNotification(order);
  }
  
  private sendOrderNotification(order: any) {
    // Логика отправки уведомления
  }
}
