import { useState, useEffect } from "react";
import api from "../api";
import Book from "../components/Book";
import "../styles/Home.css"; // Novo arquivo CSS

function Home() {
    const [books, setBooks] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        api.get("/api/books/")
            .then((res) => res.data)
            .then((data) => setBooks(data))
            .catch((err) => alert(err));
    };

    const deleteBook = (id) => {
        api.delete(`/api/books/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Livro eliminado!");
                    getBooks();
                } else {
                    alert("Erro ao eliminar livro");
                }
            })
            .catch((error) => alert(error));
    };

    const createBook = (e) => {
        e.preventDefault();
        api.post("/api/books/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Livro criado!");
                    getBooks();
                } else {
                    alert("Erro ao criar livro!");
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="home-container">
            <h1 className="app-title">Biblioteca Geral da Universidade de Coimbra</h1>
            <div className="book-section">
                <h2 className="section-title">Livros Disponíveis</h2>
                <div className="book-list">
                    {books.map((book) => (
                        <Book book={book} onDelete={deleteBook} key={book.id} />
                    ))}
                </div>
            </div>
            <div className="add-book-section">
                <h2 className="section-title">Adicionar um Novo Livro</h2>
                <form className="add-book-form" onSubmit={createBook}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Conteúdo:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button type="submit" className="submit-btn">Adicionar Livro</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
