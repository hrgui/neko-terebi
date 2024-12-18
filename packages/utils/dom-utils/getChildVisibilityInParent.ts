export function getChildVisibilityInParent({ parent, child }: { parent: Element; child: Element }) {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  // Calculate overlap dimensions
  const overlapLeft = Math.max(parentRect.left, childRect.left);
  const overlapRight = Math.min(parentRect.right, childRect.right);
  const overlapTop = Math.max(parentRect.top, childRect.top);
  const overlapBottom = Math.min(parentRect.bottom, childRect.bottom);

  const overlapWidth = Math.max(0, overlapRight - overlapLeft);
  const overlapHeight = Math.max(0, overlapBottom - overlapTop);

  // Calculate visible percentages
  const visibleWidthPercentage = (overlapWidth / childRect.width) * 100;
  const visibleHeightPercentage = (overlapHeight / childRect.height) * 100;

  const isTopWithin = childRect.top >= parentRect.top;
  const isLeftWithin = childRect.left >= parentRect.left;
  const isBottomWithin = childRect.bottom <= parentRect.bottom;
  const isRightWithin = childRect.right <= parentRect.right;

  const isFullyVisible = isTopWithin && isLeftWithin && isBottomWithin && isRightWithin;

  const isPartiallyVisible =
    !isFullyVisible && // Not fully visible
    childRect.bottom > parentRect.top && // Child's bottom is below parent's top
    childRect.top < parentRect.bottom && // Child's top is above parent's bottom
    childRect.right > parentRect.left && // Child's right is to the right of parent's left
    childRect.left < parentRect.right; // Child's left is to the left of parent's right

  const isInvisible =
    childRect.bottom <= parentRect.top || // Child's bottom is above parent's top
    childRect.top >= parentRect.bottom || // Child's top is below parent's bottom
    childRect.right <= parentRect.left || // Child's right is to the left of parent's left
    childRect.left >= parentRect.right; // Child's left is to the right of parent's right

  return {
    parentRect,
    childRect,
    overlapWidth,
    overlapHeight,
    visibleWidthPercentage,
    visibleHeightPercentage,
    isTopWithin,
    isLeftWithin,
    isBottomWithin,
    isRightWithin,
    isPartiallyVisible,
    isInvisible,
    isFullyVisible,
  };
}
