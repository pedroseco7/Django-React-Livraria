import React from "react";
import "../styles/Form.css"

function Book({ book, onDelete }) {
    const formattedDate = new Date(book.created_at).toLocaleDateString("pt-PT")

    return (
        <div className="book-container">
            <p className="book-title">{book.title}</p>
            <p className="book-content">{book.content}</p>
            <p className="book-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(book.id)}>
                Delete
            </button>
        </div>
    );
}

export default Book