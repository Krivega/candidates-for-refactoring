// God Object - класс с слишком многими ответственностями
class UserManager {
  private users: any[] = [];
  private emailService: any;
  private logger: any;
  private validator: any;
  
  // Управление пользователями
  createUser(userData: any) {
    // Валидация данных
    if (!userData.email || !userData.name) {
      this.logError('Invalid user data');
      throw new Error('Invalid user data');
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      this.logError('Invalid email format');
      throw new Error('Invalid email format');
    }
    
    // Создание пользователя
    const user = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date(),
      isActive: true
    };
    
    this.users.push(user);
    
    // Отправка приветственного email
    this.sendWelcomeEmail(user.email, user.name);
    
    // Логирование
    this.logInfo(`User created: ${user.id}`);
    
    // Обновление статистики
    this.updateUserStatistics('created');
    
    return user;
  }
  
  // Email функциональность
  sendWelcomeEmail(email: string, name: string) {
    const template = this.getEmailTemplate('welcome');
    const html = this.renderEmailTemplate(template, { name });
    this.sendEmail(email, 'Welcome!', html);
  }
  
  sendEmail(to: string, subject: string, html: string) {
    // Логика отправки email
  }
  
  getEmailTemplate(type: string) {
    // Получение шаблона
  }
  
  renderEmailTemplate(template: string, data: any) {
    // Рендер шаблона
  }
  
  // Логирование
  logInfo(message: string) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }
  
  logError(message: string) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }
  
  // Утилиты
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  // Статистика
  updateUserStatistics(action: string) {
    // Обновление статистики
  }
  
  getUserStatistics() {
    return {
      total: this.users.length,
      active: this.users.filter(u => u.isActive).length
    };
  }
  
  // CRUD операции
  getUser(id: string) {
    return this.users.find(u => u.id === id);
  }
  
  updateUser(id: string, updates: any) {
    const user = this.getUser(id);
    if (user) {
      Object.assign(user, updates);
      this.logInfo(`User updated: ${id}`);
    }
  }
  
  deleteUser(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      this.logInfo(`User deleted: ${id}`);
    }
  }
  
  // Поиск и фильтрация
  searchUsers(query: string) {
    return this.users.filter(u => 
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  filterUsersByStatus(isActive: boolean) {
    return this.users.filter(u => u.isActive === isActive);
  }
}
