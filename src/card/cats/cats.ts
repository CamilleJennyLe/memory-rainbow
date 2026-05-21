import type { CSSProperties } from "react";

const catImageModules = import.meta.glob<string>("../../assets/cats/*.png", {
  eager: true,
  import: "default",
});

function classNameFromAssetPath(path: string): string {
  const fileName = path.split("/").pop() ?? path;
  return fileName.replace(/\.png$/i, "");
}

export const catImageByClassName: Record<string, string> = Object.fromEntries(
  Object.entries(catImageModules).map(([path, url]) => [
    classNameFromAssetPath(path),
    url,
  ]),
);

export const catClassNames = Object.keys(catImageByClassName).sort();

export type CatClassName = (typeof catClassNames)[number];

export const catImageUrls = Object.values(catImageByClassName);

export function isCatClassName(name: string): name is CatClassName {
  return name in catImageByClassName;
}

const catCardBackground: CSSProperties = {
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "var(--secondary-color)",
};

export function getCatCardStyle(
  cardClassName: string,
): CSSProperties | undefined {
  const url = catImageByClassName[cardClassName];
  if (!url) return undefined;
  return {
    ...catCardBackground,
    backgroundImage: `url(${url})`,
  };
}
