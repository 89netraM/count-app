import { Component, Input, HostBinding } from "@angular/core";
import { CounterModel } from "../ModelService/counter-model";
import { ModelService } from '../ModelService/model.service';

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"]
})
export class CounterComponent {
	@Input()
	public readonly model: CounterModel;

	public get color(): string {
		return "hsl(" + this.model.color + ", 64%, 59%)";
	}

	public constructor(private service: ModelService) { }

	public change(by: number): void {
		this.model.count += by;
		this.service.saveCounter(this.model);
	}
}