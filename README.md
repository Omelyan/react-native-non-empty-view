# React Native `<NonEmptyView />`

[React Native](https://reactnative.dev/) `View` wrapper that won't be rendered if its children are not rendered. `NonEmptyView`'s can be nested inside each other.

## 🎯 Why would you use it?

Since React Native doesn't use CSS (especially [selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)), there's no convenient way to hide a container when its children are not rendered. This happens quite often, and usually requires adding extra conditions for rendering the container, besides the conditions for its children.

The primary motivation is to avoid rendering unnecessary or empty components in the component tree, which can sometimes lead to layout issues or simply be inefficient.

This `View` wrapper component solves this problem.

Now, instead of

```jsx
{
  name || age /* ... */ ? (
    <View style={{ borderWidth: 2, gap: 8 }}>
      {!!name && <Text>{name}</Text>}
      {!!age && <Text>{age}</Text>}
    </View>
  ) : (
    <Text>Empty</Text>
  );
}
```

you can do

```jsx
<NonEmptyView style={{ borderWidth: 2, gap: 8 }} fallback={<Text>Empty</Text>}>
  {!!name && <Text>{name}</Text>}
  {!!age && <Text>{age}</Text>}
</NonEmptyView>
```

The `NonEmptyView` component will be removed from the tree if its children are _empty_ (e.g., null, undefined, empty arrays, or components that render null). Nested `NonEmptyView` components will also be taken into account 🚀

## 🧑🏻‍💻 Installation

npm

```bash
npm install react-native-non-empty-view
```

yarn

```bash
yarn add react-native-non-empty-view
```

That's it, no additional actions needed.

## 🍺 Usage

Import it like

```jsx
import NonEmptyView from "react-native-non-empty-view";
```

and use it like the default `View`.

`NonEmptyView` inherits all properties from `View` with a few additional ones.

## Properties

`renderBefore` → `ReactNode`: Renders before the content if the content exists.

`renderAfter` → `ReactNode`: Renders after the content if the content exists.

`fallback` → `ReactNode`: Renders if no content exists.

---

🟦🟨
