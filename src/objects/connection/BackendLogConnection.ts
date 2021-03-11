import { BackendLog } from "../types";
import { genericConnection } from "@umk-stat/statistic-server-core";
import { ObjectType } from "type-graphql";

@ObjectType()
export class BackendLogConnection extends genericConnection(BackendLog) {

}

