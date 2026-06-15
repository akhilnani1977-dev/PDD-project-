'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Check if Supabase is actually configured or just using placeholder keys
const isMockMode = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your-anon-key';

export async function login(formData: FormData) {
  if (isMockMode) {
    // Mock successful login
    const cookieStore = await cookies();
    cookieStore.set('mock_session', 'true', { path: '/' });
    revalidatePath('/', 'layout')
    redirect('/destinations')
    return;
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/auth/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/destinations')
}

export async function signup(formData: FormData) {
  if (isMockMode) {
    // Mock successful signup
    const cookieStore = await cookies();
    cookieStore.set('mock_session', 'true', { path: '/' });
    revalidatePath('/', 'layout')
    redirect('/destinations')
    return;
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  // Fallback redirect if /auth/signup doesn't exist, to avoid 404
  if (error) {
    redirect('/auth/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/destinations')
}

export async function signout() {
  if (isMockMode) {
    const cookieStore = await cookies();
    cookieStore.delete('mock_session');
    revalidatePath('/', 'layout')
    redirect('/auth/login')
    return;
  }

  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
