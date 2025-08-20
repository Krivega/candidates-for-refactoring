// Практические сценарии для тестирования навыков дебаггинга
// Каждый сценарий содержит конкретную проблему для анализа

// СЦЕНАРИЙ 1: Проблема с Promise.all и обработкой ошибок
export async function scenarioPromiseAllError() {
  const apiClient = {
    async getData(id: string) {
      if (id === 'fail') throw new Error('API Error');
      return { data: `Data for ${id}` };
    }
  };
  
  try {
    // Проблема: один неудачный запрос убивает все
    const results = await Promise.all([
      apiClient.getData('user1'),
      apiClient.getData('fail'),  // Этот запрос упадет
      apiClient.getData('user3')
    ]);
    
    return results;
  } catch (error) {
    console.error('All requests failed because of one error:', error);
    return null; // Теряем все данные из-за одной ошибки
  }
}

// СЦЕНАРИЙ 2: Race condition в кэше
export class CacheRaceCondition {
  private cache = new Map<string, any>();
  private loading = new Set<string>();
  
  async getData(key: string): Promise<any> {
    // Проблема: несколько запросов для одного ключа могут выполняться параллельно
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    if (this.loading.has(key)) {
      // Ждем, но как долго? Что если первый запрос упадет?
      await this.waitForLoading(key);
      return this.cache.get(key);
    }
    
    this.loading.add(key);
    
    try {
      const data = await this.fetchData(key);
      this.cache.set(key, data);
      return data;
    } finally {
      this.loading.delete(key);
    }
  }
  
  private async fetchData(key: string): Promise<any> {
    // Имитируем медленный API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { key, data: `Data for ${key}`, timestamp: Date.now() };
  }
  
  private async waitForLoading(key: string): Promise<void> {
    // Проблема: бесконечное ожидание если первый запрос упадет
    while (this.loading.has(key)) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

// СЦЕНАРИЙ 3: Утечка памяти в event listeners
export class MemoryLeakScenario {
  private eventHandlers = new Map<string, Function[]>();
  private timers: NodeJS.Timeout[] = [];
  
  subscribe(event: string, handler: Function) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    this.eventHandlers.get(event)!.push(handler);
    
    // Проблема: таймеры не очищаются при unsubscribe
    const timer = setInterval(() => {
      this.emit(event, { timestamp: Date.now() });
    }, 1000);
    
    this.timers.push(timer);
  }
  
  unsubscribe(event: string, handler: Function) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
      
      // Проблема: не удаляем пустые массивы и не очищаем таймеры
      if (handlers.length === 0) {
        // this.eventHandlers.delete(event); // Забыли удалить
        // Забыли очистить соответствующие таймеры
      }
    }
  }
  
  private emit(event: string, data: any) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error('Handler error:', error);
        }
      });
    }
  }
  
  // Метод для очистки (который никто не вызывает)
  cleanup() {
    this.timers.forEach(timer => clearInterval(timer));
    this.timers = [];
    this.eventHandlers.clear();
  }
}

// СЦЕНАРИЙ 4: Проблемы с async/await в циклах
export async function asyncLoopProblems(userIds: string[]) {
  const results = [];
  
  // ПРОБЛЕМА 1: Последовательное выполнение вместо параллельного
  console.log('Sequential processing (slow):');
  for (const userId of userIds) {
    const userData = await fetchUserData(userId); // Ждем каждый запрос
    results.push(userData);
  }
  
  // ПРОБЛЕМА 2: Неправильное использование forEach с async
  console.log('forEach with async (doesn\'t wait):');
  const forEachResults: any[] = [];
  userIds.forEach(async (userId) => {
    const userData = await fetchUserData(userId);
    forEachResults.push(userData); // Порядок не гарантирован
  });
  // Функция завершится до выполнения всех запросов!
  
  return { results, forEachResults };
}

async function fetchUserData(userId: string) {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  return { userId, data: `Data for ${userId}` };
}

// СЦЕНАРИЙ 5: Проблемы с контекстом this в callbacks
export class ThisContextProblem {
  private data = 'Important data';
  private callbacks: Function[] = [];
  
  addCallback(callback: Function) {
    this.callbacks.push(callback);
  }
  
  processData() {
    console.log('Processing:', this.data);
    
    // Проблема: потеря контекста this в setTimeout
    setTimeout(function() {
      // this здесь не указывает на экземпляр класса
      console.log('Processed:', this.data); // undefined!
      
      this.callbacks.forEach(callback => {
        callback(this.data); // Ошибка!
      });
    }, 1000);
  }
  
  processDataCorrect() {
    console.log('Processing:', this.data);
    
    // Правильное решение: стрелочная функция или bind
    setTimeout(() => {
      console.log('Processed:', this.data);
      
      this.callbacks.forEach(callback => {
        callback(this.data);
      });
    }, 1000);
  }
}

