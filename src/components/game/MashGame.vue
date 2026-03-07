<script setup lang="ts">
import GameForm from '@/components/form/GameForm.vue'
import { facilities, mashGameFormSelections } from '@/configurations'
import { extractCategorisedGameFormData, getMagicNumber } from '@/utils'
import { playGame } from '@/utils/game/playGame.ts'
import { type Ref, ref } from 'vue'
import type { MashGameResults } from '@/components/game/types.ts'
import MashGameResult from '@/components/game/MashGameResult.vue'
import type { OnFormReset, OnSubmitForm, VisualRef } from '@/utils/game/types.ts'
import type { GameFormConfig } from '@/components/form/types.ts'
import MashGameFacilities from '@/components/game/MashGameFacilities.vue'

const result = ref<MashGameResults | null>(null)
const showResults = ref(false)
const resetForm = ref(false)
const visualRef: Ref<VisualRef, VisualRef> = ref<VisualRef>({ highlightId: '', removedIds: [], selectedIds: [] })

const onReplayComplete = (results: MashGameResults) => {
  result.value = results
  showResults.value = true
  resetForm.value = true
}

const onSubmit: OnSubmitForm = (e) => {
  const form = e.target as HTMLFormElement

  if (!form.checkValidity()) {
    return
  }

  const magicNumber = getMagicNumber()
  const data = extractCategorisedGameFormData(form, {
    name: 'accommodation',
    value: facilities,
  })

  playGame(data, magicNumber, visualRef, onReplayComplete)
}

const onFormReset: OnFormReset = () => {
  resetForm.value = false
  visualRef.value = { highlightId: '', removedIds: [], selectedIds: [] }
}

const handleOnClose = () => {
  showResults.value = false
}

const formConfig: GameFormConfig = {
  name: 'mashForm',
  sections: mashGameFormSelections,
  submit: {
    text: 'Predict the future',
    action: onSubmit,
  },
  reset: {
    text: 'Play Again',
    action: onFormReset,
  },
}
</script>

<template>
  <div class="MashGame-container">
    <h1 class="MashGame-title" data-testid="mash-game-title">Let's Play MASH</h1>
    <MashGameFacilities :removed="visualRef.removedIds" :selected="visualRef.selectedIds" :highlight-id="visualRef.highlightId" />
    <GameForm
      :config="formConfig"
      :disable-inputs="showResults || resetForm"
      :reset-form="resetForm"
      :removed="visualRef.removedIds"
      :selected="visualRef.selectedIds"
      :highlight-id="visualRef.highlightId"
    />
    <MashGameResult v-if="result && showResults" :result="result" :onClose="handleOnClose" />
  </div>
</template>

<style scoped lang="scss">
.MashGame {
  &-container {
    position: relative;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  &-title {
    background-color: var(--color-dark-teal);
    color: var(--color-primary);
    font-size: var(--font-size-large);
    font-weight: bold;
    margin: 0 auto var(--spacing-default) auto;
    text-align: center;
    max-width: 300px;
  }
}
</style>
