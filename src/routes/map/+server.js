import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { _start_lat, _start_lon, _goal_lat, _goal_lon } = await request.json();
	const success = true;


	return json({ _start_lat, _start_lon, _goal_lat, _goal_lon, success }, { status: 201 });
}