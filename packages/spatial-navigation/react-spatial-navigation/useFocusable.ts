import { RefObject, useCallback, useMemo, useRef, useEffect, useState } from "react";
import noop from "lodash/noop";
import uniqueId from "lodash/uniqueId";
import {
  SpatialNavigation,
  FocusableComponentLayout,
  FocusDetails,
  KeyPressDetails,
  Direction,
  OnGetChildSiblingHandler,
  FocusableComponent,
} from "@hrgui/spatial-navigation-core/SpatialNavigation";
import { useFocusContext } from "./useFocusContext";

export type EnterPressHandler<P = object> = (props: P, details?: KeyPressDetails) => void;

export type EnterReleaseHandler<P = object> = (props: P) => void;

export type ArrowPressHandler<P = object> = (
  direction: string,
  props: P,
  details: KeyPressDetails
) => boolean;

export type FocusHandler<P = object> = (
  layout: FocusableComponentLayout,
  props: P,
  details: FocusDetails
) => void;

export type BlurHandler<P = object> = (
  layout: FocusableComponentLayout,
  props: P,
  details: FocusDetails
) => void;

export interface UseFocusableConfig<P = object> {
  focusable?: boolean;
  saveLastFocusedChild?: boolean;
  trackChildren?: boolean;
  autoRestoreFocus?: boolean;
  forceFocus?: boolean;
  isFocusBoundary?: boolean;
  focusBoundaryDirections?: Direction[];
  focusKey?: string;
  preferredChildFocusKey?: string;
  onEnterPress?: EnterPressHandler<P | undefined>;
  onEnterRelease?: EnterReleaseHandler<P | undefined>;
  onArrowPress?: ArrowPressHandler<P | undefined>;
  onFocus?: FocusHandler<P | undefined>;
  onBlur?: BlurHandler<P | undefined>;
  extraProps?: P | undefined;
  onGetChildSibling?: OnGetChildSiblingHandler;
  onUpdateFocus?: FocusableComponent["onUpdateFocus"];
  onUpdateHasFocusedChild?: FocusableComponent["onUpdateHasFocusedChild"];
  onChildUpdateFocus?: FocusableComponent["onChildUpdateFocus"];
  onDidNotNavigate?: (component: any, props: any) => void;
  getSiblings?: FocusableComponent["getSiblings"];
}

export interface UseFocusableResult {
  ref: RefObject<any>; // <any> since we don't know which HTML tag is passed here
  focusSelf: (focusDetails?: FocusDetails) => void;
  focused: boolean;
  hasFocusedChild: boolean;
  focusKey: string;
}

const useFocusableHook = <P>({
  focusable = true,
  saveLastFocusedChild = true,
  trackChildren = false,
  autoRestoreFocus = true,
  forceFocus = false,
  isFocusBoundary = false,
  focusBoundaryDirections,
  focusKey: propFocusKey,
  preferredChildFocusKey,
  onEnterPress = noop,
  onEnterRelease = noop,
  onArrowPress = () => true,
  onFocus = noop,
  onBlur = noop,
  extraProps,
  onGetChildSibling,
  onUpdateFocus,
  onUpdateHasFocusedChild,
  onChildUpdateFocus,
  onDidNotNavigate,
  getSiblings,
}: UseFocusableConfig<P> = {}): UseFocusableResult => {
  const onEnterPressHandler = useCallback(
    (details?: KeyPressDetails) => {
      onEnterPress(extraProps, details);
    },
    [onEnterPress, extraProps]
  );

  const onEnterReleaseHandler = useCallback(() => {
    onEnterRelease(extraProps);
  }, [onEnterRelease, extraProps]);

  const onArrowPressHandler = useCallback(
    (direction: string, details: KeyPressDetails) => onArrowPress(direction, extraProps, details),
    [extraProps, onArrowPress]
  );

  const onFocusHandler = useCallback(
    (layout: FocusableComponentLayout, details: FocusDetails) => {
      onFocus(layout, extraProps, details);
    },
    [extraProps, onFocus]
  );

  const onBlurHandler = useCallback(
    (layout: FocusableComponentLayout, details: FocusDetails) => {
      onBlur(layout, extraProps, details);
    },
    [extraProps, onBlur]
  );

  const ref = useRef(null);

  const [focused, setFocused] = useState(false);
  const [hasFocusedChild, setHasFocusedChild] = useState(false);

  const parentFocusKey = useFocusContext();

  /**
   * Either using the propFocusKey passed in, or generating a random one
   */
  const focusKey = useMemo(() => propFocusKey || uniqueId("sn:focusable-item-"), [propFocusKey]);

  const focusSelf = useCallback(
    (focusDetails: FocusDetails = {}) => {
      SpatialNavigation.setFocus(focusKey, focusDetails);
    },
    [focusKey]
  );

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    SpatialNavigation.addFocusable({
      focusKey,
      node,
      parentFocusKey,
      preferredChildFocusKey,
      onEnterPress: onEnterPressHandler,
      onEnterRelease: onEnterReleaseHandler,
      onArrowPress: onArrowPressHandler,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      onUpdateFocus: (isFocused = false, focusableComponent: FocusableComponent) => {
        setFocused(isFocused);
        onUpdateFocus?.(isFocused, focusableComponent);
      },
      onChildUpdateFocus: (isFocused = false, focusableComponent: FocusableComponent) => {
        onChildUpdateFocus?.(isFocused, focusableComponent);
      },
      onUpdateHasFocusedChild: (isFocused = false) => {
        setHasFocusedChild(isFocused);
        onUpdateHasFocusedChild?.(isFocused);
      },
      saveLastFocusedChild,
      trackChildren,
      isFocusBoundary,
      focusBoundaryDirections,
      autoRestoreFocus,
      forceFocus,
      focusable,
      extraProps,
      onGetChildSibling,
      onDidNotNavigate,
      getSiblings,
    });

    return () => {
      SpatialNavigation.removeFocusable({
        focusKey,
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    SpatialNavigation.updateFocusable(focusKey, {
      node,
      preferredChildFocusKey,
      focusable,
      isFocusBoundary,
      focusBoundaryDirections,
      onEnterPress: onEnterPressHandler,
      onEnterRelease: onEnterReleaseHandler,
      onArrowPress: onArrowPressHandler,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      onDidNotNavigate,
      getSiblings,
    });
  }, [
    focusKey,
    preferredChildFocusKey,
    focusable,
    isFocusBoundary,
    focusBoundaryDirections,
    onEnterPressHandler,
    onEnterReleaseHandler,
    onArrowPressHandler,
    onFocusHandler,
    onBlurHandler,
    onDidNotNavigate,
    getSiblings,
  ]);

  return {
    ref,
    focusSelf,
    focused,
    hasFocusedChild,
    focusKey, // returns either the same focusKey as passed in, or generated one
  };
};

export const useFocusable = useFocusableHook;
