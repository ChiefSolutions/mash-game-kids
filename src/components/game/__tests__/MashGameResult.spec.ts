import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MashGameResult from '@/components/game/MashGameResult.vue'

const props = {
  result: {
    accommodation: 'House',
    car: 'Mercedes-Benz',
    children: '2',
    job: 'Software Engineer',
    location: 'London',
    partner: 'Nicki',
    salary: '250,0000',
  },
  onClose: vi.fn(),
}

describe('MashGameResultComponent', () => {
  describe('rendered', () => {
    it('should feed back the game result', () => {
      const wrapper = mount(MashGameResult, {
        props,
      })
      const gameResultContainer = wrapper.find('[data-testid="mash-game-result"]')
      const gameResultFeedback = wrapper.find('[data-testid="mash-game-result-feedback"]')
      const closeButton = gameResultContainer.find('[data-testid="mash-game-result-close-button"]')

      expect(gameResultContainer.exists()).toBeTruthy()
      expect(gameResultFeedback.exists()).toBeTruthy()
      expect(gameResultFeedback.text()).toContain(
        'Congratulations! Your future looks exciting. You’ll be living in a beautiful House in London, sharing your life with Nicki, who works as a successful Software Engineer earning £NaN. Together, you’ll raise 2 children while cruising around the city in a sleek Mercedes-Benz, enjoying both comfort and style.',
      )
      expect(closeButton.exists()).toBeTruthy()
    })

    it('should close when the close button is clicked', async () => {
      const wrapper = mount(MashGameResult, {
        props,
      })
      const gameResultContainer = wrapper.find('[data-testid="mash-game-result"]')
      const closeButton = gameResultContainer.find('[data-testid="mash-game-result-close-button"]')

      await closeButton.trigger('click')
      expect(props.onClose).toHaveBeenCalled()
    })
  })
})
