<script setup lang="ts">
import TextInput from './input/TextInput.vue'
import type { GameFormProps } from './types.ts'
import { ref } from 'vue'

const props = defineProps<GameFormProps>()

const hasSubmitted = ref(false)
const handleSubmit = (e: SubmitEvent): void => {
  hasSubmitted.value = true
  props.config.submit.action(e)
}

const handleReset = () => {
  props.config.reset.action()
  hasSubmitted.value = false
}
</script>

<template>
  <div class="GameForm-container">
    <h1 class="GameForm-title" v-if="!!props.config.title">{{ config.title }}</h1>
    <form class="GameForm-form" @submit.prevent="handleSubmit" @reset="handleReset" autocomplete="off">
      <div class="GameForm-sections">
        <div class="GameForm-section" v-for="section in props.config.sections" :key="section.id">
          <h1 class="GameForm-sectionTitle" v-if="!!section.title">{{ section.title?.text }} {{ section.title.emoji }}</h1>
          <div v-for="field in section.fields.input?.text" :key="field.id">
            <TextInput
              :id="field.id"
              :data-attributes="field.dataAttributes"
              :disabled="hasSubmitted || props.disableInputs"
              :name="field.name"
              :label="field.label"
              :required="field.required"
              :value="field.value"
              :removed="props.removed"
              :selected="props.selected"
              :highlight-id="props.highlightId"
              v-model="field.value"
            />
          </div>
        </div>
      </div>
      <div class="GameForm-buttonContainer">
        <button class="GameForm-button" type="submit" v-if="!props.resetForm" data-testid="submit-button">
          {{ props.config.submit.text }}
        </button>
        <button class="GameForm-button" type="reset" v-if="props.resetForm" data-testid="reset-button">
          {{ props.config.reset.text }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/mixins/shared' as *;

.GameForm {
  &-container {
    color: var(--color-secondary);
  }

  &-title {
    font-size: var(--font-size-sub-title);
    font-weight: bold;
    margin-bottom: var(--spacing-large);
    text-align: center;
  }

  &-sections {
    color: var(--color-dark-teal);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-large);
  }

  &-section {
    border: 1px solid var(--color-faint);
    box-sizing: border-box;
    border-radius: var(--border-radius-default);
    box-shadow:
      0 1px 2px rgba(30, 30, 60, 0.06),
      0 4px 12px rgba(30, 30, 60, 0.08);
    width: 33.33%;
    flex: 0 0 calc(33.333% - 21.33px);
    padding: var(--spacing-default);
  }

  &-sectionTitle {
    font-size: var(--font-size-sub-title);
    margin-bottom: var(--spacing-default);
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
