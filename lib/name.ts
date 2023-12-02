import { basename } from "path";

export const name = (filename: string) => {
  const day = basename(filename)?.split(".ts")?.[0]?.split("-")?.[1];
  return `day ${Number(day)}`;
};
