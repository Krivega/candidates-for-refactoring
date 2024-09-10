/**
 * Что было плохо: Некорректное вычисление overtimeRate.
 * Что стало лучше: Исправлено вычисление overtimeRate.
 *
 * Что было плохо: Код был неструктурирован и труден для восприятия.
 * Что стало лучше: Код разделен на более четкие части.
 */

function calculateWeeklyPay(overtime: boolean): number {
  const tenthRate: number = getTenthRate();
  const tenthsWorked: number = getTenthsWorked();

  const straightTime: number = Math.min(400, tenthsWorked);
  const overTime: number = Math.max(0, tenthsWorked - straightTime);

  const straightPay: number = straightTime * tenthRate;

  const overtimeMultiplier: number = overtime ? 1.5 : 1.0;
  const overtimeRate: number = overtimeMultiplier * tenthRate;

  const overtimePay: number = Math.round(overTime * overtimeRate);

  return straightPay + overtimePay;
}
