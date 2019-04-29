import { Component, Input, HostBinding } from "@angular/core";
import { CounterModel } from "../ModelService/counter-model";
import { ModelService } from "../ModelService/model.service";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"]
})
export class CounterComponent {
	@Input()
	public readonly model: CounterModel;

	public get color(): string {
		return "hsl(" + this.model.color + ", 100%, 50%)";
	}
	// public get borderColor(): string {
	// 	return "hsl(" + this.model.color + ", 64%, 49%)";
	// }

	public get name(): string {
		return this.model.name;
	}
	public set name(value: string) {
		this.model.name = value.replace(/,/g, "");
	}

	public fliped: boolean = false;

	public constructor(private service: ModelService) { }

	public change(by: number): void {
		this.model.count += by;
		this.save();
	}

	public delete(): void {
		this.service.removeCounter(this.model);
	}

	public reset(): void {
		this.model.count = 0;
	}

	public save(): void {
		this.service.saveCounter(this.model);
	}
}