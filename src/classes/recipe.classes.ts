export class Time {
	value: number;
	unit: string;
}

export class Ingridient {
	name: string;
	quantity: {
		value: number;
		unit: string;
	}
}

export class Step {
	title: string;
	description: string;
}