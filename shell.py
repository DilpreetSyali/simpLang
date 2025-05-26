import parserr

while True:
    text = input('simpLang > ')
    result, error = parserr.run('<stdin>', text)

    if error:
        print(error.as_string())
    # Do NOT print result here — PRINT() already handled that
