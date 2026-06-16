'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const isMockMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your-anon-key'

function normalizeFormValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function redirectWithMessage(path: string, message: string) {
  redirect(`${path}?${message}`)
}

export async function login(formData: FormData) {
  const email = normalizeFormValue(formData.get('email'))
  const password = normalizeFormValue(formData.get('password'))

  if (!email || !password) {
    redirectWithMessage('/auth/login', 'error=' + encodeURIComponent('Email and password are required'))
  }

  if (!email.includes('@')) {
    redirectWithMessage('/auth/login', 'error=' + encodeURIComponent('Please enter a valid email'))
  }

  if (isMockMode) {
    const cookieStore = await cookies()
    cookieStore.set('mock_session', 'true', { path: '/' })
    revalidatePath('/', 'layout')
    redirect('/destinations')
    return
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirectWithMessage('/auth/login', 'error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/destinations')
}

export async function signup(formData: FormData) {
  const email = normalizeFormValue(formData.get('email'))
  const password = normalizeFormValue(formData.get('password'))
  const fullName = normalizeFormValue(formData.get('full_name'))

  if (!email || !password || !fullName) {
    redirectWithMessage('/auth/signup', 'error=' + encodeURIComponent('All fields are required'))
  }

  if (!email.includes('@')) {
    redirectWithMessage('/auth/signup', 'error=' + encodeURIComponent('Please enter a valid email'))
  }

  if (password.length < 6) {
    redirectWithMessage('/auth/signup', 'error=' + encodeURIComponent('Password must be at least 6 characters'))
  }

  if (isMockMode) {
    const cookieStore = await cookies()
    cookieStore.set('mock_session', 'true', { path: '/' })
    revalidatePath('/', 'layout')
    redirect('/destinations')
    return
  }

  const supabase = await createClient()
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    const message =
      error.message.toLowerCase().includes('already') ||
      error.message.toLowerCase().includes('duplicate')
        ? 'Account already exists. Please sign in.'
        : error.message

    const destination =
      message === 'Account already exists. Please sign in.'
        ? '/auth/login'
        : '/auth/signup'

    redirectWithMessage(destination, 'error=' + encodeURIComponent(message))
  }

  if (data?.session || data?.user) {
    revalidatePath('/', 'layout')
    redirect('/destinations')
    return
  }

  redirectWithMessage('/auth/login', 'success=' + encodeURIComponent('Account created. Check your email to verify and sign in.'))
}

export async function signout() {
  if (isMockMode) {
    const cookieStore = await cookies()
    cookieStore.delete('mock_session')
    revalidatePath('/', 'layout')
    redirect('/auth/login')
    return
  }

  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
