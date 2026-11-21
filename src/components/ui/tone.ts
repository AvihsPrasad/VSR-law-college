// Section background tone. Pages pick one per section so backgrounds alternate white / gray.
export type Tone = 'white' | 'gray'

export const toneClass = (tone: Tone = 'white') => (tone === 'gray' ? 'bg-gray' : 'bg-white')
