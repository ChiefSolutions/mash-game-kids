import type { OnFormReset, OnSubmitForm } from '@/utils/game/types.ts'
import type { VisualFeedbackProps } from '@/components/game/types.ts'

export interface GameFormInputProps extends VisualFeedbackProps {
  dataAttributes?: Record<string, string>
  disabled?: boolean
  id: string
  label?: string
  name: string
  required?: boolean
  value?: string
}

interface GameFormInput {
  number?: GameFormInputProps[]
  text?: GameFormInputProps[]
}

interface GameFormFields {
  input: GameFormInput
}

interface GameFormSectionTitle {
  text: string
  emoji?: string
}

export interface GameFormSection {
  fields: GameFormFields
  id: string
  title?: GameFormSectionTitle
}

interface GameFormSubmit {
  text: string
  action: OnSubmitForm
}

interface GameFormReset {
  text: string
  action: OnFormReset
}

export interface GameFormConfig {
  name: string
  title?: string
  fields?: GameFormFields
  sections?: GameFormSection[]
  submit: GameFormSubmit
  reset: GameFormReset
}

export interface GameFormProps extends VisualFeedbackProps {
  config: GameFormConfig
  resetForm: boolean
  disableInputs?: boolean
}
