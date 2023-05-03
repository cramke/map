<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	
	let foo = 'baz'
	let bar = 'qux'
	let test_result = null
	
	async function doPost () {
		console.log("Test");
		const res = await fetch('http://127.0.0.2:8080/echo', {
			mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify({
				foo,
				bar
			})
		})
		
		if (res.ok) {
			test_result = "Yes";
		} else {
			test_result = "Noo";
		}
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
