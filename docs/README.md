# Box

## What this App does

Allows users to output any HTML element they wish to their VTEX store while controlling the attributes and children. Has a special provision for `<a>` elements, in which the app converts them to `<Link>` elements for VTEX's render runtime.

## Props

```
BoxProps = {
tag: string
id: string
attributes: Array<AttributeObject>
children: ReactChildren
tokens: string
blockClass: string
text: string
}

AttributeObject = {
key: string
value: string
}
```

## Example JSONC

```
"box#example": {
    // "children": ["rich-text#one", "rich-text#two"],
    "props": {
      "tag": "s",
      "id": "strikeout-element",
      "text": "Text takes precedence over children.",
      "attributes": [
        { "key": "aria-hidden", "value": "true" },
        { "key": "data-visible", "value": "false" }
      ],
      "tokens": "flex-col ac jc",
      "blockClass": "v1"
    }
  },
```

### Output HTML

```
<s id="strikeout-element" class="eriksbikeshop-box-1-x-v1 flex-col ac jc" aria-hidden="true" data-visible="false">Text takes precedence over children.</s>
```
