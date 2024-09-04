// не хватало типизации и валидации значений
function calculateTotalPrice(quantity?: number, price?: number): number | undefined {
  if (!Number.isFinite(price) || !Number.isFinite(price)) {
    console.error('Не корректные значения ввода');
    return;
  }
  return (quantity || 0) * (price || 0);
}

// не хватало типизации и валидации значений +7 и 8
function formatPhoneNumber(number: string): string {
  return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
}
