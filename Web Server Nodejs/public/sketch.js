let lat = 0;
    let lon = 0;
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');
    video.width = 200;
    video.height = 200;
    video.autoplay = true

    //document.body.append(video)

    async function saveGeolocation() {
      
      const mood = document.getElementById('name').value
      const image64 = canvas.toDataURL()

      console.log(image64)

      const request = {
        lat,
        lon,
        mood,
        image64
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(request)
      }

      const response = await fetch('/api', options)
      const data = await response.json();

      mood.value = ""
      console.log(data)

    }
    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        lat = position.coords.latitude
        lon = position.coords.longitude;
        document.getElementById('lat').textContent = lat.toFixed(2);
        document.getElementById('lon').textContent = lon.toFixed(2);

        const response = await fetch(`/api/weather/${lat},${lon}`)
        const json = await response.json()

        console.log(json)
      })
    } else {

      console.log('geolocation not available')

    }

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 160, height: 120 }
    }).then(stream => {
      video.srcObject = stream
    });

    canvas.width = 160;
    canvas.height = 120;
    canvas.style.transform = "rotateY(180deg)"
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');


    setInterval(() => {
      ctx.save();

      ctx.drawImage(video, 0, 0, 160, 120)

      ctx.restore();
    }, 24);