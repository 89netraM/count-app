import { Component, Input } from "@angular/core";
import { CounterModel } from "../ModelService/counter-model";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"]
})
export class CounterComponent {
	@Input()
	public readonly model: CounterModel;

	public constructor() { }
}