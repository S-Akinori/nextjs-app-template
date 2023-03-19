import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Button from 'src/components/atoms/Button'
import Container from 'src/components/parts/Container'
import Error from 'src/components/parts/Error'
import Layout from 'src/components/templates/Layout'
import { useAuth } from 'src/hooks/useAuth'

interface Input {
  email: string
  password: string
}

const Home: NextPage = () => {
  const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm<Input>()
  const auth = useAuth()

  const onSubmit: SubmitHandler<Input> = data => {
    auth?.signin(data.email, data.password)
  }

  return (
    <Layout>
      <Container>
        <h1>ヘッドレスCMS</h1>
        {!auth?.user && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input {...register('email')} type="email" />
              {errors.email && (<Error>{errors.email.message}</Error>)}
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input {...register('password')} type="password" />
              {errors.password && (<Error>{errors.password.message}</Error>)}
            </div>
            <div>
              <Button>ログイン</Button>
            </div>
          </form>
        )}
        {auth?.user && (
          <div>管理者画面です。</div>
        )}
      </Container>
    </Layout>
  )
}

export default Home
