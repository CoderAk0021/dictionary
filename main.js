lucide.createIcons();
const darkModeToggleBtn = document.querySelector("#toggle-btn");
darkModeToggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark")
})

document.querySelector("input").addEventListener("keydown", (e) => {
  if (e.keyCode == 13)
  {
    search()
  }
})


function search()
{
  let searchedWord = document.querySelector("#search").value;
  document.querySelector("#result").innerHTML = ""
  document.querySelector("#loader").classList.remove("hidden")
  if (searchedWord != "")
    getData(searchedWord)
  else {
    document.querySelector("#loader").classList.add("hidden")
    document.querySelector("#result").innerHTML = "Search Can't be Empty"
  }
}

async function getData(searchedWord) {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      document.querySelector("#loader").classList.add("hidden")
      document.querySelector("#result").innerHTML = "Not Found"
    }
    
    const json = await response.json();
    
    json.forEach((data) => {
      let pronounciation = ""
      data.phonetics.forEach(audios =>
      {
        if (audios.audio != "")
        {
          pronounciation = audios.audio;
          
        }
      })
      document.querySelector("#loader").classList.add("hidden")
      data.meanings.forEach(meaning => {
        
        const partOfSpeech = meaning.partOfSpeech
        const definition = meaning.definitions.length >= 1 ? meaning.definitions[0].definition : null;
        
        
        const data = ` <div class=" border-l-4 px-4 border-l-blue-500 w-2/3 py-2">
      <div class="text-2xl text-semi-bold text-gray-900 flex justify-between items-center">
        <p class="dark:text-gray-50 capitalize">${partOfSpeech}</p>
       <button onclick="speak('${pronounciation}')"class="bg-blue-500 text-gray-50 p-2 rounded-full focus:bg-blue-800 disabled:bg-blue-100"${pronounciation === "" ? 'disabled' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
        </button>
      </div>
      <p class="mt-2 max-w-md text-sm text-gray-600 text-wrap dark:text-gray-100">${definition}</p>
    </div>`
        document.querySelector("#result").insertAdjacentHTML("beforeend", data);
      })
    })
  } catch (error) {
    console.error(error.message);
  }
}

function speak(url)
{
  let audio = document.createElement("audio");
  audio.src = url;
  audio.play();
}