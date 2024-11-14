export class DomEventEmitter {
  static eventMap: { [name: string]: any[] } = {};

  static emit(eventName: string, detail?: any) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  static on(eventName: string, func: any) {
    if (!DomEventEmitter.eventMap[eventName]) {
      DomEventEmitter.eventMap[eventName] = [];
    }

    window.addEventListener(eventName, func);
    DomEventEmitter.eventMap[eventName].push(func);
  }

  static off(eventName: string, func: any) {
    window.removeEventListener(eventName, func);

    if (!DomEventEmitter.eventMap[eventName]) {
      return;
    }

    // clear
    const index = DomEventEmitter.eventMap[eventName].findIndex((x) => x === func);
    if (index !== -1) {
      DomEventEmitter.eventMap[eventName].splice(index, 1);
    }
  }

  static removeEventListeners(eventName: string) {
    const allTheListeners = [...DomEventEmitter.eventMap[eventName]];
    allTheListeners.forEach((x) => {
      DomEventEmitter.off(eventName, x);
    });
  }

  static removeAllEventListeners() {
    const events = Object.keys(DomEventEmitter.eventMap);
    for (let i = 0; i < events.length; i++) {
      DomEventEmitter.removeEventListeners(events[i]);
    }
  }

  static removeEventListener = DomEventEmitter.off;
  static addEventListener = DomEventEmitter.on;
}
