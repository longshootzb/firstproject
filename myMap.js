var map_manager = {
    "map" : null,
    "map_items" : []
}

map_manager.map_items = [
    {
      "pokemon_id" : 11,
      "expire" : 1476589403,
      "longitude" : 126.5500345,
      "latitude" : 43.8396651,
    },
    {
      "pokemon_id" : 12,
      "expire" : 1476589403,
      "longitude" : 126.5500945,
      "latitude" : 43.8396951,
    }
]
function get_counter_down_time_from_expire_epoch(epoch) {
  var now_time = new Date().getTime() / 1000;
  var time_left = epoch / 1000 - now_time;   // unit: second
  var second = Math.floor(time_left % 60);
  var minute = Math.floor(time_left / 60);
  return minute + ":" + second;
}

function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AmGfXoPF5L4OcyP3y1T7R9POld5vCh6OkxuB9eRsNaqVvd6J6Z3hHZUWyh79THjC'
    });
    map_manager.map=map;
    var pushpins = []
    for (var i in map_manager.map_items) {
    var map_item = map_manager.map_items[i];
    var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                             { icon: 'https://raw.githubusercontent.com/longshootzb/firstproject/master/pokemon/' + map_item["pokemon_id"] + '.png',
                                              title: get_counter_down_time_from_expire_epoch(map_item["expire"]) });
    map.entities.push(pushpin);
    }

}
