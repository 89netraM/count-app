import { Injectable } from "@angular/core";
import { StorageService } from "../StorageService/storage.service";
import { CounterModel } from "./counter-model";

@Injectable({
	providedIn: "root"
})
export class ModelService {
	private static readonly keyIds: string = "counterIds";

	private ids: Array<string> = null;
	public counters: Array<CounterModel> = null;

	public constructor(private storage: StorageService) { }

	public async downloadAll(): Promise<void> {
		await this.downloadAllIds();
		await this.downloadAllCounters();
	}
	private async downloadAllIds(): Promise<void> {
		const idString: string = await this.storage.get(ModelService.keyIds);
		if (idString != null && idString.length > 0) {
			this.ids = idString.split(",");
		}
		else {
			this.ids = new Array<string>();
		}
	}
	private async downloadAllCounters(): Promise<void> {
		this.counters = new Array<CounterModel>();

		if (this.ids != null) {
			for (const id of this.ids) {
				this.counters.push(this.fromString(await this.storage.get(id)));
			}
		}
	}

	public async saveAll(): Promise<void> {
		await Promise.all([
			this.saveAllIds(),
			this.saveAllCounters()
		]);
	}
	private async saveAllIds(): Promise<void> {
		if (this.ids != null) {
			await this.storage.set(ModelService.keyIds, this.ids.join(","));
		}
	}
	private async saveAllCounters(): Promise<void> {
		const promises: Array<Promise<void>> = new Array<Promise<void>>();

		if (this.counters != null) {
			for (const counter of this.counters) {
				promises.push(this.saveCounter(counter));
			}
		}

		await Promise.all(promises);
	}
	public async saveCounter(counter: CounterModel): Promise<void> {
		await this.storage.set(counter.id, this.toString(counter));
	}

	public async addCounter(): Promise<void> {
		const counter: CounterModel = {
			id: this.UUID(),
			name: "Counter",
			count: 0,
			color: 0
		};

		this.counters.push(counter);
		this.ids.push(counter.id);

		await Promise.all([
			this.saveAllIds(),
			this.saveCounter(counter)
		]);
	}

	public async removeCounter(counter: CounterModel): Promise<void> {
		this.ids.splice(this.ids.indexOf(counter.id), 1);
		this.counters.splice(this.counters.indexOf(counter), 1);

		await Promise.all([
			this.saveAllIds(),
			this.storage.del(counter.id)
		]);
	}

	private fromString(s: string): CounterModel {
		const p: Array<string> = s.split(",");

		return {
			id: p[0],
			name: p[1],
			count: parseInt(p[2], 16),
			color: parseInt(p[3], 16)
		};
	}
	private toString(c: CounterModel): string {
		return c.id + "," + c.name + "," + c.count.toString(16) + "," + c.color.toString(16);
	}

	private UUID() {
		return "xxxxxxxx-xxxx-4xxx-5xxx-xxxxxxxxxxxx".replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
	}
}