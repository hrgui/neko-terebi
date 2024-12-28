import eventBus, { deleteActiveRequest } from "./eventEmitter";

interface FetchDataWithPromiseParams {
  id: string;
  requestEventName: string;
  responseEventName: string;
  errorEventName: string;
  cancelEventName: string;
  requestParams: any;
}

export function fetchAsEventsToPromise({
  id,
  requestEventName,
  responseEventName,
  errorEventName,
  cancelEventName,
  requestParams,
}: FetchDataWithPromiseParams): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const handleResponse = (event: Event) => {
      const detail = (event as CustomEvent<any>).detail;
      if (detail.id === id) {
        resolve(detail.data);
        cleanup();
      }
    };

    const handleError = (event: Event) => {
      const detail = (event as CustomEvent<any>).detail;
      if (detail.id === id) {
        reject(detail.error);
        cleanup();
      }
    };

    const handleCancel = (event: Event) => {
      const detail = (event as CustomEvent<any>).detail;
      if (detail.id === id) {
        reject(new Error(`${cancelEventName}: Request for ${id} was canceled`));
        cleanup();
      }
    };

    const cleanup = () => {
      eventBus.removeEventListener(responseEventName, handleResponse);
      eventBus.removeEventListener(errorEventName, handleError);
      eventBus.removeEventListener(cancelEventName, handleCancel);
      deleteActiveRequest(id);
    };

    // Add event listeners
    eventBus.addEventListener(responseEventName, handleResponse);
    eventBus.addEventListener(errorEventName, handleError);
    eventBus.addEventListener(cancelEventName, handleCancel);

    // Dispatch the fetch request
    eventBus.dispatchEvent(
      new CustomEvent<any>(requestEventName, { detail: { id, params: requestParams } })
    );
  });
}
