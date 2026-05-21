import type { CSSProperties } from "react";

const aquaticImages = import.meta.glob<string>("../../assets/aquatic/*.png", {
  eager: true,
  import: "default",
});

const aquaticImageByClassName = Object.fromEntries(
  Object.entries(aquaticImages).map(([path, url]) => {
    const name = (path.split("/").pop() ?? path).replace(/\.png$/i, "");
    return [name, url];
  }),
);

export const aquaticClassNames = Object.keys(aquaticImageByClassName).sort();

export type AquaticClassName = (typeof aquaticClassNames)[number];

export const aquaticImageUrls = Object.values(aquaticImageByClassName);

const cardBackground: CSSProperties = {
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "var(--secondary-color)",
};

export function getAquaticCardStyle(
  className: string,
): CSSProperties | undefined {
  const url = aquaticImageByClassName[className];
  return url ? { ...cardBackground, backgroundImage: `url(${url})` } : undefined;
}
