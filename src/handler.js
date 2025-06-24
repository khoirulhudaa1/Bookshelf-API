const {nanoid} = require('nanoid');

const books = [];

const saveBookHandler = (request, h) => {
  const {title, author, description} = request.payload;
  const newBook = {
    id: nanoid(),
    title,
    author,
    description,
  };
  books.push(newBook);
  return h.response({
    status: 'success',
    message: 'Book added successfully',
    data: newBook,
  }).code(201);
};

const getAllBooksHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: books,
  });
};

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Book not found',
    }).code(404);
  }
  return h.response({
    status: 'success',
    data: book,
  });
};

const editBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Book not found',
    }).code(404);
  }

  const {title, author, description} = request.payload;
  books[index] = {...books[index], title, author, description};

  return h.response({
    status: 'success',
    message: 'Book updated successfully',
    data: books[index],
  });
};

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Book not found',
    }).code(404);
  }

  books.splice(index, 1);

  return h.response({
    status: 'success',
    message: 'Book deleted successfully',
  });
};

module.exports = {
  saveBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
