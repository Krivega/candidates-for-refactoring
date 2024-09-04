// StringBuffer считаем что определен выше, посколько уже используются
// Отсутствует типизация у функции
const render = (size: number): string => {
  const html = new StringBuffer('<hr');

  if (size > 0) {
    html
      .append(' size="')
      // запись подразумевается в строчном формате?
      .append(`${size + 1}`)
      .append('"');
  }

  html.append('>');

  return html.toString();
};
