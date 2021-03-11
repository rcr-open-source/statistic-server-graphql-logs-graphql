import {
    ObjectType, Field, Int, Float,
} from "type-graphql";
import { AbstractStatistic, AbstractPeriod } from "../interface";

@ObjectType({
})
export class StatisticType implements AbstractPeriod, AbstractStatistic {

    @Field(() => Int, {
        nullable: false,
        simple: true,
    })
    count: number;


    @Field(() => Float, {
        nullable: false,
        simple: true,
    })
    average: number;

    @Field(() => Float, {
        nullable: true,
        simple: true,
    })
    deviation?: number;

    @Field(() => Float, {
        nullable: true,
        simple: true,
    })
    maxValue?: number;

    @Field(() => Date, {
        nullable: false,
        simple: true,
    })
    fromDate: Date;


    @Field(() => Date, {
        nullable: false,
        simple: true,
    })
    toDate: Date;

}
