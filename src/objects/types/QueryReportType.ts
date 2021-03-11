import {
    Field, Int, ObjectType, Float, 
} from "type-graphql";
import { AbstractStatistic } from "../interface";

@ObjectType({
})
export class QueryReportType implements AbstractStatistic {

    @Field(() => String, {
        nullable: false,
        simple: true,
    })
    public query: string;

    public count: number;

    public average: number;

}
