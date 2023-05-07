<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	
	let foo = 'baz'
	let bar = 'qux'
	let start_lon = 50.00
	let start_lat = 50.00
	let goal_lon = 50.00
	let goal_lat = 50.00

	let test_result = null
	
	async function doPost () {
		const url = 'http://127.0.0.2:8080/map'
		const res = await fetch(url, {
			mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify({
				start_lon,
				start_lat,
				goal_lat, 
				// goal_lon,
			})
		})

		console.log(res);
		const json = await res.json();

		console.log(res.status);
		console.log(res.headers);
		console.log(res.ok);
		console.log(res.body);
		console.log(json);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<input bind:value={foo} />
<input bind:value={bar} />
<button type="button" on:click={doPost}>
	Post it.
</button>
<p>
	Result:
</p>
<pre>
{test_result}
</pre>
