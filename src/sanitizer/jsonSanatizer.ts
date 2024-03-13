export default class WeatherJsonSanitizer { 
  static sanitize(jsonObject: any) {
    return {
      "city": this.getName(jsonObject),
      "time": this.getTime(),
      "temperature": this.getTemp(jsonObject),
      "humidity": this.getHumidity(jsonObject)
    };
  }

  private static getName(jsonObject: any) {
    return jsonObject['name'];
  }

  private static getTime() {
    return new Date();
  }

  private static getTemp(jsonObject: any) {
    return jsonObject['main']['temp'];
  }

  private static getHumidity(jsonObject: any) {
    return jsonObject['main']['humidity'];
  }
}
