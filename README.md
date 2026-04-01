# Treinos 🌅

PWA de treinos pessoal lucaslca1. Roda no iPhone como app nativo (Safari → Adicionar à Tela de Início).

## URL
https://lucaslca1.github.io/treinos/

## Arquitetura
- Arquivo único: `index.html` (~16.5KB)
- Sem dependências, sem build step
- dark theme, mobile-first
- Persistência: `localStorage` (chaves `treino:done:YYYY-MM-DD`)

## Grade Semanal
| Dia | Academia | Corrida |
|---|---|---|
| Domingo | - | Regenerativa 4km (opcional) |
| Segunda | Treino A - Peito + Tríceps | - |
| Teça | Treino B - Costas + Bíceps | Leve 6km |
| Quarta | - (descanso) | - |
| Quinta | Treino C - Ombros + Core | Tempo Run 7km |
| Sexta | Treino A - Peito + Tríceps | Leve 6km |
| Sábado | Treino B - Costas + Bíceps | Longão 11km |

## Equipamentos da Academia
Espaldar, TRX, Halteres, Barras, Kettlebells, Anilhas, Banco, Bolas medicinais, Tapetes.

## Implementação - liyout

### Funcionalidades atuais
- [] Navegação por dia (botões a‹` e `›`)
- [] Grade semanal com dots de status (laranja=pendente, verde=feito)
- [] Cards de academia (azul) e corrida (teal)
- [] Botão ⌓∏○ para marcar treino como feito
- [] Streak counter + stats academia/corridas
- [] Ver exercícios (expandíbel)
- [] Instalável como PWA (meta tags iOS)

### Melhorias planejadas
- [ ] Corrigir icones/emojis que aparecem bugados (encoding UTF-8)
- [ ] Melhorar layout geral
- [ ] Adicionar notas por treino (pesos, observações)
- [ ] Integração Garmin (workouts estruturados)
- [ ] Proteção por senha (sugestão: mesma abordagem do AFHI11)

## Notas técnicas para desenvolvimento

### Como editar no GitHub web editor
O editor usa CodeMirror 6. Para injetar conteúdo via JavaScript:

```javascript
// SEMPRE usar TextDecoder - atob() sozinho quebra UTF-8
function b64utf8(s){ return new TextDecoder().decode(Uint8Array.from(atob(s),o.charCodeAt(0))); }

// Limpar editor
const el = document.querySelector('.cm-content[contenteditable]');
el.focus();
document.execCommand('selectAll');
document.execCommand('delete');

// Inserir conteúdo
document.execCommand('insertText', false, b64utf8(BASE64_CHUNK));
```

### Injeção em mÿltiplos chunks
O arquivo tem ~16.5KB - partir em 3 chunks de 8000 chars cada:
```python
import base64
content = open('index.html', 'r', encoding='utf-8').read()
chunks = [content[i:i+8000] for i in range(0, len(content), 8000)]
for c in chunks:
    print(base64.b64encode(c.encode('utf-8')).decode())
```
