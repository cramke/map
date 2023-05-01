<script>
    import LeafletMap from '$lib/leaflet/leaflet.svelte';
	import { count, start_lat, start_lon } from '../../Store.js';

	export let form;
	let countValue;

	count.subscribe(value => {
		countValue = value;
	});



	let _start_lat = 0
	let _start_lon = 0
	let _goal_lat = 0
	let _goal_lon = 0
	let result = null
	
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
		result = JSON.stringify(json)
	}
</script>

<svelte:head>
	<title>Map</title>
	<meta name="description" content="A map to analyze and plan" />
</svelte:head>

<div>
    Hey and {countValue}
    <form method="POST" action="?/contactus">
		<label>
		  Start - Lat
		  <input name="lat" type="number">
		</label>
		<label>
		  Start - Lon
		  <input name="lon" type="number">
		</label>
		<button>Set Start</button>
	  </form>
</div>
<div>
	<input bind:value={_start_lat} type="number"/>
	<input bind:value={_start_lon} type="number"/>
	<input bind:value={_goal_lat} type="number"/>
	<input bind:value={_goal_lon} type="number"/>
	<button type="button" on:click={doPost}>POST</button>

	<p>
		Result:
	</p>
	<pre>
		{result}
	</pre>
</div>

{#if form?.success }
<div>
   <p>Start with Lat: {form?.data.lat} and Lon: {form?.data.lon}</p>
</div>
{/if}

<main>
    <LeafletMap />
</main>


