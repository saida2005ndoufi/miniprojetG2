document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
});
 function addBook() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const genreInput = document.getElementById("genre");
    const isbnInput = document.getElementById("isbn");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();
    const isbn = isbnInput.value.trim();

    if (title === "" || author === "" || genre === "" || isbn === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const book = {
        id: new Date().getTime(),
        title: title,
        author: author,
        genre: genre,
        isbn: isbn
    };

    let books = localStorage.getItem("books");
    books = books ? JSON.parse(books) : [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    // Envoyer les données au serveur pour ajouter le livre à la base de données
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('isbn', isbn);

    fetch('addBook.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            displayBooks(); // Actualiser la liste des livres après l'ajout
            titleInput.value = "";
            authorInput.value = "";
            genreInput.value = "";
            isbnInput.value = "";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de l\'ajout du livre.');
    });

    displayBooks();
}

/*function addBook() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const genreInput = document.getElementById("genre");
    const isbnInput = document.getElementById("isbn");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();
    const isbn = isbnInput.value.trim();

    if (title === "" || author === "" || genre === "" || isbn === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const book = {
        id: new Date().getTime(),
        title: title,
        author: author,
        genre: genre,
        isbn: isbn
    };

    let books = localStorage.getItem("books");
    books = books ? JSON.parse(books) : [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    isbnInput.value = "";
}*/

function displayBooks(query = "") {
    let books = localStorage.getItem("books");
    books = books ? JSON.parse(books) : [];

    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query)
    );

    filteredBooks.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${book.title}</strong><br>
                Auteur: ${book.author}<br>
                Genre: ${book.genre}<br>
                ISBN: ${book.isbn}
            </div>
            <button onclick="deleteBook(${book.id})">Supprimer</button>
        `;
        bookList.appendChild(li);
    });
}

function deleteBook(bookId) {
    let books = localStorage.getItem("books");
    books = books ? JSON.parse(books) : [];

    books = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();
}

function searchBooks() {
    const query = document.getElementById("search").value;
    displayBooks(query);
}