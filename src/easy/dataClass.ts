// Data Class - класс только с геттерами и сеттерами, без логики
class PersonData {
  private firstName: string;
  private lastName: string;
  private age: number;
  private email: string;
  private phone: string;
  
  constructor(firstName: string, lastName: string, age: number, email: string, phone: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.phone = phone;
  }
  
  getFirstName(): string {
    return this.firstName;
  }
  
  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  
  getLastName(): string {
    return this.lastName;
  }
  
  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  
  getAge(): number {
    return this.age;
  }
  
  setAge(age: number): void {
    this.age = age;
  }
  
  getEmail(): string {
    return this.email;
  }
  
  setEmail(email: string): void {
    this.email = email;
  }
  
  getPhone(): string {
    return this.phone;
  }
  
  setPhone(phone: string): void {
    this.phone = phone;
  }
}

// Использование Data Class в другом месте
class PersonService {
  formatPersonInfo(person: PersonData): string {
    // Вся логика находится вне PersonData
    const fullName = person.getFirstName() + ' ' + person.getLastName();
    const isAdult = person.getAge() >= 18;
    const contactInfo = `${person.getEmail()} | ${person.getPhone()}`;
    
    return `${fullName} (${isAdult ? 'Adult' : 'Minor'}) - ${contactInfo}`;
  }
  
  validatePerson(person: PersonData): boolean {
    // Валидация тоже вне PersonData
    return person.getFirstName().length > 0 && 
           person.getLastName().length > 0 &&
           person.getAge() > 0 &&
           person.getEmail().includes('@');
  }
}
