import {
    Box,
    Heading
  } from 'grommet'
  import Link from 'next/link'
  
  const Custom404 = () => {
    return (
      <Box pad="large" align="center" fill>
        <Heading level='1'>404 - Page Not Found</Heading>
        <Link href="https://www.idleonefficiency.com/">
          Home Page
        </Link>
      </Box>
    );
  }
  
  export default Custom404;