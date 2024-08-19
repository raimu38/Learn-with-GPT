from flask import 'Flask', request, josonify

app = Flask();
@app.route('/hello', methods=['GET'])
def hello_word():
  return jsonify(message = "Hello World")

//POST
@app.route('/echo', methods=['POST']0
def echo():
  data = request.get_json()
  return jsonify(receive=data)

if __name__ == '__main__' :
  app.run(debug=True)




