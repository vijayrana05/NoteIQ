// utils/tiptapToText.ts
import { Schema, Node as ProseMirrorNode } from 'prosemirror-model';

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'inline*', group: 'block' },
    text: { group: 'inline' },
    heading: { content: 'inline*', group: 'block' },
    // Add more as needed (e.g., bullet_list, list_item)
    // For TipTap extensions that introduce custom nodes, you'd add them here.
  },
  marks: {
    // Add common marks that TipTap might use
    bold: {
      toDOM() { return ['strong', 0]; },
      parseDOM: [{ tag: 'strong' }, { tag: 'b' }],
    },
    italic: {
      toDOM() { return ['em', 0]; },
      parseDOM: [{ tag: 'em' }, { tag: 'i' }],
    },
    underline: { // <--- Add the underline mark here
      toDOM() { return ['u', 0]; },
      parseDOM: [{ tag: 'u' }],
    },
    // Add other marks like 'strike', 'link', etc., if your TipTap content uses them
    strike: {
      toDOM() { return ['s', 0]; },
      parseDOM: [{ tag: 's' }],
    },
    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      toDOM(mark) { return ['a', mark.attrs]; },
      parseDOM: [{
        tag: 'a',
        getAttrs(dom) {
          if (typeof dom === 'string') return {}; // Should not happen with real DOM elements
          return { href: dom.getAttribute('href'), title: dom.getAttribute('title') };
        }
      }],
    },
  },
});

export function tiptapJsonToPlainText(json: any): string {
  try {
    const doc = ProseMirrorNode.fromJSON(schema, json);
    return doc.textContent.trim();
  } catch (error) {
    console.error("Error converting TipTap JSON to plain text:", error);
    // You might want to handle the error more gracefully,
    // e.g., return an empty string or re-throw a custom error.
    return '';
  }
}