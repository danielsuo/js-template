var openweathermap = {
  name: 'OpenWeatherMap',
  url: 'https://openweathermap.org',
  base: 'api.openweathermap.org',
  version: 2.5,
  pathify: function(params) {
    return '/data/2.5/weather?q=' + params.q + '&appid=' + params.appid
  },
  parse: function(res) {
    console.log(res);
    return JSON.parse(res).weather[0].main;
  }
};

module.exports = openweathermap;
