/**
 * Что было плохо: Класс Director напрямую зависел от конкретной реализации календаря.
 * Что стало лучше: Введение интерфейса ICalendar снижает связанность и улучшает гибкость системы. Теперь класс Director работает через интерфейс, что позволяет заменять реализацию календаря без необходимости изменения в классе Director.
 *
 * Что было плохо: Параметр event не был типизирован.
 * Что стало лучше: Введен класс CalendarEvent, который типизирует события.
 */

interface ICalendar {
  addEvent(event: CalendarEvent): void;
}

class CalendarEvent {
  title: string;
  date: Date;

  constructor(title: string, date: Date) {
    this.title = title;
    this.date = date;
  }
}

class Calendar implements ICalendar {
  addEvent(event: CalendarEvent): void {
    // some logic to add event
  }
}

class Director {
  private calendar: ICalendar;

  constructor(calendar: ICalendar) {
    this.calendar = calendar;
  }

  scheduleMeeting(event: CalendarEvent): void {
    this.calendar.addEvent(event);
  }
}

const calendar = new Calendar();
const director = new Director(calendar);
const projectMeetingEvent = new CalendarEvent('Project Meeting', new Date());

director.scheduleMeeting(projectMeetingEvent);
