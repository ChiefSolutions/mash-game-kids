<script setup lang="ts">
import type { MashGameFacilityProps } from '@/components/game/types.ts'
import { facilities } from '@/configurations'

const props = defineProps<MashGameFacilityProps>()
</script>
<template>
  <div class="MashGameFacilities-container">
    <p
      v-for="facility in facilities"
      :id="facility.id"
      :class="{
        'MashGameFacilities-facility': true,
        'MashGameFacilities--highlight': props.highlightId?.includes(facility.id),
        'MashGameFacilities--selected': props.selected?.includes(facility.id),
        'MashGameFacilities--removed': props.removed?.includes(facility.id),
      }"
      :key="facility.id"
    >
      {{ facility.value }}
    </p>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/mixins/shared' as *;
.MashGameFacilities {
  &-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    margin: 0 auto var(--spacing-default) auto;
  }

  &-facility {
    box-sizing: border-box;
    border: 1px solid var(--color-faint);
    border-radius: var(--border-radius-default);
    font-size: var(--font-size-base);
    padding: var(--spacing-small);
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
