import { visit } from "unist-util-visit";
import { getImageDimensions } from "./imageMeta";

export function rehypeOptimizedImages() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "img" && node.properties) {
        if (!node.properties.loading) {
          node.properties.loading = "lazy";
        }
        if (!node.properties.decoding) {
          node.properties.decoding = "async";
        }
        const src = node.properties.src;
        if ((!node.properties.width || !node.properties.height) && typeof src === "string") {
          const dims = getImageDimensions(src);
          if (dims.width && dims.height) {
            node.properties.width = dims.width;
            node.properties.height = dims.height;
          }
        }
      }
    });
  };
}
