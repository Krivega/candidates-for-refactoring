# Hard Level - Сложные архитектурные антипаттерны

Эта категория содержит примеры сложных архитектурных проблем, которые требуют глубокого понимания принципов проектирования и рефакторинга.

## Список файлов и проблем:

### 1. `createPayment.ts` - Сложная условная логика и дублирование
**Проблема**: Дублирование кода, сложная логика ветвления, скрытые зависимости.
```typescript
const createPayment = (isToken: Boolean) => {
  if (isToken) {
    const token = getUrl().slice();
    system.createTransaction(token).setTransaction();
  } else {
    const cardNumber = account.getCardNumber();
    userAccount.createCardPayment(cardNumber).postTransactionToServer();
  }
};
```
**Что нужно исправить**: 
- Применить паттерн Strategy для разных типов платежей
- Использовать dependency injection для внешних зависимостей
- Создать фабрику платежных методов
- Инкапсулировать логику в отдельные классы

---

### 2. `Director.ts` - Неочевидная зависимость и возможная избыточность
**Проблема**: Класс Director может быть избыточной абстракцией.
```typescript
class Director {
  calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  scheduleMeeting(event) {
    this.calendar.addEvent(event); // Простое делегирование
  }
}
```
**Что нужно исправить**: 
- Оценить необходимость класса Director
- Добавить дополнительную логику или убрать класс
- Применить паттерн Decorator если нужна дополнительная функциональность
- Рассмотреть композицию вместо наследования

---

### 3. `FilmController.ts` - Скрытые временные привязки и нарушение инкапсуляции
**Проблема**: Состояние объекта изменяется неявно, нарушена инкапсуляция.
```typescript
class FilmController {
  openDetails() {
    const popup = new Popup();
    this.popupOpened = true; // Скрытое изменение состояния
  }

  isPopupOpened() {
    return this.popupOpened; // Поле не объявлено в классе
  }
}
```
**Что нужно исправить**: 
- Объявить все поля класса явно
- Инкапсулировать состояние popup
- Применить паттерн State Machine для управления состояниями
- Добавить методы для корректного управления жизненным циклом popup

---

### 4. `MoogDiver.ts` - Сложная логика с условными конструкциями и неясные имена
**Проблема**: Непонятные имена методов, сложная логика, магические строки.
```typescript
class MoogDiver {
  public dive(reason: string) {
    this.saturateGradient();
    this.reticulateSplines();
    this.diveForMoog(reason);
  }

  private diveForMoog(reason: string) {
    if(reason === 'ok'){ // Магическая строка
      this.splines.doOk();
    } else {
      this.splines.doNotOk();
    }
  }
}
```
**Что нужно исправить**: 
- Переименовать методы в понятные имена
- Использовать enum вместо магических строк
- Применить паттерн Command для разных типов действий
- Разбить сложную логику на более понятные части
- Добавить валидацию и обработку ошибок

---

### 5. `process.ts` - Отсутствие контекста и зависимостей
**Проблема**: Глобальные функции без контекста, неясные зависимости.
```typescript
processVerificationRequest();
makeUpdateRequest();
processDeletion();
```
**Что нужно исправить**: 
- Создать класс или модуль для группировки связанных операций
- Добавить dependency injection для внешних зависимостей
- Применить паттерн Chain of Responsibility для последовательной обработки
- Добавить обработку ошибок и откат операций
- Создать единую точку входа с координацией процессов

---

### 6. `processOrder.ts` - Флаги в аргументах и неполная реализация
**Проблема**: Boolean флаг в аргументах, неполная реализация логики.
```typescript
function processOrder(item: unknown, isExpress: boolean) {
  if (isExpress) {
    // Логика для экспресс-доставки
  } else {
    // Логика для стандартной доставки
  }
}
```
**Что нужно исправить**: 
- Применить паттерн Strategy для разных типов доставки
- Создать отдельные классы для ExpressDelivery и StandardDelivery
- Использовать полиморфизм вместо условных конструкций
- Добавить типизацию для item
- Создать фабрику для создания нужного типа доставки

---

### 7. `processUserDataAndSendEmail.ts` - Нарушение Single Responsibility Principle
**Проблема**: Функция выполняет две разные операции.
```typescript
function processUserDataAndSendEmail(user: User) {
  // Обработка данных пользователя
  user.processData();

  // Отправка электронной почты
  emailService.sendEmail(user.email, 'Данные обработаны успешно');
}
```
**Что нужно исправить**: 
- Разделить на две отдельные функции
- Применить паттерн Observer для уведомлений
- Создать событийную архитектуру (Event-Driven)
- Использовать паттерн Mediator для координации операций
- Добавить обработку ошибок для каждой операции отдельно

---

### 8. `ScreenShare.ts` - Сложная логика управления состоянием
**Проблема**: Метод выполняет множество операций, неясная последовательность.
```typescript
class ScreenShare {
  startPresentationWithoutSound(mediaStream: MediaStream, isExistsAudioTracks: boolean) {
    this.stopPresentation();        // 1. Останавливаем
    this.startPresentation(mediaStream); // 2. Запускаем
    
    if (isExistsAudioTracks) {      // 3. Условно отключаем звук
      this.muteAudio();
    }
  }
}
```
**Что нужно исправить**: 
- Применить паттерн State Machine для управления состояниями презентации
- Разбить на атомарные операции
- Использовать паттерн Template Method для определения алгоритма
- Добавить валидацию состояний
- Создать четкий API для управления презентацией

