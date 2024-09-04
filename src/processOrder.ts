// Нужно разделить логику доставки и обработки заказа
function processOrder(item: unknown, isExpress: boolean) {
  if (isExpress) {
    // Логика обработки заказа с учетом экспресс-доставки
  } else {
    // Логика обработки заказа для стандартной доставки
  }

  processDelivery(item, isExpress);
}

function processDelivery(item: unknown, isExpress: boolean) {
  if (isExpress) {
    // Логика для экспресс-доставки
  } else {
    // Логика для стандартной доставки
  }
}
