import axios from 'axios';
import WeatherJsonSanitizer from '../sanitizer/jsonSanatizer';

export default class Weather {
  private readonly longitude = 'lon';
  private readonly latitude = 'lat';
  private readonly appId = 'appid';
  private readonly unit = 'units';

  private readonly requestUrl = process.env.OPEN_WEATHER_CURRENT_API_URL || '';   
  private readonly apiKey = process.env.OPEN_WEATHER_API_KEY || '';
  private readonly metric = process.env.METRIC || 'metric';

  async getWeather(lat: number, lon: number){
    const url = this.buildApiUrl();

    try {
      const response = await axios.get(url, {
        params: this.buildUrlParams(lat, lon)
      });
     
      return WeatherJsonSanitizer.sanitize(response.data);
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

    url.append(this.longitude, lon.toString());
    url.append(this.latitude, lat.toString());
    url.append(this.appId, this.apiKey);
    url.append(this.unit, this.metric);

    return url;
  }
}