---

### 9. `ServerApi.ts` - Нарушение принципа единообразия API
**Проблема**: Разные методы используют разные HTTP методы для похожих операций.
```typescript
class ServerApi {
  public processAddAccountRequest(url: string, account: TAccount) {
    return this.fetch('POST', url, account);
  }

  public sendDeleteAccountRequest(url: string, accountId: string) {
    return this.fetch('DELETE', url, accountId);
  }

  public requestAuth(url: string, credentials: TCredentials) {
    return this.fetch('GET', url, credentials); // GET с credentials?
  }
}
```
**Что нужно исправить**: 
- Привести к единому стилю именования методов
- Исправить неправильное использование HTTP методов
- Применить паттерн Builder для создания запросов
- Создать единую систему обработки ошибок
- Добавить типизацию для ответов
- Использовать паттерн Adapter для разных типов API

---

### 10. `updateUserInterests.ts` - Дублирование кода и нарушение DRY
**Проблема**: Два метода с почти идентичной логикой.
```typescript
const updateUserHandle = (handle) => {
  if (!isLoggedIn()) {
    toLoginPage();
    return;
  }
  
  const token = getToken();
  const headers = getHeaders(token);
  
  return fetch(`${domain}/v1/users/handle`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ handle }),
  });
};

const updateUserInterests = (interestUUIDs) => {
  if (!isLoggedIn()) {      // Дублирование
    toLoginPage();
    return;
  }
  
  const token = getToken();  // Дублирование
  const headers = getHeaders(token); // Дублирование
  
  return fetch(`${domain}/v1/users/interests`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ interestUUIDs }),
  });
};
```
**Что нужно исправить**: 
- Создать базовую функцию для авторизованных запросов
- Применить паттерн Template Method
- Использовать паттерн Decorator для добавления авторизации
- Создать класс ApiClient с методами высокого уровня
- Добавить обработку различных типов ошибок
- Применить паттерн Chain of Responsibility для middleware

---

### 11. `godObject.ts` - God Object антипаттерн
**Проблема**: Класс с слишком многими ответственностями.
```typescript
class UserManager {
  // Управление пользователями
  createUser(userData: any) { /* ... */ }
  
  // Email функциональность
  sendWelcomeEmail(email: string, name: string) { /* ... */ }
  
  // Логирование
  logInfo(message: string) { /* ... */ }
  
  // Статистика
  updateUserStatistics(action: string) { /* ... */ }
}
```
**Что нужно исправить**: 
- Разделить на отдельные сервисы (UserService, EmailService, Logger, StatisticsService)
- Применить паттерн Facade для координации
- Использовать dependency injection
- Создать четкие границы между доменами

---

### 12. `circularDependency.ts` - Circular Dependencies
**Проблема**: Классы имеют циклическую зависимость друг от друга.
```typescript
class OrderService {
  constructor() {
    this.customerService = new CustomerService(); // CustomerService зависит от OrderService
  }
}

class CustomerService {
  constructor() {
    this.orderService = new OrderService(); // Циклическая зависимость
  }
}
```
**Что нужно исправить**: 
- Использовать dependency injection
- Создать общий интерфейс или абстракцию
- Применить паттерн Observer для уведомлений
- Рассмотреть создание доменных событий

## Рекомендуемые паттерны для решения сложных проблем:

### Поведенческие паттерны:
- **Strategy** - для разных алгоритмов обработки
- **State Machine** - для управления сложными состояниями
- **Observer** - для событийной архитектуры
- **Command** - для инкапсуляции операций
- **Chain of Responsibility** - для последовательной обработки
- **Template Method** - для определения алгоритма с вариативными шагами

### Структурные паттерны:
- **Adapter** - для интеграции разных API
- **Decorator** - для добавления функциональности
- **Facade** - для упрощения сложных интерфейсов
- **Composite** - для работы с иерархическими структурами

### Порождающие паттерны:
- **Factory** - для создания объектов разных типов
- **Builder** - для создания сложных объектов
- **Abstract Factory** - для семейств связанных объектов

### Архитектурные принципы:
1. **Event-Driven Architecture** - для слабо связанных компонентов
2. **Dependency Injection** - для управления зависимостями
3. **CQRS** - для разделения команд и запросов
4. **Repository Pattern** - для абстракции доступа к данным
5. **Unit of Work** - для управления транзакциями

## Общие принципы рефакторинга сложного кода:
1. **Выделяйте общие паттерны** и создавайте абстракции
2. **Разбивайте сложную логику** на более мелкие, понятные части
3. **Используйте композицию** вместо наследования где возможно
4. **Применяйте инверсию зависимостей** для гибкости
5. **Создавайте четкие границы** между модулями
6. **Используйте типизацию** для самодокументирования кода
7. **Добавляйте comprehensive error handling**
8. **Применяйте принцип "Tell, Don't Ask"**
