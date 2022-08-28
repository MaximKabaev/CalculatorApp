import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div class='flex justify-center items-center h-screen'>
          <div class='bg-zinc-700 h-[610px] w-[340px] rounded-2xl flex justify-center'>
            <ul>
              <li><div class='bg-black h-[100px] w-[275px] rounded-2xl shadow-2xl translate-y-11'></div></li>
              <li>
                <div class='flex justify-center items-center h-[50%] translate-y-32 flex-row'>
                  <ul>
                    <li>
                      <ul class='flex flex-row w-full'>
                        <li class='pr-6 text-3xl text-black'><button class='w-12 h-12 bg-gray-300 shadow-lg rounded-full'><p class='inline'>c</p></button></li>
                        <li class='pr-6 text-3xl text-black'><button class='w-12 h-12 bg-gray-300 shadow-lg rounded-full'>÷</button></li>
                        <li class='pr-6 text-3xl text-black'><button class='w-12 h-12 bg-gray-300 shadow-lg rounded-full'>x</button></li>
                        <li class='text-3xl text-black'><button class='w-12 h-12 bg-gray-300 shadow-lg rounded-full'>+</button></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}
