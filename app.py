from flask import Flask, request, jsonify, render_template
import simpLang
import sys
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run', methods=['POST'])
@app.route('/run', methods=['POST'])
def run_code():
    from time import sleep  # optional: simulate buffering delay
    data = request.get_json()
    code = data.get('code', '')

    # Capture print() output
    old_stdout = sys.stdout
    sys.stdout = mystdout = io.StringIO()

    try:
        result, error = simpLang.run('<web>', code)
    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({'output': f'[Python Error] {str(e)}', 'error': True})
    finally:
        sys.stdout = old_stdout

    printed_output = mystdout.getvalue().strip()

    # ✅ 1. Show runtime errors
    if error:
        if hasattr(error, "as_string"):
            return jsonify({'output': error.as_string(), 'error': True})
        else:
            return jsonify({'output': f'[Unhandled Error] {str(error)}', 'error': True})

    # ✅ 2. Only print what's explicitly printed
    return jsonify({'output': printed_output, 'error': False})


if __name__ == '__main__':
    app.run(debug=True)
