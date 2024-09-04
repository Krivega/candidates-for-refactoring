// 1. отсутствует типизация
// 2. происходит зацикливание и подаваемые аргументы не соответствуют ожидаемым аргументам
// 3. отсутствуют методы getComment и createComment,
//      возможно класс будет использоваться из-вне для расширения функционала,
//      тогда метод updateComment лучше переименовать дабы избежать конфликтов
type TComment<T = {}, K = number> = T & { id: K };

class Some<T extends TComment> implements ISome<T> {
  getComment(id: T['id']): T {}
  createComment(c: T): T {}
  updateComment(id: T['id'], c: T): T {}

  // не совсем понятно что должен возвращать метод, ввиду отсутствия какой-либо сигнатуры
  addComment(comment: T): T {
    if (this.getComment(comment.id)) {
      return this.updateComment(comment.id, comment);
    }

    return this.createComment(comment);
  }
}

/*
в старом варианте пройдёт такой вариант использования, однако из него достаточно функции
function updateComment(comment: TComment) {
  if (this.getComment(comment.id)) {
    this.updateComment(comment.id, comment);
  }

  this.createComment(comment);
}

class CommentList {
    comments = new Map()

    add = updateComment

    getComment(id) { return this.comments.get(id) }
    createComment(comment) { this.comments.set(comment.id, comment)}
    updateComment(id, comment) { this.comments.set(id, comment) }
}
* */
