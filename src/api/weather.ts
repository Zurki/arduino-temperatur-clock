import axios from 'axios';
import WeatherJsonSanitizer from '../sanitizer/jsonSanatizer';

export default class Weather {
  private readonly requestUrl = process.env.OPEN_WEATHER_CURRENT_API_URL || '';   
  private readonly apiKey = process.env.OPEN_WEATHER_API_KEY || '';

  async getWeather(lat: number, lon: number){
    const url = this.buildApiUrl();

    try {
      const response = await axios.get(url, {
        params: this.buildUrlParams(lat, lon)
      });
     
      return WeatherJsonSanitizer.sanitize(response.data)
    } catch (error) {
      console.log(error);
      
      return null;
    }
  }
  private buildApiUrl(): string  {
    return this.requestUrl;
  }

  private buildUrlParams(lat: number, lon: number): URLSearchParams {
    const url = new URLSearchParams();

    url.append('lon', lon.toString());
    url.append('lat', lat.toString());
    url.append('appid', this.apiKey);

    return url;
  }
}

