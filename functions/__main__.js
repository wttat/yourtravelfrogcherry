addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const bucket = 'yourtravelfrogcherry'
    const directory = 'frog'
    const minFileNumber = 1
    const maxFileNumber = 92
  
    const randomFileNumber = Math.floor(Math.random() * (maxFileNumber - minFileNumber + 1)) + minFileNumber
    const fileName = `${randomFileNumber}.jpg`
    const randomQueryParam = `?${Math.random()}`
  
    const response = await fetch(`https://${bucket}.r2.dev.cloudflare.com/${directory}/${fileName}${randomQueryParam}`)
  
    if (response.ok) {
      const imageData = await response.arrayBuffer()
      return new Response(imageData, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'no-cache',
        },
      })
    } else {
      return new Response('File not found', { status: 404 })
    }
  }
  