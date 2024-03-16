import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Weather from './api/weather'; 

dotenv.config({override: true});

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('available:<br>&emsp;/get-weather?lat={latitude}&lon={longitude}<br>&emsp;/healthcheck');
})

app.get('/get-weather', async (req: Request, res: Response) => { // Mark the arrow function as async
  const lat: number = Number(req.query.lat);
  const lon: number = Number(req.query.lon);

  try {
    if(!lat || !lon) {
      throw new Error('lon and lat need to be specified');
    }

    res.send(
      await (new Weather()).getWeather(lat, lon)
    );
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching weather data: ' + error); // Send an error response if there's an error
  }
});

app.get('/healthcheck', (req: Request, res: Response) => {
  res.send('alive')
})

app.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});
