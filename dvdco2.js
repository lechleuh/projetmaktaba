const submit = document.querySelector('.submit')
const input = document.querySelector('input')
const listBtn = document.querySelector('.btn-list')
const ul = document.querySelector('ul')


//Ma liste
let myList = []


// Écouteurs d'événements
submit.addEventListener('click', ()=>{
    getData(input.value)
})
listBtn.addEventListener('click', () => {
    displayResults(myList)
})


// Connexion à l'API 
function getData(data) {
    ul.innerHTML = ""
   fetch("https://www.googleapis.com/books/v1/volumes?q="+data+"&maxResults=10", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
       }
    })
      .then(response => response.json())
      .then((data) => {
        const books = data.items;
        console.log(books)
        const container = document.getElementById('books-container');
            
        books.forEach(book => {
            if(book.volumeInfo.imageLinks){
                let title = book.volumeInfo.title;
                let author = book.volumeInfo.authors[0];
                let image = book.volumeInfo.imageLinks.thumbnail;
                
                /*let bookDiv = document.createElement('div');
                bookDiv.classList.add('book');*/
                /*let img = document.createElement('img');
                console.log(img)
                img.src = image;
*/
                ul.innerHTML= ul.innerHTML + `
                    <li>
                        <img src="${image}"/>
                    </li>
                `
  
                /*let titleEl = document.createElement('h2');
                titleEl.textContent = title;
  
                 let authorEl = document.createElement('p');
                 authorEl.textContent = author;
  
                 bookDiv.appendChild(img);
                 bookDiv.appendChild(titleEl);
            bookDiv.appendChild(authorEl); */}
        });

        // Lister les résultats 
        //displayResults(books);
      })
      .catch(error => console.error(error));
}


    //   Dans cet exemple, nous utilisons document.getElementById pour obtenir une référence à un élément HTML existant avec l'ID "books-container", qui est l'endroit où nous voulons afficher les livres. Nous parcourons ensuite chaque livre et créons des éléments HTML pour l'image, le titre et l'auteur en utilisant document.createElement. Ensuite, nous ajoutons ces éléments à un élément HTML parent que nous avons également créé pour chaque livre en utilisant appendChild. Enfin, nous ajoutons chaque élément parent à l'élément "books-container" en utilisant appendChild encore une fois.
      
    //   Assurez-vous d'ajouter un élément HTML avec l'ID "books-container" sur votre page HTML avant d'appeler la fonction getData.
      
// Lister les résultats
/*function displayResults(books) {
    ul.innerHTML = ""

    books.map((book) => {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        const h4 = document.createElement('h4')

        const addBtn = document.createElement('button')
        const delBtn = document.createElement('button')
        addBtn.textContent = 'Ajouter'
        delBtn.textContent = 'Supprimer'

        delBtn.classList.add('del-btn')

        h3.textContent = book.Title 
        img.src = book.Poster 
        h4.textContent = book.publishedDate


        li.append(img, h3, h4)
        ul.appendChild(li)

        if (book.status != 'in-list') {
            li.appendChild(addBtn)
            addBtn.addEventListener('click', () => {addToList(book)})
        } else {
            li.appendChild(delBtn)
            delBtn.addEventListener('click', () => {removeFromList(book)})
        }
    })
}
*/

function addToList(book) {
    book.status = 'in-list'
    myList.push(book)
    console.log(myList)
}

function removeFromList(item) {
    let newList = myList.filter(book => book.Title !== item.Title)
    myList = newList
    displayResults(newList)
}
