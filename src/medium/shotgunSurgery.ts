// Shotgun Surgery - одно изменение требует правок во множестве мест

// Файл 1: PaymentProcessor
class PaymentProcessor {
  processPayment(amount: number, currency: string) {
    // Хардкод валютных курсов разбросан по коду
    let convertedAmount = amount;
    
    if (currency === 'EUR') {
      convertedAmount = amount * 1.1; // EUR to USD rate
    } else if (currency === 'GBP') {
      convertedAmount = amount * 1.3; // GBP to USD rate
    } else if (currency === 'JPY') {
      convertedAmount = amount * 0.009; // JPY to USD rate
    }
    
    return this.chargeCard(convertedAmount);
  }
  
  private chargeCard(amount: number) {
    return { success: true, chargedAmount: amount };
  }
}

// Файл 2: PriceCalculator
class PriceCalculator {
  calculatePrice(basePrice: number, currency: string): number {
    // Те же курсы валют дублируются здесь
    if (currency === 'EUR') {
      return basePrice / 1.1; // USD to EUR
    } else if (currency === 'GBP') {
      return basePrice / 1.3; // USD to GBP
    } else if (currency === 'JPY') {
      return basePrice / 0.009; // USD to JPY
    }
    
    return basePrice; // USD
  }
  
  applyTax(price: number, currency: string): number {
    // Налоговые ставки тоже разбросаны
    let taxRate = 0.1; // Default US tax
    
    if (currency === 'EUR') {
      taxRate = 0.2; // EU VAT
    } else if (currency === 'GBP') {
      taxRate = 0.2; // UK VAT
    } else if (currency === 'JPY') {
      taxRate = 0.08; // Japan tax
    }
    
    return price * (1 + taxRate);
  }
}

// Файл 3: ReportGenerator
class ReportGenerator {
  generateSalesReport(sales: any[], currency: string) {
    const total = sales.reduce((sum, sale) => {
      let amount = sale.amount;
      
      // Опять те же курсы валют
      if (currency === 'EUR' && sale.currency !== 'EUR') {
        if (sale.currency === 'USD') amount = amount / 1.1;
        if (sale.currency === 'GBP') amount = amount * 1.3 / 1.1;
        if (sale.currency === 'JPY') amount = amount * 0.009 / 1.1;
      } else if (currency === 'GBP' && sale.currency !== 'GBP') {
        if (sale.currency === 'USD') amount = amount / 1.3;
        if (sale.currency === 'EUR') amount = amount * 1.1 / 1.3;
        if (sale.currency === 'JPY') amount = amount * 0.009 / 1.3;
      }
      
      return sum + amount;
    }, 0);
    
    return {
      totalSales: total,
      currency: currency,
      reportDate: new Date()
    };
  }
}

// Файл 4: CurrencyDisplay
class CurrencyDisplay {
  formatCurrency(amount: number, currency: string): string {
    // Символы валют тоже разбросаны
    let symbol = '$';
    let formattedAmount = amount;
    
    if (currency === 'EUR') {
      symbol = '€';
    } else if (currency === 'GBP') {
      symbol = '£';
    } else if (currency === 'JPY') {
      symbol = '¥';
      formattedAmount = Math.round(amount); // JPY doesn't have decimals
    }
    
    return `${symbol}${formattedAmount.toFixed(currency === 'JPY' ? 0 : 2)}`;
  }
}
