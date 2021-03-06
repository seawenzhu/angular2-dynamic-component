import {
	Component,
	Input,
	Output,
	Compiler,
	ViewContainerRef,
	EventEmitter,
	Inject
} from '@angular/core';

import {Http} from '@angular/http';

import {IComponentRemoteTemplateFactory} from './IComponentRemoteTemplateFactory';
import {
	IDynamicComponent,
	DynamicComponentType,
	DynamicBase,
	ComponentContext,
	DYNAMIC_TYPES
} from "./DynamicBase";
import {DynamicCache} from './DynamicCache';

export class DynamicComponentMetadata {
	constructor(public selector: string = 'DynamicComponent', public template: string = '') {
	}
}

@Component({
	selector: 'DynamicComponent',
	template: ''
})
export class DynamicComponent extends DynamicBase {

	@Output() dynamicComponentReady: EventEmitter<IDynamicComponent>;
	@Output() dynamicComponentBeforeReady: EventEmitter<void>;

	@Input() componentType: DynamicComponentType;
	@Input() componentTemplate: string;
	@Input() componentStyles: string[];
	@Input() componentContext: ComponentContext;
	@Input() componentTemplateUrl: string;
	@Input() componentTemplatePath: string;
	@Input() componentDefaultTemplate: string;
	@Input() componentRemoteTemplateFactory: IComponentRemoteTemplateFactory;
	@Input() componentModules: Array<any>;

	constructor(@Inject(DYNAMIC_TYPES.DynamicExtraModules) dynamicExtraModules: Array<any>,
	            @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
	            @Inject(Compiler) compiler: Compiler,
	            @Inject(Http) http: Http,
	            @Inject(DynamicCache) dynamicCache:DynamicCache) {
		super(dynamicExtraModules, viewContainer, compiler, http, dynamicCache, 'DynamicComponent{id}');
	}
}
