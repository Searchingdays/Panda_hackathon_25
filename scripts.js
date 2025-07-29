
    function getArticle() {

        let url;
        let title;
        let summaryUrl;

      const topic = document.getElementById("name").value.trim();

      if (!topic) 
        {
            url = `https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*`;
            console.log("random")


      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
           const article = data.query.random[0];
           title = article.title;
           const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
           summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

           console.log(title);
          
           document.getElementById("output").innerHTML = `
             <h2>${title}</h2>
             <p><a href="${pageUrl}" target="_blank">Read on Wikipedia</a></p>
           `;
            fetch(summaryUrl)
              .then(response => response.json())
              .then(data => {
                const imgurl = data.thumbnail?.source;
                console.log(data)

                document.getElementById("output2").innerHTML = `
                
                ${data.thumbnail ? `<img src="${data.thumbnail.source}" style="max-width:300px;">` : ""}
                <p>${data.extract}</p>`;

              })

        })
        .catch(error => {
          document.getElementById("output").innerHTML = `<p>Error fetching article: ${error}</p>`;
        });

      }

      else{

      url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(topic)}&origin=*`;

        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
        fetch(summaryUrl)
         .then(response => response.json())
         .then(data => {
            console.log(data)
       

        const page = data;
        const imageHtml = page.thumbnail ? `<img src="${page.thumbnail.source}" alt="${topic}">` : "";

        document.getElementById("output").innerHTML = `
          <h2>${page.title}</h2>
          ${imageHtml}
          <p>${page.extract}</p>`;

         }
        )

        return;
      }





    return;
       
    }



document.getElementById("different_page").addEventListener("click",getArticle);


    






