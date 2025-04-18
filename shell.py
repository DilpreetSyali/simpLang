import simpLang 
from simpLang import run

while True:
    text = input("simpLang > ")
    if text.strip() == "":
        continue

    node, error = run('<stdin>', text)

    if error:
        print(error.as_string())
    else:
        print("Parse Tree:")
        print(node)
