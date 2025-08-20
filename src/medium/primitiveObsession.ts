// Primitive Obsession - использование примитивов вместо объектов
class BankAccount {
  private balance: number;
  private accountNumber: string;
  private routingNumber: string;
  
  constructor(balance: number, accountNumber: string, routingNumber: string) {
    this.balance = balance;
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
  }
  
  // Много примитивных параметров вместо объектов
  transfer(
    amount: number,
    fromAccountNumber: string,
    fromRoutingNumber: string,
    toAccountNumber: string,
    toRoutingNumber: string,
    currency: string,
    description: string
  ) {
    // Логика перевода
    if (currency === 'USD' && amount > 0) {
      // ...
    }
  }
  
  // Примитивы для представления сложных концепций
  validateAccount(accountNumber: string, routingNumber: string): boolean {
    return accountNumber.length === 10 && routingNumber.length === 9;
  }
  
  formatCurrency(amount: number, currency: string): string {
    if (currency === 'USD') {
      return `$${amount.toFixed(2)}`;
    } else if (currency === 'EUR') {
      return `€${amount.toFixed(2)}`;
    }
    return `${amount.toFixed(2)} ${currency}`;
  }
}
