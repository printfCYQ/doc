# 词法分析与语法分析

## 简介

本节介绍编译原理前端阶段，包括词法分析器（Lexer/Scanner）基于 DFA 拆分 Token，语法分析器（Parser）基于 LL(1) / LR / 递归下降生成 AST 抽象语法树。

## 目录 / 章节

- 词法分析：正则表达式 → NFA → DFA → Token 流
- 常见 Token 类型（关键字、标识符、数字、字符串、运算符）
- 上下文无关文法（CFG）与 BNF/EBNF 表示
- 递归下降分析法（Recursive Descent）
- 抽象语法树（AST）定义与构造
- LL(1) 文法与 FIRST / FOLLOW 集合

## 笔记正文

::: details 点击展开示例代码
```typescript
enum TokenType { NUMBER, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN, EOF }

interface Token { type: TokenType; value?: string }

class Lexer {
    private pos = 0;
    constructor(private src: string) {}

    nextToken(): Token {
        while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) this.pos++;
        if (this.pos >= this.src.length) return { type: TokenType.EOF };
        const ch = this.src[this.pos];
        if (/\d/.test(ch)) {
            let num = '';
            while (this.pos < this.src.length && /\d/.test(this.src[this.pos])) num += this.src[this.pos++];
            return { type: TokenType.NUMBER, value: num };
        }
        this.pos++;
        switch (ch) {
            case '+': return { type: TokenType.PLUS };
            case '-': return { type: TokenType.MINUS };
            case '*': return { type: TokenType.MUL };
            case '/': return { type: TokenType.DIV };
            case '(': return { type: TokenType.LPAREN };
            case ')': return { type: TokenType.RPAREN };
            default: throw new Error(`Unexpected: ${ch}`);
        }
    }
}
```
:::
