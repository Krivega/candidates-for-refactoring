# Medium Level - Нарушения принципов SOLID и архитектурные проблемы

Эта категория содержит примеры более сложных проблем, связанных с архитектурой, принципами SOLID и паттернами проектирования.

## Список файлов и проблем:

### 1. `ABC.ts` - Нарушение Law of Demeter (транзитивные обращения)
**Проблема**: Цепочка вызовов нарушает принцип "говори только с друзьями".
```typescript
const a = new A();
a.getB().getC().doSomething(); // Транзитивное обращение
```
**Что нужно исправить**: 
- Добавить метод в класс A, который инкапсулирует логику
- Избегать длинных цепочек вызовов
- Применить принцип "Tell, Don't Ask"

---

### 2. `applyDiscount.ts` - Разные уровни абстракции, отсутствие типизации
**Проблема**: Функции работают на разных уровнях абстракции, нет типов.
```javascript
function calculateTotalPrice(items) { // Низкий уровень - работа с массивом
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
}

function applyDiscount(totalPrice, discountPercentage) { // Высокий уровень - бизнес-логика
  return totalPrice * (1 - discountPercentage / 100);
}
```
**Что нужно исправить**: 
- Добавить типизацию
- Создать единый уровень абстракции
- Выделить в отдельные модули или классы

---

### 3. `approveLoan.ts` - Инкапсулирование условных конструкций
**Проблема**: Сложное условие не инкапсулировано в отдельную функцию.
```typescript
if (
  user.age >= 18 &&
  user.age <= 65 &&
  user.employmentStatus === 'employed' &&
  user.criminalRecord === false
) {
  approveLoan();
}
```
**Что нужно исправить**: 
- Создать функцию `isEligibleForLoan(user)`
- Разбить сложное условие на логические части
- Добавить константы для магических чисел

---

### 4. `auth.ts` - Мутация входных объектов
**Проблема**: Функция изменяет переданный объект.
```typescript
const auth = (payment: TPayment, gateway: TGatewayService) => {
  const rcCode = gateway.sendAuth(payment);
  payment.rcCode = rcCode; // Мутация входного объекта
};
```
**Что нужно исправить**: 
- Возвращать новый объект вместо мутации
- Использовать immutable подход
- Четко документировать side effects

---

### 5. `calculateArea.ts` - Использование switch вместо полиморфизма
**Проблема**: Switch statement для разных типов фигур.
```typescript
function calculateArea(shape: ShapeType, radiusOrSide: number): number {
  let area = 0;
  switch (shape) {
    case ShapeType.Circle:
      area = Math.PI * Math.pow(radiusOrSide, 2);
      break;
    case ShapeType.Square:
      area = Math.pow(radiusOrSide, 2);
      break;
  }
  return area;
}
```
**Что нужно исправить**: 
- Использовать полиморфизм - создать интерфейс Shape
- Каждая фигура должна иметь свой метод calculateArea()
- Применить паттерн Strategy или Factory

---

### 6. `calculateWeeklyPay.ts` - Смешанные уровни абстракции
**Проблема**: Функция работает с низкоуровневыми вычислениями и высокоуровневой логикой.
```typescript
function calculateWeeklyPay(overtime: boolean): number {
  const tenthRate: number = getTenthRate();
  const tenthsWorked: number = getTenthsWorked();
  const straightTime: number = Math.min(400, tenthsWorked); // Магическое число
  const overTime: number = Math.max(0, tenthsWorked - straightTime);
  const straightPay: number = straightTime * tenthRate;
  const overtimeRate: number = overtime ? 1.5 : 1.0 * tenthRate; // Магическое число
  const overtimePay: number = Math.round(overTime * overtimeRate);
  return straightPay + overtimePay;
}
```
**Что нужно исправить**: 
- Вынести константы (400, 1.5)
- Разбить на более мелкие функции
- Улучшить читаемость через промежуточные переменные

---

### 7. `fetchData.ts` - Нарушение принципа единственной ответственности
**Проблема**: Функция выполняет запрос и обрабатывает результат.
```typescript
function fetchData(url: string) {
  fetch(url, { timeout: DEFAULT_TIMEOUT })
    .then((response) => console.log(response)) // Смешивание логики
    .catch((error) => console.error(error));
}
```
**Что нужно исправить**: 
- Разделить на fetch и обработку результата
- Возвращать Promise для внешней обработки
- Добавить типизацию для ответа

---

### 8. `HighLevelModule.ts` - Нарушение Dependency Inversion Principle
**Проблема**: Высокоуровневый модуль зависит от низкоуровневого.
```typescript
class HighLevelModule {
  private lowLevelModule: LowLevelModule;

  constructor() {
    this.lowLevelModule = new LowLevelModule(); // Прямая зависимость
  }
}
```
**Что нужно исправить**: 
- Использовать dependency injection
- Создать интерфейс для абстракции
- Инвертировать зависимость

---

### 9. `LimitedStack.ts` - Нарушение Liskov Substitution Principle
**Проблема**: UnlimitedStack не может корректно реализовать percentFull().
```typescript
class UnlimitedStack<T> implements Stack<T> {
  percentFull(): number {
    return 0; // Неправильная реализация для безлимитного стека
  }
}
```
**Что нужно исправить**: 
- Пересмотреть иерархию интерфейсов
- Разделить на разные интерфейсы
- Применить Interface Segregation Principle

---

