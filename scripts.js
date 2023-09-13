  
  const userAction = async () => {
    const response = await fetch('http://localhost:8090/listado', {
      method: 'POST',
      body: {}, 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); 
    alert(myJson)
  }