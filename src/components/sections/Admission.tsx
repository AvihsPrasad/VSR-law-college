import { useState, type FormEvent } from 'react'
import { admission, site } from '../../data/content'
import student from '../../assets/photos/student.jpg'
import { Button } from '../ui/Button'
import { Highlight } from '../ui/Highlight'
import { useReveal } from '../ui/useReveal'
import styles from '../../styles/sections/Admission.module.css'

export function Admission() {
  const ref = useReveal<HTMLElement>()
  const [email, setEmail] = useState('')

  // No backend yet: hand the enquiry to the visitor's mail app.
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('LL.B. admission enquiry')
    const body = encodeURIComponent(`Please send admission details to: ${email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section ref={ref} data-reveal id="admission" className={styles.section}>
      <div className="container">
        <div className={`${styles.card} reveal-up`}>
          <img loading="lazy" className={styles.photo} src={student} alt="Prospective law student" />
          <div className={styles.copy}>
            <h2 className="h2">
              {admission.before}
              <Highlight>{admission.highlight}</Highlight>
            </h2>
            <p className="body">{admission.body}</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="enquiry-email">
                Email address
              </label>
              <input
                id="enquiry-email"
                type="email"
                required
                placeholder={admission.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit">{admission.cta}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