### 10. `Modem.ts` - Нарушение Interface Segregation Principle
**Проблема**: Слишком большой интерфейс с разными ответственностями.
```typescript
interface Modem {
  dial: (phoneNumber: string) => boolean;      // Соединение
  disconnect: () => boolean;                   // Соединение
  send: (c: string) => boolean;               // Передача данных
  recv: () => string;                         // Передача данных
  getConnectedPhoneNumber: () => string;      // Информация о состоянии
}
```
**Что нужно исправить**: 
- Разделить на несколько интерфейсов
- Connection, DataTransmission, ConnectionInfo
- Применить композицию интерфейсов

---

### 11. `Order.ts` - Feature Envy (функциональная зависть)
**Проблема**: Order делегирует всю работу Customer.
```typescript
class Order {
  getTotalPrice(): number {
    return this.customer.calculateTotalPrice(); // Завидует функциональности Customer
  }
}
```
**Что нужно исправить**: 
- Переместить логику в правильный класс
- Пересмотреть распределение ответственностей
- Возможно, убрать лишний класс

---

### 12. `OverloadedClass.ts` - Слишком много полей в классе
**Проблема**: Класс имеет слишком много ответственностей.
```typescript
class OverloadedClass {
  field1: number;
  field2: string;
  // ... 10 полей
}
```
**Что нужно исправить**: 
- Разбить на несколько классов
- Группировать связанные поля
- Применить паттерн Composite

---

### 13. `pay.ts` - Отсутствие типизации и неясные зависимости
**Проблема**: Глобальные переменные, нет типов.
```typescript
const pay = () => {
  for (let e of employees) { // employees не определен
    if (e.isPayday()) {
      const pay = e.calculatePay();
      e.deliverPay(pay);
    }
  }
};
```
**Что нужно исправить**: 
- Добавить типизацию
- Инжектировать зависимости
- Обработать возможные ошибки

---

### 14. `processUserData.ts` - Плохо написанные комментарии
**Проблема**: Комментарии дублируют код.
```typescript
function processUserData(user) {
  // Получаем данные пользователя
  const userData = getUserData(user);
  
  // Проверяем данные пользователя
  if (userData.age >= 18) {
    // Обрабатываем данные
    processUser(user);
  } else {
    // Выводим ошибку
    console.error('User is under 18');
  }
}
```
**Что нужно исправить**: 
- Убрать избыточные комментарии
- Улучшить имена функций и переменных
- Добавить типизацию

---

### 15. `render.ts` - Смешанные уровни абстракции
**Проблема**: Функция работает с низкоуровневой конкатенацией строк.
```typescript
const render = (size: number) => {
  const html = new StringBuffer('<hr');
  
  if (size > 0) {
    html
      .append(' size="')
      .append(size + 1)
      .append('"');
  }
  
  html.append('>');
  return html.toString();
};
```
**Что нужно исправить**: 
- Использовать шаблонные строки
- Выделить логику форматирования
- Добавить валидацию входных данных

---

### 16. `SomeClass.ts` - Мертвый код и неиспользуемые методы
**Проблема**: Код содержит недостижимые участки.
```typescript
class SomeClass {
  private neverUsedMethod() { // Неиспользуемый метод
      console.log("This function is called");
  }

  public someMethod() {
      if (false) { // Недостижимый код
          doSomethingThatNeverHappens();
      }
  }
}
```
**Что нужно исправить**: 
- Удалить мертвый код
- Убрать неиспользуемые методы
- Исправить логические ошибки

---

### 17. `StatisticsCollector.ts` - Магические числа и флаги в аргументах
**Проблема**: Магическое число и неясная логика форматирования.
```typescript
formatTraffic(trafficInBytes: number, formatType: TFormatType) {
  switch (formatType) {
    case 'bytes':
      return trafficInBytes;
    case 'Mb':
      return trafficInBytes / 1_048_576; // Магическое число
  }
}
```
**Что нужно исправить**: 
- Вынести константу для конвертации
- Использовать enum или константы
- Добавить валидацию

---

### 18. `updateComment.ts` - Неясная логика и неправильное именование
**Проблема**: Метод называется "update", но может создавать.
```typescript
updateComment(comment) {
  if (this.getComment(comment.id)) {
    return this.requestToUpdateComment(comment.id, comment);
  }
  return this.requestToCreateComment(comment); // Создание в методе update
}
```
**Что нужно исправить**: 
- Переименовать в `upsertComment`
- Разделить логику создания и обновления
- Добавить типизацию

---

### 19. `User.ts` - Слишком много аргументов в конструкторе
**Проблема**: Конструктор принимает 14 параметров.
```typescript
constructor(
  name: string,
  age: number,
  address: string,
  // ... еще 11 параметров
) {
  // ...
}
```
**Что нужно исправить**: 
- Использовать паттерн Builder
- Группировать параметры в объекты
- Применить паттерн Parameter Object

## Общие принципы для исправления:
1. **Следуйте принципам SOLID**
2. **Избегайте длинных цепочек вызовов** (Law of Demeter)
3. **Инкапсулируйте сложные условия** в отдельные функции
4. **Используйте полиморфизм** вместо switch statements
5. **Применяйте dependency injection** для управления зависимостями
6. **Разделяйте интерфейсы** по ответственностям
7. **Удаляйте мертвый код** и неиспользуемые методы
8. **Группируйте параметры** в объекты при их большом количестве
