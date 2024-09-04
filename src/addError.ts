type TMutableList<T> = T[];

enum WarningType {
  LEGACY_CODE_DEPENDENCY,
}

type TWarning = {
  type: WarningType;
};

/*
 * Тут в целом непонятен результат исполнения и целеполагание.
 * Допутим что:
 * 1. errors - это некоторый глобальный стейт, или внешняя функция
 * 2. логика реализации паттерна "Фабрика" Warning лишь условно-примитивна, иначе не имеет смысла
 * Тогда:
 * 1. Стоит иначе назвать функцию создания
 * 2. Добавить аргумент для переиспользования с другими WarningType
 * */

var errors: TMutableList<TWarning> = []; // для примера

const createWarning = (type: WarningType): TWarning => {
  return {
    type,
  };
};

const addError = (errors: TMutableList<TWarning>, newError: WarningType) => {
  errors.push(createWarning(newError));
};

addError(errors, WarningType.LEGACY_CODE_DEPENDENCY);

/*
 * В противном случае весь код это over-engineering, и стоит привести к:
 * */
// где errors - это некоторый глобальный/внешний стейт
errors.push({ type: WarningType.LEGACY_CODE_DEPENDENCY });
