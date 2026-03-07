import MashGameFacilities from '@/components/game/MashGameFacilities.vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { facilities } from '@/configurations'

describe('MashGameFacilityComponent', () => {
  describe('When rendered', () => {
    it('should display the facility options', () => {
      const wrapper = mount(MashGameFacilities, {
        props: {
          selected: [],
          removed: [],
          highlightId: '',
        },
      })

      const options = wrapper.findAll('.MashGameFacilities-facility')

      expect(options).toHaveLength(facilities.length)
      expect(options[0]!.text()).toContain(facilities[0]!.value)
      expect(options[1]!.text()).toContain(facilities[1]!.value)
      expect(options[2]!.text()).toContain(facilities[2]!.value)
      expect(options[3]!.text()).toContain(facilities[3]!.value)
    })
  })

  describe('When there is a selected item', () => {
    it('should style the selected item', () => {
      const wrapper = mount(MashGameFacilities, {
        props: {
          selected: [facilities[0]!.id],
          removed: [],
          highlightId: '',
        },
      })

      const option = wrapper.find(`[id="${facilities[0]!.id}"]`)

      expect(option.element.classList.contains('MashGameFacilities--selected')).toBeTruthy()
    })
  })

  describe('When there is are removed item', () => {
    it('should style the removed items', () => {
      const wrapper = mount(MashGameFacilities, {
        props: {
          selected: [],
          removed: [facilities[1]!.id, facilities[2]!.id, facilities[3]!.id],
          highlightId: '',
        },
      })

      const optionOne = wrapper.find(`[id="${facilities[1]!.id}"]`)
      const optionTwo = wrapper.find(`[id="${facilities[2]!.id}"]`)
      const optionThree = wrapper.find(`[id="${facilities[3]!.id}"]`)

      expect(optionOne.element.classList.contains('MashGameFacilities--removed')).toBeTruthy()
      expect(optionTwo.element.classList.contains('MashGameFacilities--removed')).toBeTruthy()
      expect(optionThree.element.classList.contains('MashGameFacilities--removed')).toBeTruthy()
    })
  })

  describe('When there is a highlighted item', () => {
    it('should style the selected item', () => {
      const wrapper = mount(MashGameFacilities, {
        props: {
          selected: [],
          removed: [],
          highlightId: facilities[0]!.id,
        },
      })

      const option = wrapper.find(`[id="${facilities[0]!.id}"]`)

      expect(option.element.classList.contains('MashGameFacilities--highlight')).toBeTruthy()
    })
  })
})
