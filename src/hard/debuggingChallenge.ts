// Тестовый пример для проверки навыков чтения кода и дебаггинга
// Содержит: сложную логику, промисы, стек вызовов, движение данных

interface UserData {
  id: string;
  name: string;
  email: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

class DataProcessor {
  private cache = new Map<string, any>();
  private processingQueue: string[] = [];
  
  constructor(private apiClient: ApiClient) {}
  
  async processUserData(userId: string): Promise<UserData | null> {
    console.log(`Starting processing for user: ${userId}`);
    
    try {
      // Шаг 1: Проверяем кэш
      const cached = this.checkCache(userId);
      if (cached) {
        console.log('Cache hit');
        return cached;
      }
      
      // Шаг 2: Добавляем в очередь обработки
      this.addToQueue(userId);
      
      // Шаг 3: Получаем базовые данные пользователя
      const userData = await this.fetchUserData(userId);
      if (!userData) {
        this.removeFromQueue(userId);
        return null;
      }
      
      // Шаг 4: Обогащаем данные
      const enrichedData = await this.enrichUserData(userData);
      
      // Шаг 5: Валидируем и нормализуем
      const processedData = await this.validateAndNormalize(enrichedData);
      
      // Шаг 6: Сохраняем в кэш
      this.saveToCache(userId, processedData);
      
      this.removeFromQueue(userId);
      console.log(`Processing completed for user: ${userId}`);
      
      return processedData;
      
    } catch (error) {
      console.error(`Error processing user ${userId}:`, error);
      this.removeFromQueue(userId);
      return null;
    }
  }
  
  private checkCache(userId: string): UserData | null {
    const cacheKey = `user_${userId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    
    if (cached) {
      this.cache.delete(cacheKey);
    }
    
    return null;
  }
  
  private isCacheValid(timestamp: number): boolean {
    const CACHE_TTL = 5 * 60 * 1000; // 5 минут
    return Date.now() - timestamp < CACHE_TTL;
  }
  
  private addToQueue(userId: string): void {
    if (!this.processingQueue.includes(userId)) {
      this.processingQueue.push(userId);
      console.log(`Added to queue: ${userId}. Queue length: ${this.processingQueue.length}`);
    }
  }
  
  private removeFromQueue(userId: string): void {
    const index = this.processingQueue.indexOf(userId);
    if (index > -1) {
      this.processingQueue.splice(index, 1);
      console.log(`Removed from queue: ${userId}. Queue length: ${this.processingQueue.length}`);
    }
  }
  
  private async fetchUserData(userId: string): Promise<UserData | null> {
    console.log(`Fetching user data for: ${userId}`);
    
    const response = await this.apiClient.getUser(userId);
    
    if (response.status === 'error') {
      console.error(`API error: ${response.message}`);
      return null;
    }
    
    return response.data;
  }
  
  private async enrichUserData(userData: UserData): Promise<UserData> {
    console.log(`Enriching data for user: ${userData.id}`);
    
    // Параллельно получаем дополнительные данные
    const [preferences, metadata] = await Promise.all([
      this.fetchUserPreferences(userData.id),
      this.fetchUserMetadata(userData.id)
    ]);
    
    return {
      ...userData,
      preferences: preferences || userData.preferences,
      // metadata будет добавлен в следующих версиях
    };
  }
  
  private async fetchUserPreferences(userId: string): Promise<UserData['preferences'] | null> {
    try {
      console.log(`Fetching preferences for: ${userId}`);
      
      const response = await this.apiClient.getUserPreferences(userId);
      
      if (response.status === 'success') {
        return response.data;
      }
      
      console.warn(`Failed to fetch preferences for ${userId}: ${response.message}`);
      return null;
      
    } catch (error) {
      console.error(`Error fetching preferences for ${userId}:`, error);
      return null;
    }
  }
  
  private async fetchUserMetadata(userId: string): Promise<any> {
    try {
      console.log(`Fetching metadata for: ${userId}`);
      
      // Имитируем медленный API вызов
      await this.delay(Math.random() * 1000);
      
      const response = await this.apiClient.getUserMetadata(userId);
      
      if (response.status === 'success') {
        console.log(`Metadata fetched for ${userId}`);
        return response.data;
      }
      
      return {};
      
    } catch (error) {
      console.warn(`Metadata fetch failed for ${userId}:`, error);
      return {};
    }
  }
  
  private async validateAndNormalize(userData: UserData): Promise<UserData> {
    console.log(`Validating data for user: ${userData.id}`);
    
    // Валидация email
    if (!this.isValidEmail(userData.email)) {
      throw new Error(`Invalid email for user ${userData.id}: ${userData.email}`);
    }
    
    // Нормализация данных
    const normalized: UserData = {
      id: userData.id,
      name: this.normalizeName(userData.name),
      email: userData.email.toLowerCase(),
      preferences: {
        notifications: userData.preferences.notifications,
        theme: userData.preferences.theme || 'light',
        language: userData.preferences.language || 'en'
      }
    };
    
    console.log(`Data validated and normalized for user: ${userData.id}`);
    return normalized;
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  private normalizeName(name: string): string {
    return name
      .trim()
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
  
  private saveToCache(userId: string, data: UserData): void {
    const cacheKey = `user_${userId}`;
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    console.log(`Saved to cache: ${userId}`);
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Публичный метод для получения статистики
  getProcessingStats() {
    return {
      queueLength: this.processingQueue.length,
      cacheSize: this.cache.size,
      currentlyProcessing: [...this.processingQueue]
    };
  }
}

class ApiClient {
  private baseUrl = 'https://api.example.com';
  private requestCount = 0;
  
  async getUser(userId: string): Promise<ApiResponse<UserData>> {
    await this.delay(200 + Math.random() * 300);
    this.requestCount++;
    
    console.log(`API Request #${this.requestCount}: GET /users/${userId}`);
    
    // Имитируем различные ответы API
    if (userId === 'user-404') {
      return {
        status: 'error',
        message: 'User not found',
        data: null as any
      };
    }
    
    if (userId === 'user-error' && Math.random() > 0.5) {
      throw new Error('Network error');
    }
    
    return {
      status: 'success',
      data: {
        id: userId,
        name: `User ${userId}`,
        email: `${userId}@example.com`,
        preferences: {
          notifications: true,
          theme: 'light',
          language: 'en'
        }
      }
    };
  }
  
