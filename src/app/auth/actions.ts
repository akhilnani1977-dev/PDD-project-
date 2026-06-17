'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Custom helper to detect Next.js redirect errors without internal imports
function isRedirect(error: unknown): boolean {
  if (!error) return false
  if (error instanceof Error && error.message?.includes('NEXT_REDIRECT')) {
    return true
  }
  if (typeof error === 'object' && error !== null && 'digest' in error) {
    const digest = (error as { digest?: unknown }).digest
    if (typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT')) {
      return true
    }
  }
  return false
}

const isMockMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your-anon-key'

function normalizeFormValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function login(formData: FormData) {
  try {
    const email = normalizeFormValue(formData.get('email'))
    const password = normalizeFormValue(formData.get('password'))

    // Validation
    if (!email || !password) {
      return redirect('/auth/login?error=' + encodeURIComponent('Email and password are required'))
    }

    if (!email.includes('@')) {
      return redirect('/auth/login?error=' + encodeURIComponent('Please enter a valid email'))
    }

    // Mock mode - successful login
    if (isMockMode) {
      const cookieStore = await cookies()
      cookieStore.set('auth-session', JSON.stringify({ email, authenticated: true }), {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      revalidatePath('/', 'layout')
      return redirect('/')
    }

    // Real Supabase auth
    const supabase = await createClient()
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/auth/login?error=' + encodeURIComponent(error.message || 'Login failed'))
    }

    if (data?.session) {
      revalidatePath('/', 'layout')
      return redirect('/')
    }

    return redirect('/auth/login?error=' + encodeURIComponent('Login failed. Please try again.'))
  } catch (error) {
    if (isRedirect(error)) {
      throw error
    }
    console.error('Login error:', error)
    return redirect('/auth/login?error=' + encodeURIComponent('An error occurred during login'))
  }
}

export async function signup(formData: FormData) {
  try {
    const email = normalizeFormValue(formData.get('email'))
    const password = normalizeFormValue(formData.get('password'))
    const fullName = normalizeFormValue(formData.get('full_name'))

    // Validation
    if (!email || !password || !fullName) {
      return redirect('/auth/signup?error=' + encodeURIComponent('All fields are required'))
    }

    if (!email.includes('@')) {
      return redirect('/auth/signup?error=' + encodeURIComponent('Please enter a valid email'))
    }

    if (password.length < 6) {
      return redirect('/auth/signup?error=' + encodeURIComponent('Password must be at least 6 characters'))
    }

    // Mock mode - successful signup
    if (isMockMode) {
      const cookieStore = await cookies()
      cookieStore.set('auth-session', JSON.stringify({ email, fullName, authenticated: true }), {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      revalidatePath('/', 'layout')
      return redirect('/')
    }

    // Real Supabase auth
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
      const message = error.message.includes('already') ? 'Account already exists. Please sign in.' : error.message
      return redirect('/auth/signup?error=' + encodeURIComponent(message))
    }

    if (data?.user) {
      revalidatePath('/', 'layout')
      return redirect('/')
    }

    return redirect('/auth/signup?error=' + encodeURIComponent('Signup failed. Please try again.'))
  } catch (error) {
    if (isRedirect(error)) {
      throw error
    }
    console.error('Signup error:', error)
    return redirect('/auth/signup?error=' + encodeURIComponent('An error occurred during signup'))
  }
}

export async function signout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth-session')
    cookieStore.delete('mock_session')

    if (!isMockMode) {
      const supabase = await createClient()
      await supabase.auth.signOut()
    }
    
    revalidatePath('/', 'layout')
    return redirect('/auth/login')
  } catch (error) {
    if (isRedirect(error)) {
      throw error
    }
    console.error('Signout error:', error)
    return redirect('/')
  }
}
