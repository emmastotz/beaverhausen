import { useState } from 'react'

import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { Button } from '@/components/primitives/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormspreeError {
  field?: string
  message: string
}

interface FormErrors {
  field: Record<string, string>
  general: string | null
}

const inputClass = [
  'w-full bg-transparent border-b py-2',
  'font-body text-beaver-dark dark:text-cream',
  'placeholder:font-display placeholder:italic placeholder:text-beaver/40 dark:placeholder:text-cream/50',
  'focus:outline-none',
  'transition-colors duration-200 antialiased',
].join(' ')

const inputBorder = {
  default: 'border-beaver/30 focus:border-iron-orange',
  error: 'border-iron-orange',
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<FormErrors>({ field: {}, general: null })

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrors({ field: {}, general: null })

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xdenwjwk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setFormState('success')
        form.reset()
        return
      }

      const json = await res.json().catch(() => null)
      const fieldErrors: Record<string, string> = {}
      let general: string | null = null

      if (json?.errors?.length) {
        for (const err of json.errors as FormspreeError[]) {
          if (err.field) {
            fieldErrors[err.field] = err.message
          } else {
            general = err.message
          }
        }
      } else {
        general = json?.error ?? 'Something went wrong — please try again.'
      }

      setErrors({ field: fieldErrors, general })
      setFormState('error')
    } catch {
      setErrors({
        field: {},
        general: 'Network error — check your connection and try again.',
      })
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col gap-3">
        <BaseT3 variant="display" className="text-iron-orange italic">
          Thanks, I'll be in touch.
        </BaseT3>
        <button onClick={() => setFormState('idle')} className="self-start">
          <BaseT6 className="text-beaver uppercase underline dark:text-cream">
            Send another message
          </BaseT6>
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {/* Honeypot — bots fill this, humans don't */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8 sm:flex-row sm:gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="name">
            <BaseT6 className="text-beaver uppercase dark:text-cream">
              Name
            </BaseT6>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`${inputClass} ${errors.field.name ? inputBorder.error : inputBorder.default}`}
          />
          {errors.field.name && (
            <BaseT6 className="text-iron-orange uppercase">
              {errors.field.name}
            </BaseT6>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="email">
            <BaseT6 className="text-beaver uppercase dark:text-cream">
              Email
            </BaseT6>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className={`${inputClass} ${errors.field.email ? inputBorder.error : inputBorder.default}`}
          />
          {errors.field.email && (
            <BaseT6 className="text-iron-orange uppercase">
              {errors.field.email}
            </BaseT6>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message">
          <BaseT6 className="text-beaver uppercase dark:text-cream">
            Note
          </BaseT6>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you building?"
          className={`${inputClass} resize-none ${errors.field.message ? inputBorder.error : inputBorder.default}`}
        />
        {errors.field.message && (
          <BaseT6 className="text-iron-orange uppercase">
            {errors.field.message}
          </BaseT6>
        )}
      </div>

      {errors.general && (
        <BaseT6 className="text-iron-orange uppercase">{errors.general}</BaseT6>
      )}

      <div>
        <Button
          type="submit"
          variant="ghost"
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? 'Sending…' : 'Send note'}
        </Button>
      </div>
    </form>
  )
}
