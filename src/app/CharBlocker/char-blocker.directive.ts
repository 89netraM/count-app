import { Directive, Input, HostListener } from "@angular/core";

@Directive({
	selector: "[charBlocker]"
})
export class CharBlockerDirective {
	@Input("charBlocker")
	public readonly chars: string;

	@HostListener("keydown", ["$event"])
	public keydown(e: KeyboardEvent): void {
		if (this.chars.indexOf(e.key) !== -1) {
			e.preventDefault();
		}
	}

	public constructor() { }
}