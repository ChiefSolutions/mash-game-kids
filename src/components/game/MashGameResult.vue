<script setup lang="ts">
import type { MashGameResultProps } from '@/components/game/types.ts'
import { getChildOrChildren } from '@/utils/game/getChildOrChildren.ts'
import { formatCurrency } from '@/utils'

const props = defineProps<MashGameResultProps>()
</script>

<template>
  <div class="MashGameResult-container" data-testid="mash-game-result">
    <div class="MashGameResult-content">
      <p class="MashGameResult-text" data-testid="mash-game-result-feedback">
        Congratulations! Your future looks exciting. You’ll be living in a beautiful
        <b>{{ props.result.accommodation }}</b> in <b>{{ props.result.location }}</b
        >, sharing your life with <b>{{ props.result.partner }}</b
        >, who works as a successful <b>{{ props.result.job }}</b> earning <b>{{ formatCurrency(props.result.salary) }}</b
        >. Together, you’ll raise <b>{{ props.result.children }}</b> {{ getChildOrChildren(props.result.children) }} while cruising around
        the city in a sleek <b>{{ props.result.car }}</b
        >, enjoying both comfort and style.
      </p>
      <div class="MashGameResult-buttonContainer">
        <button class="MashGameResult-button" data-testid="mash-game-result-close-button" @click="props.onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/mixins/shared' as *;

.MashGameResult {
  &-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-content {
    background-color: var(--color-primary);
    border-radius: var(--border-radius-small);
    padding: var(--spacing-large);
    max-width: 600px;
  }

  &-text {
    font-size: var(--font-size-base);
    line-height: 1.2;
  }

  &-buttonContainer {
    margin-top: var(--spacing-large);
    text-align: center;
  }

  &-button {
    @include button-reset;
    @include button-primary;
  }
}
</style>
