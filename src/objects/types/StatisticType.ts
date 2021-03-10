import {
    ObjectType, Field, Int,
} from "type-graphql";
import { AbstractPeriod } from "../interface/AbstractPeriod";
import { AbstractStatistic } from "../interface";

@ObjectType({
    implements: [AbstractPeriod, AbstractPeriod],
})
export class StatisticType implements AbstractPeriod, AbstractStatistic {


    public fromDate: Date;

    public toDate: Date;

    public average: number;

    public count: number;

    public deviation?: number;

    public maxValue?: number;

}
