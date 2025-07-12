import { Context } from 'telegraf';
import type { User } from 'telegraf/types';

const API_KEY: string = '12e597153a4988b68fd4b51e5599aae5';

export interface WeatherContext extends Context {
	args: string[];
	from: User;
}

interface OPEN_WEATHER_SCHEMA {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export function Weather(ctx: WeatherContext): void {
	let location: string = '';

	if (ctx.args.length > 0) {
		location = ctx.args
			.map((value) => value.charAt(0).toUpperCase() + value.slice(1))
			.join('+');
	} else {
		ctx.reply('/weather [Location]');
		return;
	}

	fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
	)
		.then((response: Response) => {
			if (!response.ok) {
				ctx.reply(`Invalid Location: ${location}`);
				return;
			}

			return response.json();
		})
		.then((response: OPEN_WEATHER_SCHEMA) => {
			ctx.replyWithPhoto(
				{
					url: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
				},
				{
					caption: `Weather Information For ${location.replace(
						'+',
						' '
					)}\nWeather: ${response.weather[0].main}\nDescription: ${
						response.weather[0].description
					}\n\nOther Information For ${location.replace(
						'+',
						' '
					)}\nPressure: ${response.main.pressure}hPa\nHumidity: ${
						response.main.humidity
					}%\nWind Speed: ${
						response.wind.speed
					}metre/sec\nWind Degrees: ${
						response.wind.deg
					}°\nLongtitude: ${response.coord.lon}\nLatitude: ${
						response.coord.lat
					}\n\nQuery from ${ctx.from.username}`,
				}
			);
		});
}

export function Temperature(ctx: WeatherContext): void {
	let location: string = '';

	if (ctx.args.length > 0) {
		location = ctx.args
			.map((value) => value.charAt(0).toUpperCase() + value.slice(1))
			.join('+');
	} else {
		ctx.reply('/temp [Location]');
		return;
	}

	fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
	)
		.then((response: Response) => {
			if (!response.ok) {
				ctx.reply(`Invalid Location: ${location}`);
				return;
			}

			return response.json();
		})
		.then((response: OPEN_WEATHER_SCHEMA) => {
			ctx.reply(
				format(
					'Temperature Informations For {0}\nTemperature: {1}\nTemperature/Min: {2}\nTemperature/Max: {3}\nFeels Like: {4}\n\nQuery by {5}',
					location.replace('+', ' '),
					...[
						response.main.temp,
						response.main.temp_min,
						response.main.temp_max,
						response.main.feels_like,
					].map(
						(value) =>
							`${value}°C / ${(value + 273.15).toFixed(2)}°K / ${(
								(value * 9) / 5 +
								32
							).toFixed(2)}°F`
					),
					ctx.from.username
				)
			);
		});
}

function format(str: string, ...values: any[]) {
	return str.replace(/{(\d+)}/g, function (match, index) {
		return typeof values[index] !== 'undefined' ? values[index] : match;
	});
}
