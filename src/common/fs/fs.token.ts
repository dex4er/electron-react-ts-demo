import { getInjectionToken } from "@ogre-tools/injectable";
import type { FsApi } from "./fs.api";

export const fsToken = getInjectionToken<FsApi>({
  id: "fs-token",
});
