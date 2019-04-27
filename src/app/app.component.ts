import { Component } from "@angular/core";
import { ModelService } from "./ModelService/model.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	public constructor(public service: ModelService) {
		this.service.downloadAll();
	}
}