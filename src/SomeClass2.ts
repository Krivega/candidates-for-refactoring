class SomeClass2 {
  // private unusedVariable: number;

  // constructor() {
  //   console.log('Constructor is unnecessary if not initializing anything');
  // }
//судя по всему этот метод лишний, неиспользуемый - ценности нет, только байты памяти занимает
  public someMethod(): void {
    console.log('This method performs a useful action');
  }
}
