/**
 * Что было плохо: Конструктор с множеством параметров был сложным и неудобным для использования.
 * Что стало лучше: Введен объект конфигурации для передачи параметров.
 */

interface UserConfig {
  name: string;
  age: number;
  address: string;
  phoneNumber: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  isPremium: boolean;
  lastLogin: Date;
  registrationDate: Date;
  profilePicture: string;
  bio: string;
  interests: string[];
}

class User {
  private name: string;
  private age: number;
  private address: string;
  private phoneNumber: string;
  private email: string;
  private role: string;
  private isActive: boolean;
  private isVerified: boolean;
  private isPremium: boolean;
  private lastLogin: Date;
  private registrationDate: Date;
  private profilePicture: string;
  private bio: string;
  private interests: string[];

  constructor(config: UserConfig) {
    this.name = config.name;
    this.age = config.age;
    this.address = config.address;
    this.phoneNumber = config.phoneNumber;
    this.email = config.email;
    this.role = config.role;
    this.isActive = config.isActive;
    this.isVerified = config.isVerified;
    this.isPremium = config.isPremium;
    this.lastLogin = config.lastLogin;
    this.registrationDate = config.registrationDate;
    this.profilePicture = config.profilePicture;
    this.bio = config.bio;
    this.interests = config.interests ?? [];
  }

  // ... (other methods)
}
