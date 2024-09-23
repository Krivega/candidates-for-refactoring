const pay = () => {
  for (let e of employees) {
    if (e.isPayday()) {
      const pay = e.calculatePay();

      e.deliverPay(pay);
    }
  }
};
// е я бы заменил на element. Или вообще дал бы более подходящее название исходя из контекста

const pay = () => {
  for (let element of employees) {
    if (element.isPayday()) {
      const pay = element.calculatePay();

      element.deliverPay(pay);
    }
  }
};
