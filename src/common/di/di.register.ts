import type { Injectable } from "@ogre-tools/injectable";
import * as indexFs from "../fs";
import { di } from "./di.container";

const indexes = { ...indexFs };

const injectables = Object.entries(indexes)
  .filter(([key]) => key.endsWith("Injectable"))
  .map(([, value]) => value) as Injectable<any, any, any>[];

di.register(...injectables);

export { di };
