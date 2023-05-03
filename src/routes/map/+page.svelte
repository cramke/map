<script>
	import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement
    let map;

	let _start_lat = 0;
	let _start_lon = 0;
	let _goal_lat = 0;
	let _goal_lon = 0;
	let result = null;
	let test_result = null;
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
					_start_lat = event.latlng.lat;
					_start_lon = event.latlng.lng;
					start = false;
				} else if (goal) {
					var markerOptions = {
						title: "Start",
					}
					var circle = leaflet.marker(event.latlng, markerOptions).addTo(map);
					_goal_lat = event.latlng.lat;
					_goal_lon = event.latlng.lng;
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

	async function doTest() {
		console.log("Test");
		const res = await fetch('localhost:8080/echo', {
			method: 'POST',
		})
		console.log(res);
	}
	
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
</div>

<button type="button" on:click={doTest}>Actix-Rust</button>
<p>
	test_result
	{test_result}
</p>
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
