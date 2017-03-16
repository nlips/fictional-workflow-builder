import { Command } from './command';
import { FutureTargetSettableCommand } from './futureTargetSettableCommand';
import { QueryBus } from '../../services/query-bus.service';
import { AggregateFactory } from '../../services/aggregate-factory.service';
import { Workflow } from '../domain/workflow';
import { WorkflowAggregate } from '../domain/workflow-aggregates/workflowAggregate';
import { CreateNewWorkflowAggregateCommand } from './createNewWorkflowAggregateCommand';
import {TypeInjector} from '../../services/type-injector.service';

export class AddWorkflowAggregateToRootCommand extends Command {

    constructor(public createCommand: CreateNewWorkflowAggregateCommand
    ) { super(); }

    execute = (fork: number, queryBus: QueryBus, aggregateFactory: AggregateFactory) => {
        this.createCommand.execute(fork, queryBus, aggregateFactory);
        var target = queryBus.getRootObject(fork) as Workflow;
        target.rootAggregate().push(queryBus.getAggregateRoot(fork, this.createCommand.targetHash) as WorkflowAggregate);
        this.title = `${this.createCommand.title} and adding it to main workflow`;
    }

    undo = (fork: number, queryBus: QueryBus, aggregateFactory: AggregateFactory) => {
        this.createCommand.undo(fork, queryBus, aggregateFactory);
        var target = queryBus.getRootObject(fork) as Workflow;
        target.rootAggregate().pop();
    }

    toJSON() {
        return {
            __type__: this.__type__,
            createCommand: this.createCommand
        }
    }
}

TypeInjector.put(AddWorkflowAggregateToRootCommand.prototype.constructor.name, AddWorkflowAggregateToRootCommand);