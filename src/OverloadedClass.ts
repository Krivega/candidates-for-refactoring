/**
 * Что было плохо: Один класс содержал слишком много полей, что делало его сложным и трудно поддерживаемым.
 * Что стало лучше: Введены вспомогательные классы DateRange и NumericFields, которые группируют связанные поля.
 *
 * Что было плохо: Поля класса OverloadedClass не были организованы и было сложно понять их назначение.
 * Что стало лучше: Поля были сгруппированы в отдельные классы и объекты.
 *
 * Что было плохо: Наличие большого числа отдельных полей усложняло понимание и управление данными.
 * Что стало лучше: Поля объединены в более логичные группы, что упрощает работу с ними и улучшает организацию данных.
 */

class DateRange {
  startDate: Date;
  endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

class NumericFields {
  field1: number;
  field2: number;
  field3: number;
  field4: number;
  field5: number;

  constructor(field1: number, field2: number, field3: number, field4: number, field5: number) {
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.field5 = field5;
  }
}

class OverloadedClass {
  stringField: string;
  booleanField: boolean;
  dateRange: DateRange;
  numericFields: NumericFields;

  constructor(
    stringField: string,
    booleanField: boolean,
    dateRange: DateRange,
    numericFields: NumericFields,
  ) {
    this.stringField = stringField;
    this.booleanField = booleanField;
    this.dateRange = dateRange;
    this.numericFields = numericFields;
  }
}
