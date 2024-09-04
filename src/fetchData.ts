const DEFAULT_TIMEOUT = 5000;

function fetchData(url: string) {
  const controller = new AbortController();
  const signal = controller.signal;
  const tmr = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  // Используем значение по умолчанию для таймаута
  // впервые слышу про свойство timeout
  fetch(url, { signal })
    .then((response) => console.log(response))
    .catch((error) => console.error(error))
    .finally(() => clearTimeout(tmr));
}
