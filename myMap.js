function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AmGfXoPF5L4OcyP3y1T7R9POld5vCh6OkxuB9eRsNaqVvd6J6Z3hHZUWyh79THjC'
    });
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { icon: 'https://raw.githubusercontent.com/longshootzb/firstproject/master/pokemon/1.png',
        anchor: new Microsoft.Maps.Point(12, 39) });
    map.entities.push(pushpin);

}
