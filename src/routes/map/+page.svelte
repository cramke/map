<script>
    import LeafletMap from '$lib/leaflet/leaflet.svelte';
	import { count } from '../../Store.js';

	export let form;
	let countValue;

	count.subscribe(value => {
		countValue = value;
	});
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

{#if form?.success }
<div>
   <p>Start with Lat: {form?.data.lat} and Lon: {form?.data.lon}</p>
</div>
{/if}

<main>
    <LeafletMap />
</main>


