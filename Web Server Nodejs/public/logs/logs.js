getData();
    async function getData() {

      const response = await fetch('/api');
      const data = await response.json();
      console.log(data)
      for (let item of data) {

        const root = document.createElement('div');
        const geo = document.createElement('div');
        const mood = document.createElement('div');
        const date = document.createElement('div');
        const image64 = document.createElement('img')
        image64.width = 320
        image64.height = 240

        geo.textContent = `${item.lat}°, ${item.lon}°`
        mood.textContent = `mood: ${item.mood}`
        const dateString = new Date(item.timestamp).toString();
        date.textContent = dateString;
        image64.src = item.image64

        root.append(mood, geo, date, image64)
        document.body.append(root)
      }
    }