  async getUserPreferences(userId: string): Promise<ApiResponse<UserData['preferences']>> {
    await this.delay(100 + Math.random() * 200);
    this.requestCount++;
    
    console.log(`API Request #${this.requestCount}: GET /users/${userId}/preferences`);
    
    if (userId.includes('premium')) {
      return {
        status: 'success',
        data: {
          notifications: false,
          theme: 'dark',
          language: 'ru'
        }
      };
    }
    
    return {
      status: 'success',
      data: {
        notifications: true,
        theme: 'light',
        language: 'en'
      }
    };
  }
  
  async getUserMetadata(userId: string): Promise<ApiResponse<any>> {
    await this.delay(300 + Math.random() * 500);
    this.requestCount++;
    
    console.log(`API Request #${this.requestCount}: GET /users/${userId}/metadata`);
    
    return {
      status: 'success',
      data: {
        lastLogin: new Date().toISOString(),
        accountType: userId.includes('premium') ? 'premium' : 'free',
        region: 'us-east-1'
      }
    };
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  getRequestCount(): number {
    return this.requestCount;
  }
}

// Функция для тестирования
async function testScenario() {
  const apiClient = new ApiClient();
  const processor = new DataProcessor(apiClient);
  
  console.log('=== Starting test scenario ===');
  
  // Сценарий 1: Обычная обработка
  const result1 = await processor.processUserData('user-123');
  console.log('Result 1:', result1);
  
  // Сценарий 2: Повторный запрос (должен использовать кэш)
  const result2 = await processor.processUserData('user-123');
  console.log('Result 2:', result2);
  
  // Сценарий 3: Премиум пользователь
  const result3 = await processor.processUserData('premium-user-456');
  console.log('Result 3:', result3);
  
  // Сценарий 4: Несуществующий пользователь
  const result4 = await processor.processUserData('user-404');
  console.log('Result 4:', result4);
  
  // Сценарий 5: Параллельная обработка
  console.log('=== Parallel processing ===');
  const promises = [
    processor.processUserData('parallel-user-1'),
    processor.processUserData('parallel-user-2'),
    processor.processUserData('parallel-user-3')
  ];
  
  const results = await Promise.allSettled(promises);
  console.log('Parallel results:', results);
  
  // Статистика
  console.log('=== Final stats ===');
  console.log('Processing stats:', processor.getProcessingStats());
  console.log('API requests made:', apiClient.getRequestCount());
}

// Экспорт для тестирования
export { DataProcessor, ApiClient, testScenario };
