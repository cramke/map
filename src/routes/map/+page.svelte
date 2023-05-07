<script>
	import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
	import { _doPlan } from './+page';

    let mapElement
    let map;

	let start_lat = 0;
	let start_lon = 0;
	let goal_lat = 0;
	let goal_lon = 0;
	let result = null;
	let show_result = false;
	let start = false;
	let goal = false;

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');
			const initial_start_lat = 49.672;
			const initial_start_lon = -351.005;

            map = leaflet.map(mapElement).setView([initial_start_lat, initial_start_lon], 13);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            leaflet.marker([initial_start_lat, initial_start_lon]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
            
            function onMapClick(event) {
				if (start) {
					var markerOptions = {
						title: "Start",
					}
					var circle = leaflet.marker(event.latlng, markerOptions).addTo(map);
					start_lat = event.latlng.lat;
					start_lon = event.latlng.lng;
					start = false;
				} else if (goal) {
					var markerOptions = {
						title: "Start",
					}
					var circle = leaflet.marker(event.latlng, markerOptions).addTo(map);
					goal_lat = event.latlng.lat;
					goal_lon = event.latlng.lng;
					goal = false;
				}
			}

            map.on('click', onMapClick);
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

	function setStart() {
		start = true;
		goal = false;
	}

	function SetGoal() {
		start = false;
		goal = true;
	}
	
	async function doDefine () {
		const url = 'http://127.0.0.2:8080/map'
		const res = await fetch(url, {
			mode: 'no-cors',
			method: 'POST',
			body: JSON.stringify({
				start_lat,
				start_lon,
				goal_lat,
				goal_lon,
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
	<label>
		Start - Lat
		<input bind:value={start_lat} name="lat" type="number">
	</label>
	<label>
		Start - Lon
		<input bind:value={start_lon} name="lon" type="number">
	</label>
	<label>
		Goal - Lat
		<input bind:value={goal_lat} type="number"/>
	</label>
	<label>
		<input bind:value={goal_lon} type="number"/>
	</label>
	<button type="button" on:click={doDefine}>POST</button>
</div>

<div>
	<button type="button" on:click={_doPlan}>Start Planning</button>
</div>

<hr>

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

<hr>

<div>
	<button type="button" on:click={setStart}>Set Start</button>
	<button type="button" on:click={SetGoal}>Set Goal</button>
</div>

<main>
	<div bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 800px;
    }
</style>
