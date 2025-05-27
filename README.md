# 🌟 SimpLang – A Simple Custom Programming Language

![SimpLang Logo](static/Logo.png)

## Description

*SimpLang* is a lightweight, easy-to-learn custom programming language designed to introduce beginners and enthusiasts to the fundamentals of programming language design and interpretation. Built from scratch, SimpLang features a clear syntax inspired by popular programming constructs like variables, loops, conditionals, functions, and lists.

This project includes:

- A custom interpreter written in Python, capable of parsing and executing SimpLang code.
- A well-defined grammar (grammar.txt) that outlines the language’s syntax and semantics.
- A user-friendly web-based IDE powered by Flask, featuring syntax highlighting, theme toggling (day/night mode), and an integrated "Learn" page that helps users understand SimpLang syntax and programming concepts with simple examples.
- Support for core programming paradigms such as arithmetic operations, conditionals (IF-ELSE), loops (FOR, WHILE), functions, strings, lists, and constants.

SimpLang serves both as an educational tool for those new to programming languages and a foundation for developers interested in language design, compilers, and interpreters.

---

## Features

- *Custom Language Interpreter:* Execute SimpLang code through a Python backend.
- *Grammar-Driven:* Syntax rules are clearly defined in grammar.txt, making extension and modification easy.
- *Web IDE:* Interactive browser interface with:
  - Syntax highlighting
  - Theme toggle (light/dark)
  - Output console for immediate feedback
  - Dedicated Learn page with detailed explanations and examples
- *Core Language Constructs:* Variables, arithmetic, conditionals, loops, functions, lists, strings, constants.
- *Simple & Intuitive Syntax:* Designed for ease of use and learning.
- 
[o1](https://github.com/user-attachments/assets/ece9c4e3-01e8-434c-a9a4-869405988ff9)

[o2](https://github.com/user-attachments/assets/5a80c57c-0d79-4bd6-b0a3-035fd96583ec)

[o3](https://github.com/user-attachments/assets/d0d1b24c-99f7-4ae3-aad6-0915d752e4ce)

---

## Example SimpLang Code

```simplang
VAR x = 10
VAR y = 20

IF x < y THEN
  PRINT("x is less than y")
ELSE
  PRINT("x is greater or equal to y")
END

FOR i = 1 TO 5 THEN!

  PRINT(i)
END

FUN square(n) -> n * n!

PRINT(square(6))  # Output: 36



