// Исключительно собрал переменные в один объект, которым проще оперировать
interface IUser {
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
  private info: IUser;

  // Интерфейс конструктора не менял, что бы всё что с ним связано не сломалось
  constructor(
    name: string,
    age: number,
    address: string,
    phoneNumber: string,
    email: string,
    role: string,
    isActive: boolean,
    isVerified: boolean,
    isPremium: boolean,
    lastLogin: Date,
    registrationDate: Date,
    profilePicture: string,
    bio: string,
    interests: string[],
  ) {
    this.info = {
      name,
      age,
      address,
      phoneNumber,
      email,
      role,
      isActive,
      isVerified,
      isPremium,
      lastLogin,
      registrationDate,
      profilePicture,
      bio,
      interests,
    };
  }

  // ... (other methods)
}
