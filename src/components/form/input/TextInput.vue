<script setup lang="ts">
import { ref } from 'vue'
import { mapFormDataAttributes } from '@/utils'
import type { GameFormInputProps } from '../types.ts'

const props = defineProps<GameFormInputProps>()
const inputValue = ref<string>(props.value ?? '')
</script>

<template>
  <div class="TextInput-container">
    <label v-if="!!label" :for="name">{{ label }}:</label>
    <input
      :class="{
        'TextInput-input': true,
        'TextInput--highlight': props.highlightId === props.id,
        'TextInput--removed': props.removed?.includes(props.id),
        'TextInput--selected': props.selected?.includes(props.id),
      }"
      type="text"
      :disabled="props.disabled"
      :data-testid="props.id"
      :id="props.id"
      :name="props.name"
      :required="props.required"
      v-model="inputValue"
      v-bind="mapFormDataAttributes(dataAttributes)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/mixins/shared' as *;

:deep(input) {
  border: none;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  padding: 0;
  margin: 0;
  -webkit-appearance: none; /* Chrome / Safari */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* Standard */
  border-radius: 0; /* remove rounded corners */
}

.TextInput {
  &-container {
    margin-bottom: var(--spacing-default);
  }

  &-input {
    @include form-input;
    background-color: transparent;
  }

  &--removed {
    @include item-removed;
  }

  &--selected {
    @include item-selected;
  }

  &--highlight {
    @include item-highlighted;
  }
}
</style>
