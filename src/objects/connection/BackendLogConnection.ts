import { BackendLog } from "../types";
import { genericConnection } from "@umk-stat/statistic-server-core";

export class BackendLogConnection extends genericConnection(BackendLog) {

}

