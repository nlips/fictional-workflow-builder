import { WorkflowAggregate } from './workflowAggregate';
import { Property } from '../property';
import { TypeStore } from '../../../services/type-store.service';

export class PostRestApiWorkflowAggregate extends WorkflowAggregate {
    url: Property = new Property();
    body: Property = new Property();
    name = 'Post Rest API';
    type: string = this.constructor.name;

    constructor(hash: string) {
        super(hash);

        this.events = {
            'onSuccess': [],
            'onFail': []
        };

        this.initializeProperties();
    }
}

TypeStore.put(PostRestApiWorkflowAggregate);