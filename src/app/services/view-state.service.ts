import { Injectable } from '@angular/core';
import { WorkflowAggregate } from '../models/domain/workflow-aggregates/workflowAggregate';

@Injectable()
export class ViewState {
  selectedAggregate: Array<WorkflowAggregate>;
  selectedEvent: Array<string>;

  constructor() {
    this.selectedAggregate = [];
    this.selectedEvent = [];
  }

  clearSelectedAggregates = (fork: number) => {
    this.selectedAggregate[fork] = undefined;
    this.selectedEvent[fork] = undefined;
  }
}