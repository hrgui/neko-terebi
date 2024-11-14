import { DomEventEmitter } from "../DomEventEmitter";

describe("DomEventEmitter", () => {
  afterEach(() => {
    DomEventEmitter.removeAllEventListeners();
  });

  describe("emit / on", () => {
    it("should emit without issues and a listener should be called", () => {
      const x = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalled();
    });
  });

  describe("off", () => {
    it("should no longer listen after off is called", () => {
      const x = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalled();

      DomEventEmitter.off("test", x);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
    });

    it("y should no longer listen after off is called", () => {
      const x = vi.fn();
      const y = vi.fn();
      const z = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.on("test", y);
      DomEventEmitter.on("test", z);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);

      DomEventEmitter.off("test", y);
      DomEventEmitter.emit("test");

      expect(x).toHaveBeenCalledTimes(2);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(2);
    });

    it("x should no longer listen after off is called", () => {
      const x = vi.fn();
      const y = vi.fn();
      const z = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.on("test", y);
      DomEventEmitter.on("test", z);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);

      DomEventEmitter.off("test", x);
      DomEventEmitter.emit("test");

      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(2);
      expect(z).toHaveBeenCalledTimes(2);
    });

    it("z should no longer listen after off is called", () => {
      const x = vi.fn();
      const y = vi.fn();
      const z = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.on("test", y);
      DomEventEmitter.on("test", z);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);

      DomEventEmitter.off("test", z);
      DomEventEmitter.emit("test");

      expect(x).toHaveBeenCalledTimes(2);
      expect(y).toHaveBeenCalledTimes(2);
      expect(z).toHaveBeenCalledTimes(1);
    });
  });

  describe("removeEventListeners", () => {
    it("removes all the event listeners for that specified event", () => {
      const x = vi.fn();
      const y = vi.fn();
      const z = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.on("test", y);
      DomEventEmitter.on("test", z);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);

      DomEventEmitter.removeEventListeners("test");
      DomEventEmitter.emit("test");

      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);
    });
  });

  describe("removeAllEventListeners", () => {
    it("removes all the event listeners for all events", () => {
      const x = vi.fn();
      const y = vi.fn();
      const z = vi.fn();
      DomEventEmitter.on("test", x);
      DomEventEmitter.on("test", y);
      DomEventEmitter.on("test", z);
      DomEventEmitter.emit("test");
      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);

      DomEventEmitter.removeAllEventListeners();
      DomEventEmitter.emit("test");

      expect(x).toHaveBeenCalledTimes(1);
      expect(y).toHaveBeenCalledTimes(1);
      expect(z).toHaveBeenCalledTimes(1);
    });
  });
});
