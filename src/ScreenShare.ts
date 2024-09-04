class ScreenShare {
  startPresentationWithoutSound(mediaStream: MediaStream) {
    // Наверное методу не нужно перезапускать презентацию, если от этого не зависит отключение звука
    // this.stopPresentation();

    // Если аудио есть или его нет в потоке, это не должно влиять на воспроизведение
    this.muteAudio();
    // И лучше когда в таком порядке (вкусовщина/ux)
    this.startPresentation(mediaStream);
  }

  stopPresentation() {}
  startPresentation(mediaStream: MediaStream) {}
  muteAudio() {}
}
