<script>
    import LeafletMap from '$lib/leaflet/leaflet.svelte';

	export let form;

	let _start_lat = 0
	let _start_lon = 0
	let _goal_lat = 0
	let _goal_lon = 0
	let result = null
	let show_result = false
	
	async function doPost () {
		const res = await fetch('', {
			method: 'POST',
			body: JSON.stringify({
				_start_lat,
				_start_lon,
				_goal_lat,
				_goal_lon,
			})
		})
		
		const json = await res.json()
		if (json["success"]) {
			show_result = true;
		} else {
		}
		result = JSON.stringify(json);
	}
</script>

<svelte:head>
	<title>Map</title>
	<meta name="description" content="A map to analyze and plan" />
</svelte:head>

<div>
    Enter the Start and Goal location and send it to the server.
    <form method="POST" action="">
		<label>
		  Start - Lat
		  <input bind:value={_start_lat} name="lat" type="number">
		</label>
		<label>
		  Start - Lon
		  <input bind:value={_start_lon} name="lon" type="number">
		</label>
		<label>
			Goal - Lat
			<input bind:value={_goal_lat} type="number"/>
		</label>
		<label>
			<input bind:value={_goal_lon} type="number"/>
		</label>
		<button type="button" on:click={doPost}>POST</button>
	  </form>
</div>


{#if show_result }
<div>
	<p>
		Result:
	</p>
	<pre>
		{result}
	</pre>
</div>
{/if}

<main>
    <LeafletMap />
</main>


