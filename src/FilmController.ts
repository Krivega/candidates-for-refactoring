/**
 * Что было плохо: Поле popupOpened могло не синхронизироваться с реальным состоянием всплывающего окна.
 * Что стало лучше: Логика открытия и закрытия окна инкапсулирована в объекте Popup. Контроллер теперь вызывает соответствующие методы, и проверка состояния окна происходит через метод isOpen, что обеспечивает синхронизацию состояния.
 *
 * Что было плохо: Класс FilmController был жестко связан с реализацией Popup.
 * Что стало лучше: Введен интерфейс IPopup, что позволяет использовать любую реализацию всплывающего окна.
 *
 * Что было плохо: Поле popupOpened могло не отражать реальное состояние окна.
 * Что стало лучше: Проверка состояния окна теперь производится через методы объекта Popup.
 */

interface IPopup {
  open(): void;
  close(): void;
  isOpen(): boolean;
}

class Popup implements IPopup {
  private opened: boolean = false;

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
  }

  public isOpen(): boolean {
    return this.opened;
  }
}

class FilmController {
  private popup: IPopup;

  constructor(popup: IPopup) {
    this.popup = popup;
  }

  public openDetails(): void {
    this.popup.open();
  }

  public closeDetails(): void {
    this.popup.close();
  }

  public isPopupOpened(): boolean {
    return this.popup.isOpen();
  }
}

const popup = new Popup();
const filmController = new FilmController(popup);

filmController.openDetails();
console.log(filmController.isPopupOpened()); // true

filmController.closeDetails();
console.log(filmController.isPopupOpened()); // false
