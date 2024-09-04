// Код который никогда не используется, как правило/исходя из чистого кода, не должен сохраняться.
// Однако,
// 1. если от функциональности не отказались, а лишь заморозили,
//        практика показывает, что комментирование с последующим удалением более практичный вариант
// 2. возможно код пропущен/скрыт намерено во время разработки, дабы не "мешать" разработчику,
//        Но его забыли вернуть назад и в там виде был пропущен на ревью
class SomeClass {
  // private neverUsedMethod() {
  //     console.log("This function is called");
  // }

  public someMethod() {
    //   if (false) {
    //       doSomethingThatNeverHappens();
    //   }

      try {
        // пропущен this
          this.doSomethingSafe();
      } catch (Exception e) {
          e.printStackTrace();
      }
  }

  private doSomethingSafe() {
     console.log('Safe operation')
  }
}
