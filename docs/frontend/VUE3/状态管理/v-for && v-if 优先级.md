# v-for && v-if 优先级

-   **v-for** 的优先级比 **v-if** 高

  

-   不建议写在一个标签

  

-   vue.js源码

```javascript
    function genElement (el, state) {
      if (el.parent) {
        el.pre = el.pre || el.parent.pre;
      }
  
      if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state)
      } else if (el.once && !el.onceProcessed) {
        return genOnce(el, state)
      } else if (el.for && !el.forProcessed) {
        return genFor(el, state)
      } else if (el.if && !el.ifProcessed) {
        return genIf(el, state)
      } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
        return genChildren(el, state) || 'void 0'
      } else if (el.tag === 'slot') {
        return genSlot(el, state)
      } else {
        // component or element
        var code;
        if (el.component) {
          code = genComponent(el.component, el, state);
        } else {
          var data;
          if (!el.plain || (el.pre && state.maybeComponent(el))) {
            data = genData$2(el, state);
          }
  
          var children = el.inlineTemplate ? null : genChildren(el, state, true);
          code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
        }
        // module transforms
        for (var i = 0; i < state.transforms.length; i++) {
          code = state.transforms[i](el, code);
        }
        return code
      }
    }
```
