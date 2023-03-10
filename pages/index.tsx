import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <div className='flex flex-col items-center mt-4 text-3xl gap-4'>
      <h1>Проект по предмету Базы данных</h1>
      <h1>Frontend: NextJs, Typescript, Tailwind</h1>
      <h1>Backend: NodeJs, Express</h1>
     </div>

      
    </div>
  )
}



export default Home
