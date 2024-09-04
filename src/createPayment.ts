// 1. Наименование лучше сменить, обычно createAnything возвращает объект Anything
// 2. Возможно имеет смысл разделить интерфейсы
// 3. getUrl, system, account, userAccount считаем что определены выше
const setTransaction = () => {
  const token = getUrl().slice();
  system.createTransaction(token).setTransaction();
};

const sendTransaction = () => {
  const cardNumber = account.getCardNumber();
  userAccount.createCardPayment(cardNumber).postTransactionToServer();
};

const makePayment = (isToken: Boolean) => {
  if (isToken) setTransaction();
  else sendTransaction();
};
