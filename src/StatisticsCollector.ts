type TFormatType = 'bytes' | 'Mb';

class StatisticsCollector {
  sentUserVideoTraffic = 0;
  sentShareVideoTraffic = 0;
  isActiveAutoFormatTraffic = false;

  // трафик скорее всего отдельный, как и обработка у него, однако тут могу ошибаться
  getSentUserVideoTraffic(): number {
    const sentVideoTrafficInBytes = this.sentUserVideoTraffic;
    const formatType = this.isActiveAutoFormatTraffic ? 'Mb' : 'bytes';

    return this.formatTraffic(sentVideoTrafficInBytes, formatType);
  }

  // пропущена типизация
  getSentShareVideoTraffic(): number {
    const sentVideoTrafficInBytes = this.sentShareVideoTraffic;
    const formatType = this.isActiveAutoFormatTraffic ? 'Mb' : 'bytes';

    return this.formatTraffic(sentVideoTrafficInBytes, formatType);
  }

  // 1. пропущена типизация
  // 2. formatType не занесён внутрь метода, т.к. это чистая функция
  formatTraffic(trafficInBytes: number, formatType: TFormatType): number {
    switch (formatType) {
      case 'Mb':
        return trafficInBytes / 1_048_576;
      // 1. байты дефолтный формат
      // 2. если не укажем default, то потеряем трафик
      case 'bytes':
      default:
        return trafficInBytes;
    }
  }
}
