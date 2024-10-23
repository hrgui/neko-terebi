import eventEmitter from "./eventEmitter";

export const fetchAsEventsToPromise = async function ({
  fetchEventName,
  responseEventName,
  props,
}: any) {
  const promise = new Promise((resolve, reject) =>
    eventEmitter.once(responseEventName, async (data, response, error) => {
      if (response.ok) {
        resolve(data);
      } else {
        reject(error);
      }
    })
  );

  eventEmitter.emit(fetchEventName, ...props);

  return promise;
};
