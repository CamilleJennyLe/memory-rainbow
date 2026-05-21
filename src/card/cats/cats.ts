import type { CSSProperties } from "react";

const catImages = import.meta.glob<string>("../../assets/cats/*.png", {
  eager: true,
  import: "default",
});

const catImageByClassName = Object.fromEntries(
  Object.entries(catImages).map(([path, url]) => {
    const name = (path.split("/").pop() ?? path).replace(/\.png$/i, "");
    return [name, url];
  }),
);

export const catClassNames = Object.keys(catImageByClassName).sort();

export type CatClassName = (typeof catClassNames)[number];

export const catImageUrls = Object.values(catImageByClassName);

const cardBackground: CSSProperties = {
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "var(--secondary-color)",
};

export function getCatCardStyle(
  className: string,
): CSSProperties | undefined {
  const url = catImageByClassName[className];
  return url ? { ...cardBackground, backgroundImage: `url(${url})` } : undefined;
}
