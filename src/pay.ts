// employee серьезный компонент, я бы сказал самодостаточный
const pay = () => {
  // переменные из 1-2 символов сложно воспринимаются и плохо поддаются чтению,
  // в однострочном варианте допускаю
  for (let employee of employees) {
    if (employee.isPayday()) {
      const pay = employee.calculatePay();

      employee.deliverPay(pay);
    }
  }
};
