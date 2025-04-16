import fs from "node:fs";
import { getInjectable } from "@ogre-tools/injectable";

import type { FsApi } from "./fs.api";
import { fsToken } from "./fs.token";

const fsApi: FsApi = {
  readFileSync: fs.readFileSync,
};

export default getInjectable({
  id: "fs",
  instantiate: () => fsApi,
  injectionToken: fsToken,
});