// СЦЕНАРИЙ 6: Проблемы с замыканиями в циклах
export function closureProblem() {
  const buttons = [];
  
  // Проблема: все обработчики будут иметь i = 3
  for (var i = 0; i < 3; i++) {
    buttons.push({
      id: i,
      onClick: function() {
        console.log('Button clicked:', i); // Всегда будет 3!
      }
    });
  }
  
  // Правильное решение 1: let вместо var
  const buttonsCorrect1 = [];
  for (let i = 0; i < 3; i++) {
    buttonsCorrect1.push({
      id: i,
      onClick: function() {
        console.log('Button clicked:', i); // Правильное значение
      }
    });
  }
  
  // Правильное решение 2: замыкание с IIFE
  const buttonsCorrect2 = [];
  for (var i = 0; i < 3; i++) {
    buttonsCorrect2.push({
      id: i,
      onClick: (function(index) {
        return function() {
          console.log('Button clicked:', index);
        };
      })(i)
    });
  }
  
  return { buttons, buttonsCorrect1, buttonsCorrect2 };
}

// СЦЕНАРИЙ 7: Проблемы с обработкой ошибок в промисах
export async function errorHandlingProblems() {
  // Проблема 1: Неперехваченная ошибка в промисе
  Promise.resolve()
    .then(() => {
      throw new Error('Unhandled error');
    })
    // .catch() // Забыли добавить обработчик
  ;
  
  // Проблема 2: Ошибка в async функции без try-catch
  const processAsync = async () => {
    const data = await fetch('/api/data'); // Может упасть
    return data.json(); // Тоже может упасть
  };
  
  // Проблема 3: Смешивание стилей обработки ошибок
  try {
    const result = await processAsync()
      .then(data => data.result)
      .catch(error => {
        console.error(error);
        return null; // Возвращаем null, но try-catch этого не знает
      });
    
    return result.toUpperCase(); // Ошибка если result === null
  } catch (error) {
    console.error('This might not catch all errors:', error);
  }
}

// Функции для тестирования сценариев
export const testScenarios = {
  async testPromiseAll() {
    console.log('=== Testing Promise.all error handling ===');
    const result = await scenarioPromiseAllError();
    console.log('Result:', result);
  },
  
  async testCacheRaceCondition() {
    console.log('=== Testing cache race condition ===');
    const cache = new CacheRaceCondition();
    
    // Запускаем несколько запросов одновременно
    const promises = [
      cache.getData('user1'),
      cache.getData('user1'), // Тот же ключ
      cache.getData('user1')  // Тот же ключ
    ];
    
    const results = await Promise.all(promises);
    console.log('Results:', results);
  },
  
  testMemoryLeak() {
    console.log('=== Testing memory leak ===');
    const eventManager = new MemoryLeakScenario();
    
    const handler1 = (data: any) => console.log('Handler 1:', data);
    const handler2 = (data: any) => console.log('Handler 2:', data);
    
    eventManager.subscribe('test', handler1);
    eventManager.subscribe('test', handler2);
    
    setTimeout(() => {
      eventManager.unsubscribe('test', handler1);
      // Таймеры все еще работают!
    }, 2000);
    
    // Никто не вызывает cleanup()
  },
  
  async testAsyncLoops() {
    console.log('=== Testing async loops ===');
    const userIds = ['user1', 'user2', 'user3'];
    
    console.time('async loop');
    const results = await asyncLoopProblems(userIds);
    console.timeEnd('async loop');
    
    console.log('Results:', results);
  },
  
  testThisContext() {
    console.log('=== Testing this context ===');
    const processor = new ThisContextProblem();
    
    processor.addCallback((data: string) => {
      console.log('Callback received:', data);
    });
    
    console.log('Wrong way:');
    processor.processData();
    
    setTimeout(() => {
      console.log('Correct way:');
      processor.processDataCorrect();
    }, 2000);
  },
  
  testClosures() {
    console.log('=== Testing closures ===');
    const { buttons, buttonsCorrect1, buttonsCorrect2 } = closureProblem();
    
    console.log('Wrong buttons:');
    buttons.forEach(btn => btn.onClick());
    
    console.log('Correct buttons (let):');
    buttonsCorrect1.forEach(btn => btn.onClick());
    
    console.log('Correct buttons (IIFE):');
    buttonsCorrect2.forEach(btn => btn.onClick());
  },
  
  async testErrorHandling() {
    console.log('=== Testing error handling ===');
    try {
      await errorHandlingProblems();
    } catch (error) {
      console.error('Caught error:', error);
    }
  }
};
