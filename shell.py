import simpLang

while True:
    text = input('simpLang > ')
    result, error = simpLang.run('<stdin>', text)

    if error:
        print(error.as_string())
    # Do NOT print result here — PRINT() already handled that
