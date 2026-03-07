import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'

import { DOMWrapper, flushPromises, mount, VueWrapper } from '@vue/test-utils'
import MashGame from '@/components/game/MashGame.vue'
import { mockCategories } from '@/components/game/mocks/mockCategories.ts'
import { nextTick } from 'vue'

const populateForm = (wrapper: VueWrapper<InstanceType<typeof MashGame>>) => {
  for (const [category, items] of Object.entries(mockCategories)) {
    const categorisedInputs = wrapper.findAll<HTMLInputElement>(`input[data-category="${category}"]`)

    categorisedInputs.forEach((input, idx) => {
      const inputCategory = input.element.getAttribute('data-category')
      if (category === inputCategory) {
        input.setValue(items[idx]?.value)
      }
    })
  }
}

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
  vi.resetAllMocks()
})

describe('MashGameComponent', () => {
  describe('when rendered', () => {
    it('renders all elements', () => {
      const wrapper = mount(MashGame)
      const title = wrapper.get('[data-testid="mash-game-title"]')
      const sectionTitles = wrapper.findAll('.GameForm-sectionTitle')
      const inputElements = wrapper.findAll('.TextInput-input') as DOMWrapper<HTMLInputElement>[]
      const predictTheFutureButton = wrapper.get('[data-testid="submit-button"]')
      const playAgainButton = wrapper.find('[data-testid="reset-button"]')

      expect(title.text()).toContain("Let's Play MASH")

      // Section Titles
      expect(sectionTitles).toHaveLength(6)
      expect(sectionTitles[0]?.text()).toContain('Life partners 💏')
      expect(sectionTitles[1]?.text()).toContain('Children 👶')
      expect(sectionTitles[2]?.text()).toContain('Job 💼')
      expect(sectionTitles[3]?.text()).toContain('Salary 💰')
      expect(sectionTitles[4]?.text()).toContain('Car 🚗')
      expect(sectionTitles[5]?.text()).toContain('Location 🌍')

      // Input Elements
      expect(inputElements).toHaveLength(24)
      expect(inputElements.every((input) => input.element.value === '')).toBe(true)

      // Form Button
      expect(predictTheFutureButton.text()).toContain('Predict the future')
      expect(playAgainButton.exists()).toBe(false)
    })
  })

  describe('when no or partial data is provided', () => {
    it('should not submit the form and play the game', async () => {
      const wrapper = mount(MashGame)
      const inputElements = wrapper.findAll('.TextInput-input') as DOMWrapper<HTMLInputElement>[]
      const form = wrapper.get('form')

      await inputElements[0]?.setValue('Jorja Smith')
      await form.trigger('submit.prevent')

      const gameResultContainer = wrapper.find('[data-testid="mash-game-result"]')

      expect(inputElements[0]!.element.value).toBe('Jorja Smith')
      expect(inputElements.some((input) => input.element.value === '')).toBe(true)
      expect(gameResultContainer.exists()).toBeFalsy()
    })
  })

  describe('when all the data is provided', () => {
    it('should populate all input fields and submit the form', async () => {
      const wrapper = mount(MashGame)
      const form = wrapper.get('form')

      populateForm(wrapper)
      const inputElements = wrapper.findAll('.TextInput-input') as DOMWrapper<HTMLInputElement>[]

      await form.trigger('submit.prevent')
      vi.advanceTimersByTime(2000)
      vi.runAllTimers()
      await nextTick()
      await flushPromises()

      const gameResultContainer = wrapper.find('[data-testid="mash-game-result"]')

      expect(inputElements.every((input) => input.element.value !== '')).toBe(true)

      expect(gameResultContainer.exists()).toBeTruthy()
    })
  })

  describe('when the reset is triggered', () => {
    it('should allow the user to play again', async () => {
      const wrapper = mount(MashGame)
      const form = wrapper.get('form')

      populateForm(wrapper)

      await form.trigger('submit.prevent')
      vi.advanceTimersByTime(2000)
      vi.runAllTimers()
      await nextTick()
      await flushPromises()

      const gameResultContainer = wrapper.find('[data-testid="mash-game-result"]')
      const closeButton = gameResultContainer.find('[data-testid="mash-game-result-close-button"]')

      await closeButton.trigger('click')

      const playAgainButton = wrapper.find('[data-testid="reset-button"]')

      expect(playAgainButton.exists()).toBeTruthy()

      await form.trigger('reset')

      const predictTheFutureButton = wrapper.find('[data-testid="submit-button"]')

      expect(predictTheFutureButton.exists()).toBeTruthy()
    })
  })
})
