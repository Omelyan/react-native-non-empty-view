import React from "react";
import { View, type ViewProps } from "react-native";

import { toArray } from "./utilities";

/**
 * The unique name of the shadow DOM element.
 */
const COMPONENT_TAG = "_NonEmptyView";

/**
 * Recursively checks if the children have any content.
 */
function hasContentInside(children: React.ReactNode) {
  const nodes = toArray(children);

  for (const node of nodes) {
    // if the current node is falsy or an array with no elements, then continue
    if (!node || (Array.isArray(node) && node.length === 0)) continue;

    // if the node is a nested NonEmptyView element
    if (
      typeof node === "object" &&
      "type" in node &&
      typeof node.type === "function" &&
      "componentName" in node.type &&
      node.type.componentName === COMPONENT_TAG
    ) {
      // and has no content inside, then continue
      if (!hasContentInside(node.props.children) && !node.props.fallback)
        continue;
    }

    return true;
  }

  return false;
}

export type NonEmptyViewProps = ViewProps & {
  /**
   * Renders before the content if the content exists.
   */
  renderBefore?: React.ReactNode;

  /**
   * Renders after the content if the content exists.
   */
  renderAfter?: React.ReactNode;

  /**
   * Renders if no content exists.
   */
  fallback?: React.ReactNode;
};

/**
 * A View that is not rendered if its children are not rendered.
 * NonEmptyViews can be nested inside each other.
 */
const NonEmptyView: React.FunctionComponent<NonEmptyViewProps> = ({
  children,
  renderBefore,
  renderAfter,
  fallback,
  ...restProps
}) => {
  return hasContentInside(children) ? (
    <View {...restProps}>
      {renderBefore}
      {children}
      {renderAfter}
    </View>
  ) : (
    fallback
  );
};

export default NonEmptyView;

/**
 * We can't rely on the function name, as it may change after the JS bundle is minified.
 */
Object.assign(NonEmptyView, { componentName: COMPONENT_TAG });
