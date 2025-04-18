#####################
# imports

from string_with_arrows import *

####################
# Tokens
TT_INT       = 'TT_INT'
TT_FLOAT     = 'TT_FLOAT'
TT_PLUS      = 'PLUS'
TT_MINUS     = 'MINUS'
TT_MUL       = 'MUL'
TT_DIV       = 'DIV'
TT_LPAREN    = 'LParen'
TT_RPAREN    = 'R-Paren'
TT_IDENTIFIER= 'IDENTIFIER'
TT_IF        = 'IF'
TT_ELSE      = 'ELSE'
TT_WHILE     = 'WHILE'
TT_ASSIGN    = 'ASSIGN'
TT_EQ        = 'EQ'
TT_NEQ       = 'NEQ'
TT_LT        = 'LT'
TT_GT        = 'GT'
TT_LEQ       = 'LEQ'
TT_GEQ       = 'GEQ'
TT_AND       = 'AND'
TT_OR        = 'OR'
TT_NOT       = 'NOT'
TT_STRING    = 'STRING'
TT_COMMENT   = 'COMMENT'
TT_EOF       = 'EOF'

KEYWORDS = {
    'if': TT_IF,
    'else': TT_ELSE,
    'while': TT_WHILE,
    'and': TT_AND,
    'or': TT_OR,
    'not': TT_NOT
}

####################
# Digits
DIGITS = '0123456789'

####################
# Errors
class Error:
    def __init__(self, pos_start, pos_end, error_name, details):
        self.pos_start = pos_start
        self.pos_end = pos_end
        self.error_name = error_name
        self.details = details

    def as_string(self):
        result  = f'{self.error_name}: {self.details}\n'
        result += f'File {self.pos_start.fn}, line {self.pos_start.ln + 1}'
        result += '\n\n' + string_with_arrows(self.pos_start.ftxt , self.pos_start , self.pos_end)
        return result

class IllegalCharError(Error):
    def __init__(self, pos_start, pos_end, details):
        super().__init__(pos_start, pos_end, 'Illegal Character', details)

class InvalidSyntaxError(Error):
    def __init__(self, pos_start, pos_end, details=''):
        super().__init__(pos_start, pos_end, 'Invalid Syntax', details)

####################
# Position
class Position:
    def __init__(self, idx, ln, col, fn, ftxt):
        self.idx = idx
        self.ln = ln
        self.col = col
        self.fn = fn
        self.ftxt = ftxt

    def advance(self, current_char=None):
        self.idx += 1
        self.col += 1

        if current_char == '\n':
            self.ln += 1
            self.col = 0

        return self

    def copy(self):
        return Position(self.idx, self.ln, self.col, self.fn, self.ftxt)

####################
# Tokens Class
class Tokens:
    def __init__(self, type_, value=None , pos_start=None , pos_end=None):
        self.type = type_
        self.value = value

        if pos_start:
            self.pos_start = pos_start.copy()
            self.pos_end = pos_start.copy()
            self.pos_end.advance()
        if pos_end:
            self.pos_end = pos_end

    def __repr__(self):
        if self.value: return f'{self.type}:{self.value}'
        return f'{self.type}'

####################
# Lexer
class Lexer:
    def __init__(self, fn, text):
        self.fn = fn
        self.text = text
        self.pos = Position(-1, 0, -1, fn, text)
        self.current_char = None
        self.advance()

    def advance(self):
        self.pos.advance(self.current_char)
        self.current_char = self.text[self.pos.idx] if self.pos.idx < len(self.text) else None

    def make_tokens(self):
        tokens = []

        while self.current_char != None:
            if self.current_char in ' \t':
                self.advance()
            elif self.current_char in DIGITS:
                tokens.append(self.make_number())
            elif self.current_char.isalpha():
                tokens.append(self.make_identifier())
            elif self.current_char == '+':
                tokens.append(Tokens(TT_PLUS , pos_start = self.pos))
                self.advance()
            elif self.current_char == '-':
                tokens.append(Tokens(TT_MINUS , pos_start=self.pos))
                self.advance()
            elif self.current_char == '*':
                tokens.append(Tokens(TT_MUL , pos_start = self.pos))
                self.advance()
            elif self.current_char == '/':
                tokens.append(Tokens(TT_DIV , pos_start=self.pos))
                self.advance()
            elif self.current_char == '(':
                tokens.append(Tokens(TT_LPAREN, pos_start=self.pos))
                self.advance()
            elif self.current_char == ')':
                tokens.append(Tokens(TT_RPAREN, pos_start=self.pos))
                self.advance()
            elif self.current_char == '=':
                tokens.append(self.make_equals())
            elif self.current_char == '!':
                token, error = self.make_not_equals()
                if error: return [], error
                tokens.append(token)
            elif self.current_char == '<':
                tokens.append(self.make_less_than())
            elif self.current_char == '>':
                tokens.append(self.make_greater_than())
            else:
                pos_start = self.pos.copy()
                char = self.current_char
                self.advance()
                return [], IllegalCharError(pos_start, self.pos, "'" + char + "'")

        tokens.append(Tokens(TT_EOF , pos_start=self.pos))
        return tokens, None

    def make_number(self):
        num_str = ''
        dot_count = 0
        pos_start = self.pos.copy()

        while self.current_char != None and self.current_char in DIGITS + '.':
            if self.current_char == '.':
                if dot_count == 1: break
                dot_count += 1
                num_str += '.'
            else:
                num_str += self.current_char
            self.advance()

        if dot_count == 0:
            return Tokens(TT_INT, int(num_str),pos_start , self.pos)
        else:
            return Tokens(TT_FLOAT, float(num_str),pos_start , self.pos)

    def make_identifier(self):
        id_str = ''
        pos_start = self.pos.copy()

        while self.current_char != None and (self.current_char.isalnum() or self.current_char == '_'):
            id_str += self.current_char
            self.advance()

        tok_type = KEYWORDS.get(id_str, TT_IDENTIFIER)
        return Tokens(tok_type, id_str)

    def make_equals(self):
        pos_start = self.pos.copy()
        self.advance()

        if self.current_char == '=':
            self.advance()
            return Tokens(TT_EQ)
        return Tokens(TT_ASSIGN)

    def make_not_equals(self):
        pos_start = self.pos.copy()
        self.advance()

        if self.current_char == '=':
            self.advance()
            return Tokens(TT_NEQ), None

        return None, IllegalCharError(pos_start, self.pos, "'!' (Expected '=')")

    def make_less_than(self):
        pos_start = self.pos.copy()
        self.advance()

        if self.current_char == '=':
            self.advance()
            return Tokens(TT_LEQ)
        return Tokens(TT_LT)

    def make_greater_than(self):
        pos_start = self.pos.copy()
        self.advance()

        if self.current_char == '=':
            self.advance()
            return Tokens(TT_GEQ)
        return Tokens(TT_GT)

