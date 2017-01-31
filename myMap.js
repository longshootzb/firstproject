var map_manager = {
    "map" : null,
    "map_items" : []
}

map_manager.map_items = [
    {
      "pokemon_id" : 11,
      "expire" : 1485835200,
      "longitude" : 126.5500345,
      "latitude" : 43.8396651,
    },
    {
      "pokemon_id" : 12,
      "expire" : 1485835200,
      "longitude" : 126.5500945,
      "latitude" : 43.8396951,
    }
]

function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AmGfXoPF5L4OcyP3y1T7R9POld5vCh6OkxuB9eRsNaqVvd6J6Z3hHZUWyh79THjC'
    }); 
    map_manager.map=map;
    window.setInterval(refresh_pokemon_layer, 1000);
}
// 1. Define pokemon data format, create mock pokemon data
function get_counter_down_time_from_expire_epoch(epoch) {
  var now_time = new Date().getTime() / 1000;
  var time_left = epoch / 1000 - now_time;   // unit: second
  var second = Math.floor(time_left % 60);
  var minute = Math.floor(time_left / 60);
  return minute + ":" + second;
}

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = []
    for (var i in map_manager.map_items) {
        var map_item = map_manager.map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                 { icon: 'https://raw.githubusercontent.com/longshootzb/firstproject/master/pokemon/' + map_item["pokemon_id"] + '.png',
                                                  title: get_counter_down_time_from_expire_epoch(map_item["expire"]) });
        pushpins.push(pushpin)
    }
    layer.add(pushpins);
    return layer;
}

// 3. Add pokemon counter down refresh.
function refresh_pokemon_layer() {
  // Prepare new layer
  var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items)
  // Remove old layer
  map_manager.map.layers.clear()
  // Add new layer
  map_manager.map.layers.insert(pokemon_layer);
}

// 4. Connect with REST API
function refresh_pokemon_data() {
  // Get boundary of current map view
  var bounds = map_manager.map.getBounds();
  
  // Request pokemons in current map view
  var apigClient = apigClientFactory.newClient();
  var params = {
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    west: bounds.getWest(),
    east: bounds.getEast(),
  };
  var body = { };
  var additionalParams = { };
 
  apigClient.mapPokemonsGet(params, body, additionalParams)
    .then(function(result){
        //This is where you would put a success callback
        map_manager.map_items = result.data;
    }).catch( function(result){
        //This is where you would put an error callback
        console.log(result)
    });   
}
