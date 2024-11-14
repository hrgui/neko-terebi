import { ROOT_FOCUS_KEY, SpatialNavigation, destroy, init } from "../SpatialNavigation";
import {
  createHorizontalLayout,
  createRootNode,
  createVerticalLayout,
  getDummyNode,
} from "./helpers/domNodes";

describe("SpatialNavigation", () => {
  beforeEach(() => {
    window.innerWidth = 1920;
    window.innerHeight = 1280;
    init();
  });

  afterEach(() => {
    destroy();
    SpatialNavigation.eventEmitter.removeAllEventListeners();
  });

  it("should allow horizontal navigation", () => {
    createHorizontalLayout();

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus(ROOT_FOCUS_KEY);

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");

    SpatialNavigation.navigateByDirection("up", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");

    SpatialNavigation.navigateByDirection("left", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("down", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");
  });

  it("should allow vertical navigation", () => {
    createVerticalLayout();

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus(ROOT_FOCUS_KEY);

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("up", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("left", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("down", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");

    SpatialNavigation.navigateByDirection("down", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");
  });

  it("should allow manual focus", () => {
    createHorizontalLayout();

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus("child-2");

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");
  });

  it("should ignore events if paused", () => {
    createHorizontalLayout();
    SpatialNavigation.pause();

    SpatialNavigation.setFocus("child-1");

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");
  });

  it("should be able to update a focusable reference", () => {
    createHorizontalLayout();

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus(ROOT_FOCUS_KEY);

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.updateFocusable("child-2", {
      node: {
        offsetLeft: 1600,
        offsetTop: 100,
        offsetWidth: 400,
        offsetHeight: 200,
        parentElement: {
          offsetLeft: 0,
          offsetTop: 0,
          offsetWidth: 1920,
          offsetHeight: 1280,
        } as HTMLElement,
        offsetParent: {
          offsetLeft: 0,
          offsetTop: 0,
          scrollLeft: 0,
          scrollTop: 0,
          offsetWidth: 1920,
          offsetHeight: 1280,
          nodeType: Node.ELEMENT_NODE,
        } as HTMLElement,
      } as unknown as HTMLElement,
      isFocusBoundary: false,
      focusable: true,
      onEnterPress: () => {},
      onEnterRelease: () => {},
      onFocus: () => {},
      onBlur: () => {},
      onArrowPress: () => true,
    });

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-3");

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-2");
  });

  it("should be able to remove a focusable reference", () => {
    createHorizontalLayout();

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus(ROOT_FOCUS_KEY);

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.removeFocusable({ focusKey: "child-2" });

    SpatialNavigation.navigateByDirection("right", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-3");
  });

  it("should be able to determine if there was no navigation occurring", () => {
    createHorizontalLayout();

    const x = vi.fn();

    SpatialNavigation.eventEmitter.on("sn/onDidNotNavigate", x);

    expect(SpatialNavigation.getCurrentFocusKey()).not.toBe("child-1");

    SpatialNavigation.setFocus(ROOT_FOCUS_KEY);

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");

    SpatialNavigation.navigateByDirection("left", {});

    expect(SpatialNavigation.getCurrentFocusKey()).toBe("child-1");
    expect(x).toHaveBeenCalled();
  });

  describe("onGetChildSibling", () => {
    it("should navigate to the next node logically despite the layout is overlapping", () => {
      createRootNode();

      // create Row element
      SpatialNavigation.addFocusable({
        focusKey: "#row",
        parentFocusKey: ROOT_FOCUS_KEY,
        node: getDummyNode(),
        trackChildren: true,
        onUpdateFocus: () => {},
        onUpdateHasFocusedChild: () => {},
        onGetChildSibling: ({
          isVerticalDirection,
          isIncrementalDirection,
          proposedSibling,
          currentComponent,
        }) => {
          const currentComponentExtraProps = currentComponent.extraProps;
          const proposedSiblingExtraProps = proposedSibling.extraProps;
          const isHorizontalDirection = !isVerticalDirection;

          if (currentComponentExtraProps && proposedSiblingExtraProps && isHorizontalDirection) {
            const nextIndex = currentComponentExtraProps.index + 1;
            const prevIndex = currentComponentExtraProps.index - 1;

            return isIncrementalDirection
              ? nextIndex === proposedSiblingExtraProps.index
              : prevIndex === proposedSiblingExtraProps.index;
          }

          return false;
        },
      });

      // create item elements

      SpatialNavigation.addFocusable({
        focusKey: "#item1",
        node: getDummyNode(),
        onUpdateFocus: () => {},
        onUpdateHasFocusedChild: () => {},
        parentFocusKey: "#row",
        extraProps: { index: 1 },
      });

      SpatialNavigation.addFocusable({
        focusKey: "#item2",
        node: getDummyNode(),
        onUpdateFocus: () => {},
        onUpdateHasFocusedChild: () => {},
        parentFocusKey: "#row",
        extraProps: { index: 2 },
      });

      SpatialNavigation.addFocusable({
        focusKey: "#item3",
        node: getDummyNode(),
        onUpdateFocus: () => {},
        onUpdateHasFocusedChild: () => {},
        parentFocusKey: "#row",
        extraProps: { index: 3 },
      });

      SpatialNavigation.addFocusable({
        focusKey: "#item4",
        node: getDummyNode(),
        onUpdateFocus: () => {},
        onUpdateHasFocusedChild: () => {},
        parentFocusKey: "#row",
        extraProps: { index: 4 },
      });

      SpatialNavigation.setFocus("#item1");
      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item1");

      SpatialNavigation.navigateByDirection("right");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item2");

      SpatialNavigation.navigateByDirection("right");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item3");

      SpatialNavigation.navigateByDirection("right");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item4");

      SpatialNavigation.navigateByDirection("left");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item3");

      SpatialNavigation.navigateByDirection("left");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item2");

      SpatialNavigation.navigateByDirection("left");

      expect(SpatialNavigation.getCurrentFocusKey()).toBe("#item1");
    });
  });
});
