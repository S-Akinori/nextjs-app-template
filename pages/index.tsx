import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Container from 'src/components/parts/Container'
import Layout from 'src/components/templates/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container>
        <h1>webサイトテンプレ</h1>
      </Container>
    </Layout>
  )
}

export default Home
