import { setupSessionHandler } from "./sessionHandler";

export function init(eventBus: EventTarget) {
  setupSessionHandler(eventBus);
}
