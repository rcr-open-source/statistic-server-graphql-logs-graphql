import { MiddlewareFn } from "type-graphql";

import DataLoader from "dataloader";
import { BackendLog } from "../objects/types";
import { ConnectionArgsOrder, Context, decodeToBase64, setLoaderToContext, validateConnectionArgsOrder } from "@umk-stat/statistic-server-core";
import { BackendLogEdge } from "../objects";
;

export const tableLogsDataLoaderInit: MiddlewareFn<Context> = (
    { context, args },
    next,
) => {
    const middlewareType = "tableLogsDataLoader";
    const { limit, offset, order, orderField, orderRowNumber } = validateConnectionArgsOrder(args as ConnectionArgsOrder);

    const batchFn: DataLoader.BatchLoadFn<string, BackendLogEdge[]> = async (keys: string[]): Promise<BackendLogEdge[][]> => {

        const backendLogsDb = await context.databaseApi.queries.findBackendLogsConnection(keys, limit, offset, orderField, orderRowNumber, order);
        const logsMap = backendLogsDb.reduce((prev, val) => {

            const prevArrayEdgable = prev.get(val.systemId);
            const newArrayEdgable: BackendLogEdge[] = [];
            if (typeof prevArrayEdgable !== "undefined") {

                newArrayEdgable.push(...prevArrayEdgable);

            }
            newArrayEdgable.push({
                cursor: decodeToBase64(val.rowNumber.toString()),
                node: BackendLog.builderFromDb(val),
            });
            prev.set(val.systemId, newArrayEdgable);
            return prev;

        }, new Map<string, BackendLogEdge[]>());

        const logs = keys.map((key) => {

            const arrayEdgable = logsMap.get(key);
            if (typeof arrayEdgable === "undefined") {

                return [];

            }
            return arrayEdgable;

        });

        return logs;

    }
    const newLoader = new DataLoader(batchFn);

    setLoaderToContext(args, middlewareType, newLoader, context);

    const nextResult = next();
    return nextResult;

}
