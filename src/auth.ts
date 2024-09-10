/**
 * Что было плохо: auth мутировала payment
 * Что стало лучше: Возвращается новый объект payment с обновленным rcCode
 *
 * Что было плохо: Не было обработки ошибок, которые могли возникнуть при вызове sendAuth.
 * Что стало лучше: Добавлена обработка ошибок, код более устойчив к сбоям.
 */

type TPayment = {
  amount: number;
  rcCode: number;
};

type TGatewayService = {
  sendAuth: (payment: TPayment) => number;
};

const auth = (payment: TPayment, gateway: TGatewayService): TPayment => {
  if (payment.amount <= 0) {
    throw new Error('Invalid payment amount.');
  }

  const rcCode = gateway.sendAuth(payment);

  if (rcCode < 0) {
    throw new Error('Authentication failed.');
  }

  return { ...payment, rcCode };
};
