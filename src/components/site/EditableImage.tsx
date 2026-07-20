import type { ImgHTMLAttributes } from "react";
import { useSiteImage } from "@/hooks/useSiteImage";
import type { SiteImageId } from "@/lib/site-images";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  imgKey: SiteImageId | string;
};

/** <img> whose src is driven by the site-images registry + user overrides. */
export function EditableImage({ imgKey, alt = "", ...rest }: Props) {
  const src = useSiteImage(imgKey);
  return <img src={src} alt={alt} {...rest} />;
}
