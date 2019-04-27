import { Injectable } from "@angular/core";
import { StorageInterface } from "./storage-interface";

@Injectable({
	providedIn: "root"
})
export class LocalStorageService implements StorageInterface {
	public constructor() { }

	hasNow(key: string): boolean {
		return window.localStorage.getItem(key) != null;
	}
	getNow(key: string): string {
		return window.localStorage.getItem(key);
	}
	setNow(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}
	delNow(key: string): void {
		window.localStorage.removeItem(key);
	}

	async has(key: string): Promise<boolean> {
		return this.hasNow(key);
	}
	async get(key: string): Promise<string> {
		return this.getNow(key);
	}
	async set(key: string, value: string): Promise<void> {
		this.setNow(key, value);
	}
	async del(key: string): Promise<void> {
		this.delNow(key);
	}
}