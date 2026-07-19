import type { StaticImageData } from "next/image";
import localflowPreview from "../../public/photos/local-flow/local-flow_preview.webp";
import mobitechPreview from "../../public/photos/mobitech/Mobitech_preview.webp";
import vitneIos from "../../public/photos/vitne/Vitne_iOS_app.webp";
import vitnePreview from "../../public/photos/vitne/Vitne_preview_web.webp";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
}

// Local project photography, keyed by slug. Drop a file under
// public/photos/<slug>/ and add it here; the first image is the one the
// home page and the detail hero use. Projects without an entry fall back
// to the Sanity screenshot field.
export const projectMedia: Record<string, ProjectImage[]> = {
  vitne: [
    { src: vitnePreview, alt: "The Vitne site on a laptop and a phone." },
    { src: vitneIos, alt: "The Vitne iOS app on a phone." },
  ],
  mobitech: [{ src: mobitechPreview, alt: "The Mobitech site on a laptop and a phone." }],
  localflow: [
    { src: localflowPreview, alt: "The LocalFlow settings window on a MacBook." },
  ],
};

// 1200x630 JPG crops of the first project image, for Open Graph cards.
// Regenerate with sips when the source photo changes.
export const projectOgImage: Record<string, { url: string; alt: string }> = {
  vitne: { url: "/og/vitne.jpg", alt: "The Vitne site on a laptop and a phone." },
  mobitech: { url: "/og/mobitech.jpg", alt: "The Mobitech site on a laptop and a phone." },
  localflow: { url: "/og/localflow.jpg", alt: "The LocalFlow settings window on a MacBook." },
};
