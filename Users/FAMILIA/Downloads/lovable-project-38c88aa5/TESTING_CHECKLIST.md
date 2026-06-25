# Checklist de Testes - Sistemas de XP e Estabilidade

## ✅ Testes de XP/Rewards

### 1. Ganho de XP Básico
- [ ] Derrotar um monstro Nível 1 (Slime)
  - Verificar: +10 XP aparece na tela
  - Verificar: Mensagem "Voce derrotou..." aparece
  - Verificar: Barra de XP avança
  
- [ ] Derrotar monstro Nível 10
  - Verificar: +100 XP aparece
  - Verificar: XP é proporcional ao nível

### 2. Level-Up
- [ ] Acumular XP até next level
  - Verificar: Notificação "Level X! Parabens!"
  - Verificar: Stats aumentam
  - Verificar: HP é restaurado em 5%
  
- [ ] Level-up múltiplo (monstro forte)
  - Derrotar monstro que dê XP para 3+ levels
  - Verificar: Todos os level-ups são reconhecidos
  - Verificar: Stats são recalculados corretamente

### 3. Sistema de Pets
- [ ] Pet ativo ganha XP
  - Verificar: +40% do XP do monstro vai para pet
  - Verificar: Notificação "🐾 [Pet Name] subiu para Nv X!"
  
- [ ] Multiplicador de pet aplicado
  - Ativar pet lendário
  - Derrotar monstro
  - Verificar: XP gain = xpReward * petBonus.xpMul
  - Verificar: Ouro gain = goldReward * petBonus.goldMul

### 4. Sistema de Skills
- [ ] Skill primária ganha XP
  - Verificar: +50% do XP do monstro vai para skill
  - Verificar: Level-up de skill funciona
  - Verificar: XpToNext aumenta 1.5x a cada level

### 5. Ouro e Drops
- [ ] Ouro é coletado
  - Derrotar monstro
  - Verificar: +X Ouro aparece
  - Verificar: Contador de ouro aumenta
  
- [ ] Items droppam
  - Derrotar monstros variados
  - Verificar: Items aparecem no chat
  - Verificar: Items entram no inventário
  - Verificar: Stacking funciona (até 99)

### 6. Combo Multiplier
- [ ] Combo aumenta XP
  - Matar 5+ monstros rapidamente
  - Verificar: XP = baseXP * comboMultiplier
  - Verificar: Notificação de combo aparece

## 🛡️ Testes de Estabilidade

### 7. Divisão por Zero - Minions
- [ ] Minion ataca alvo
  - Invocar minion perto de inimigo
  - Verificar: Não há crash ao calcular movimento
  - Verificar: Minion segue corretamente
  
- [ ] Minion segue player
  - Mover player distante
  - Verificar: Minion segue sem crash
  - Verificar: Distância máxima respeitada

### 8. Divisão por Zero - Movement
- [ ] Player se move
  - Clicar em alvo próximo
  - Verificar: Sem crash de movimento
  - Verificar: Sem valores Infinity/NaN em position
  
- [ ] Pet segue player
  - Mover player rapidamente
  - Verificar: Pet não crasheia
  - Verificar: Pet mantém offset correto

### 9. Geração de Mapas
- [ ] Sky Biome gera sem crash
  - Entrar no sky biome
  - Verificar: Sem crash ao gerar pontes
  - Verificar: Mapa é navegável
  
- [ ] Crystal Cave gera
  - Entrar em crystal cave
  - Verificar: Terreno é válido
  - Verificar: Monstros spawnão

### 10. Masteries/Reputação
- [ ] Reputação calcula bonus
  - Ganhar reputação com fação
  - Derrotar monstro
  - Verificar: Damage aumenta com reputação
  - Verificar: Sem crash em cálculos
  
- [ ] Mastery stats aplicam
  - Desbloquear node de mastery
  - Verificar: Stats aumentam
  - Verificar: Damage é recalculado

### 11. Conquistas
- [ ] Conquista debloqueia sem crash
  - Atender condição de conquista
  - Verificar: Notificação aparece
  - Verificar: Ouro é adicionado
  - Verificar: Sem crash em loop de verificação

## 🔧 Cenários de Stress

### 12. Multi-Kills
- [ ] Matar 10+ monstros em sequência
  - Verificar: Sem memory leak
  - Verificar: Sem acúmulo de bugs
  - Verificar: Chat não overflow (max 50 msgs)

### 13. Level-Up Rápido
- [ ] Nível de 1 a 50 em uma sessão
  - Debugar com xpReward alto
  - Verificar: Todos os level-ups registram
  - Verificar: Stats calculam corretamente

### 14. Pet XP Múltiplo
- [ ] Pet nivel 1 para 100
  - Com bonificadores altos
  - Verificar: Sem overflow de XP
  - Verificar: Sem crash em level-ups

### 15. Crash Injection
- [ ] Skills undefined
  - Remover skills array
  - Verificar: Não crashes (handled gracefully)
  
- [ ] Pet inválido
  - Corromper dados de pet
  - Verificar: Sistema retorna valor default (1x)
  
- [ ] Masteries quebradas
  - Dar masteries null
  - Verificar: Retorna {} (safe default)

## 📋 Checklist de Validação

### Antes do Deploy:
- [ ] Compilação sem erros (`npm run build`)
- [ ] Sem warnings críticos
- [ ] Build size aceitável
- [ ] Dev build funciona (`npm run dev`)

### Após Correções:
- [ ] Testar cada cenário acima
- [ ] Verificar console para erros
- [ ] Testar em mobile (se aplicável)
- [ ] Testar em navegadores diferentes

### Dados Esperados por Level:
```
Nível 1: 0 XP to next
Nível 2: 140 XP to next (100 * 1.4^1)
Nível 3: 196 XP to next (100 * 1.4^2)
Nível 10: 8.96k XP to next
Nível 20: 163.8k XP to next
```

## 🐛 Known Issues Que Foram Corrigidas

1. ❌ XP não era ganho → ✅ CORRIGIDO
2. ❌ Crash em minion AI → ✅ CORRIGIDO
3. ❌ Crash ao clicar em alvo → ✅ CORRIGIDO
4. ❌ Crash ao gerar sky map → ✅ CORRIGIDO
5. ❌ Crash em reputação → ✅ CORRIGIDO
6. ❌ Crash em masteries → ✅ CORRIGIDO
7. ❌ Crash em conquistas → ✅ CORRIGIDO

## 📊 Performance Targets

- Frame rate: 60 FPS estável
- Tempo de load: < 3s
- Memory leak: 0 detectable
- Crash rate: 0 conhecidos

---

**Última Atualização:** 25 de Junho de 2026  
**Status:** Pronto para QA
