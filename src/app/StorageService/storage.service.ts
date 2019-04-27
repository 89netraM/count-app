import { Injectable } from "@angular/core";
import { StorageInterface } from "./storage-interface";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class StorageService implements StorageInterface {
	private static readonly serviceNameKey = "serviceName";

	private readonly service: StorageInterface;

	public constructor(private local: LocalStorageService) {
		const serviceName: string = this.local.getNow(StorageService.serviceNameKey);
		if (serviceName != null) {
			this.service = this[serviceName] as StorageInterface;
		}
		else {
			this.local.setNow(StorageService.serviceNameKey, "local");
			this.service = this.local;
		}
	}

	async has(key: string): Promise<boolean> {
		return this.service.has(key);
	}
	async get(key: string): Promise<string> {
		return this.service.get(key);
	}
	async set(key: string, value: string): Promise<void> {
		return this.service.set(key, value);
	}
}