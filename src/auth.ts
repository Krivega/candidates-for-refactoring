type TPayment = {
  amount: number;
  rcCode: number;
};

type TGatewayService = {
  // Предположу, что одразумевается отправка на сервер
  sendAuth: (payment: TPayment) => Promise<number>;
};

// Направляем запрос на сервер, потому async/await необходимо добавить
// чтобы в rcCode не записать Promise<number>
// ! функция вернёт Promise<undefined>
const auth = async (payment: TPayment, gateway: TGatewayService) => {
  payment.rcCode = await gateway.sendAuth(payment);
};
