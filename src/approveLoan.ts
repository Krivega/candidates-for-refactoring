/**
 * Что было плохо: Возрастные границы и статус занятости были вшиты в код.
 * Что стало лучше: Введены константы для упрощения изменения условий и повышения читаемости кода.

 * Что было плохо: Условие проверки было встроено непосредственно в код, что затрудняло его поддержку.
 * Что стало лучше: Логика проверки вынесена в отдельную функцию, что улучшает модульность и читаемость кода.
 */

const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 65;
const REQUIRED_EMPLOYMENT_STATUS = 'employed';

function canHaveLoan(user: {
  age: number;
  employmentStatus: string;
  criminalRecord: boolean;
}): boolean {
  return (
    user.age >= MINIMUM_AGE &&
    user.age <= MAXIMUM_AGE &&
    user.employmentStatus === REQUIRED_EMPLOYMENT_STATUS &&
    !user.criminalRecord
  );
}

// Пример использования
if (canHaveLoan(user)) {
  approveLoan();
}
