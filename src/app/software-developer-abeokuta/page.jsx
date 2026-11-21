import LocationView, { locationMetadata } from "@/components/views/LocationView";
import { locationBySlug } from "@/data/locations";

const loc = locationBySlug("abeokuta");
export const metadata = locationMetadata(loc);

export default function Page() {
  return <LocationView loc={loc} />;
}
