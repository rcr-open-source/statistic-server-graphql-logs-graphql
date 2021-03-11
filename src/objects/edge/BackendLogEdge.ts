import { BackendLog } from "../types";
import { genericEdge } from "@umk-stat/statistic-server-core";
import { ObjectType } from "type-graphql";

@ObjectType()
export class BackendLogEdge extends genericEdge(BackendLog) {

}

