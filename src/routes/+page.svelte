<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	
	let foo = 'baz'
	let bar = 'qux'
	let test_result = null
	
	async function doPost () {
		const url = 'http://127.0.0.2:8080/echo'
		const res = await fetch(url, {
			mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify({
				foo,
				bar
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
