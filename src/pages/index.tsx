import Head from "../../node_modules/next/head";
import { Flex } from '../components/UI/Flex/index';
import { Heading } from '../components/UI/Heading/index';
import Main from "../screens/Main/index";

const Home: React.FC = () =>  {
  return (
   <div>
      <Head>
        <title>HomePage</title>
      </Head>

      <main>
        <Main/>
      </main>
   </div>
  )
}

export default Home;
