import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { description } = await request.json();

	const id = "Test"

	return json({ id }, { status: 201 });
}