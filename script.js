async function downloadSong() {
    const link = document.getElementById("spotifyLink").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Fetching download link...";
  
    const cleanLink = link.split('?')[0];
    const trackId = cleanLink.split("/track/")[1];
  
    if (!trackId) {
      resultDiv.innerHTML = "❌ Invalid Spotify track URL.";
      return;
    }
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e0683f3cf8msh885fd63a2416659p19ff13jsn5a5cbafd92de',
        'X-RapidAPI-Host': 'spotify-downloader9.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(`https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${trackId}`, options);
      const result = await response.json();
  
      console.log("API Response:", result);
  
      if (result.success && result.data && result.data.downloadLink) {
        const song = result.data;
        resultDiv.innerHTML = `
          <img src="${song.cover}" alt="Album Cover" width="100" />
          <p><strong>${song.title}</strong> by ${song.artist}</p>
          <a href="${song.downloadLink}" target="_blank" download>🎵 Download Song</a>
        `;
      } else {
        resultDiv.innerHTML = "❌ Failed to get the download link. Check the URL.";
      }
    } catch (error) {
      console.error("Error:", error);
      resultDiv.innerHTML = "❌ Error occurred while downloading.";
    }
  }
  