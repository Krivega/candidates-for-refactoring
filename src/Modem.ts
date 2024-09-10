/**
 * Что было плохо: Описание методов было неясным, что затрудняло понимание их работы и значений возвращаемых данных.
 * Что стало лучше: Добавлены подробные комментарии к каждому методу, поясняющие, что означает возвращаемое значение, как обрабатываются ошибки и что делать в случае неудачи.
 * 
 * Что было плохо: Интерфейс не указывал, как обрабатываются ошибки.
 * Что стало лучше: В комментариях указано, что методы могут выбрасывать ошибки в случае неудачи. Это улучшает обработку ошибок и делает код более надежным.
Уточнение возвращаемых значений:
 * 
 * Что было плохо: Неясно, что означают возвращаемые значения (например, пустая строка от recv).
 * Что стало лучше: Ясно указано, что означает пустое значение для recv и getConnectedPhoneNumber.
 */

interface Modem {
  /**
   * Attempts to dial a phone number.
   * @param phoneNumber The phone number to dial.
   * @returns true if the dialing was successful, false otherwise.
   * @throws Error if dialing fails due to an internal issue.
   */
  dial(phoneNumber: string): boolean;

  /**
   * Disconnects the modem.
   * @returns true if the disconnection was successful, false otherwise.
   * @throws Error if disconnection fails.
   */
  disconnect(): boolean;

  /**
   * Sends a character over the modem.
   * @param c The character to send.
   * @returns true if the sending was successful, false otherwise.
   * @throws Error if sending fails.
   */
  send(c: string): boolean;

  /**
   * Receives a string from the modem.
   * @returns The received string. If no data is available, an empty string is returned.
   * @throws Error if receiving fails.
   */
  recv(): string;

  /**
   * Gets the phone number the modem is currently connected to.
   * @returns The connected phone number. If not connected, returns an empty string.
   */
  getConnectedPhoneNumber(): string;
}
