import type { StaticImageData } from "next/image";
import mobitechPreview from "../../public/photos/mobitech/Mobitech_preview.webp";
import muneIos from "../../public/photos/mune/Mune_iOS_app.webp";
import munePreview from "../../public/photos/mune/Mune_preview_web.webp";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
}

// Local project photography, keyed by slug. Drop a file under
// public/photos/<slug>/ and add it here; the first image is the one the
// home page and the detail hero use. Projects without an entry fall back
// to the Sanity screenshot field.
export const projectMedia: Record<string, ProjectImage[]> = {
  mune: [
    { src: munePreview, alt: "The Mune site on a laptop and a phone." },
    { src: muneIos, alt: "The Mune iOS app on a phone." },
  ],
  mobitech: [{ src: mobitechPreview, alt: "The Mobitech site on a laptop and a phone." }],
};