####################
# NODES
class NumberNode:
    def __init__(self, tok):
        self.tok = tok
    
    def __repr__(self):
        return f'{self.tok}'

class BinOpNode:
    def __init__(self, left_node, op_tok, right_node):
        self.left_node = left_node
        self.op_tok = op_tok
        self.right_node = right_node
    
    def __repr__(self):
        return f'({self.left_node}, {self.op_tok}, {self.right_node})'

class UnaryOpNode:
    def __init__(self , op_tok , node):
        self.op_tok = op_tok
        self.node = node

    def __repr__(self):
        return f'({self.op_tok} , {self.node})'

#####################
#parse result
class ParseResult:
    def __init__(self):
        self.error = None
        self.node = None
    
    def register(self , res):
        if isinstance(res , ParseResult):
            if res.error: self.error = res.error
            return res.node
        
        return res

    def success(self , node):
        self.node = node
        return self

    def failure(self , error):
        self.error = error
        return self

##################
#parse
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.tok_idx = -1
        self.advance()  # Move to the first token

    def advance(self):
        self.tok_idx += 1
        if self.tok_idx < len(self.tokens):
            self.current_tok = self.tokens[self.tok_idx]
        return self.current_tok
    
    #########################
    def parse(self):
        res = self.expr()
        if not res.error and self.current_tok.type != TT_EOF:
            return res.failure(InvalidSyntaxError(
                self.current_tok.pos_start , self.current_tok.pos_end,
                "Expected '+', '-', '*', '/'"
            ))
        return res

    def expr(self):
        return self.bin_op(self.term, (TT_PLUS, TT_MINUS))

    def term(self):
        return self.bin_op(self.factor, (TT_MUL, TT_DIV))

    def factor(self):
        res = ParseResult() 
        tok = self.current_tok

        if tok.type in (TT_PLUS ,TT_MINUS):
            res.register(self.advance())
            factor=res.register(self.factor())
            if res.error : return res
            return res.success(UnaryOpNode(tok , factor))
        
        elif tok.type in (TT_INT, TT_FLOAT):
            res.register(self.advance())
            return res.success(NumberNode(tok))

        elif tok.type == TT_LPAREN:
            res.register(self.advance())
            expr = res.register(self.expr())
            if res.error : return res
            if self.current_tok.type == TT_RPAREN:
                res.register(self.advance())
                return res.success(expr)
            else:
                return res.failure(InvalidSyntaxError(
                    self.current_tok.pos_start , self.current_tok.pos_end,
                    "Expected ')'")) 

        return res.failure(InvalidSyntaxError(
            tok.pos_start , tok.pos_end,
            "Expected int or float"
        ))

    def bin_op(self, func, ops):
        res = ParseResult()
        left = res.register(func())
        if res.error : return res

        while self.current_tok.type in ops:
            op_tok = self.current_tok
            res.register(self.advance())
            right = res.register(func())
            if res.error: return res
            left = BinOpNode(left, op_tok, right)
        return res.success(left)


# RUN function
def run(fn, text):
    lexer = Lexer(fn, text)
    tokens, error = lexer.make_tokens()
    if error:
        return None, error

    # Generate AST (parse tree)
    parser = Parser(tokens)
    ast = parser.parse()

    # Return the AST node and error (if any)
    return ast.node, ast.error


# Main execution
if __name__ == "__main__":
    while True:
        try:
            text = input("simpLang > ")
            result, error = run('<stdin>', text)

            if error:
                print(error.as_string())
            else:
                print(f'AST: {result}')

        except KeyboardInterrupt:
            break
