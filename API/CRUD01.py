from flask import Flask, request, jsonify

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


books = [
    {"id": 1, "title": 'さまよう刃', "author": "東野圭吾"},
    {"id": 2, "title": '変身', "author": "東野圭吾"},
    {"id": 3, "title": '正欲', "author": "朝井リョウ"},
    {"id": 4, "title": '6人の嘘つきな大学生', "author": "浅倉秋成"},
    {"id": 5, "title": '桐嶋、部活辞めるってよ', "author": "朝井リョウ"}
]

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book is not None:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books', methods=['POST'])
def add_book():
    new_book = request.get_json()  # 修正箇所
    new_book['id'] = books[-1]['id'] + 1 if books else 1
    books.append(new_book)
    return jsonify(new_book), 201

@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book is not None:
        update_data = request.get_json()  # 修正箇所
        book.update(update_data)
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books
    books = [book for book in books if book['id'] != book_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, port=5001)
