// import Page from 'components/Page'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Editor = dynamic(
  () => import('components/Editor'),
  { ssr: false }
)

const Home: NextPage = (): JSX.Element => {
  return <>
    <Head>
      <title>Next UI Builder</title>
    </Head>

    {/* <Page align="middle" textAlign="left"> */}
    <Editor />
    {/* </Page> */}
    {/* <Footer /> */}
  </>
}

// function Footer(): JSX.Element {
//   return <Typography
//     align="center"
//     variant="body2"
//     sx={{
//       py:  4,
//       'a': { textDecoration: 'none' }
//     }}
//   >
//     <Link
//       href="https://github.com/Rethunk-Tech/next-ui-builder"
//     >
//       Source on GitHub
//     </Link>
//   </Typography>
// }

export default Home
