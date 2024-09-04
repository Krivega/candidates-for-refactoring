// getTenthRate, getTenthsWorked считаем что определены выше, поскольку используются
function calculateWeeklyPay(overtime: boolean): number {
  const tenthRate: number = getTenthRate();
  const tenthsWorked: number = getTenthsWorked();

  // функция расчёта без overTime
  const getStraightPay = (): number => Math.min(400, tenthsWorked) * tenthRate;

  // расчёт overTime
  const overTime: number = Math.max(tenthsWorked - 400, 0);
  // функция расчёта за overTime
  const getOvertimePay = (): number =>
    overTime && Math.round(overTime * (overtime ? 1.5 : 1.0) * tenthRate);

  return getStraightPay() + getOvertimePay();
  /*
   * если принебречь округлением или округлять всё вместо одного слогаемого,
   * тогда ставку можно сразу в конец подставить и убрать лишние логические операции
   * const getStraightPay = (): number => Math.min(400, tenthsWorked);
   * const getOvertimePay = (): number => Math.max(tenthsWorked - 400, 0) * (overtime ? 1.5 : 1.0);
   *
   * return tenthRate * (getStraightPay() + getOvertimePay());
   * */
}
