const eventEmitter = new EventTarget();

export const activeRequests = new Map<string, AbortController>();

export function deleteActiveRequest(id: string) {
  activeRequests.delete(id);
}

export default eventEmitter;
